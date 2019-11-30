/*
  Refererence: https://github.com/aws-amplify/amplify-js/blob/master/packages/aws-amplify-react/src/Auth/SignIn.jsx.
*/
import React from 'react';
import { Auth, JS } from 'aws-amplify';
import { Flex, Box, Text, Card, Button } from '../base';
import { Input, Label } from '../form';

import MAuthPiece from './MAuthPiece';

export default class MSignIn extends MAuthPiece {
  constructor(props) {
    super(props);
    this.validAuthStates = ['signIn', 'signedOut', 'signedUp'];
    this.state = {};
  }

  checkContact = user => {
    // console.log("========== MSignIn.checkContact ========== ");
    // console.log(user);
    // console.log("====================================");

    Auth.verifiedContact(user).then(data => {
      if (!JS.isEmpty(data.verified)) {
        this.changeState('signedIn', user);
      } else {
        const usr = Object.assign(user, data);
        this.changeState('verifyContact', usr);
      }
    });
  };

  signIn = e => {
    const { username, password } = this.inputs;
    // console.log("MSignIn");
    Auth.signIn(username, password)
      .then(user => {
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          this.changeState('requireNewPassword', user);
        } else {
          this.checkContact(user);
        }
      })
      .catch(err => {
        console.log(err);
        this.error(err);
      });

    e.preventDefault();
  };

  signInSuccess = () => {
    this.setState({ error: '' });
  };

  showComponent = () => {
    /**
     * Disabled SignUp in Production.
     */
    let signUp = (
      <Box width={1} mt={4}>
        <Button onClick={() => this.changeState('signUp')}>Signup</Button>
      </Box>
    );

    if (process.env.NODE_ENV === 'production') {
      signUp = null;
    }

    return (
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width={['100%', '400px']}
        style={{ height: '100vh' }}
      >
        <Box width={1}>
          <Text fontWeight="bold" fontSize={5} sx={{ textAlign: 'center' }}>
            Taxd
          </Text>
        </Box>
        <Card width={1} mt={4} bg="white">
          <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            p={4}
          >
            <Text fontWeight="bold" fontSize={3} sx={{ textAlign: 'center' }}>
              Log in to Taxd
            </Text>
            <Box as="form" width={1} mt={1} onSubmit={this.signIn}>
              <Box width={1} mt={4} bg="transparent">
                <Label htmlFor="username" mb={2} fontSize={1}>
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="admin.tjp"
                  onChange={this.handleInputChange}
                />
              </Box>
              <Box width={1} mt={4} bg="transparent">
                <Label htmlFor="password" mb={2} fontSize={1}>
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Your Password"
                  onChange={this.handleInputChange}
                />
              </Box>
              <Button type="submit" mt={4} size="large" onclick={this.signIn}>
                Log in
              </Button>
            </Box>
            {signUp}
          </Flex>
        </Card>
      </Flex>
    );
  };
}
