/*
  Refererence: https://github.com/aws-amplify/amplify-js/blob/master/packages/aws-amplify-react/src/Auth/RequireNewPassword.jsx
*/

import React from 'react';
import { Auth, JS } from 'aws-amplify';
// import { RequireNewPassword } from 'aws-amplify-react';

import { Flex, Box, Text, Card, Button } from 'common/components/base';
import { Input, Label } from 'common/components/form';

import MAuthPiece from './MAuthPiece';

export default class MRequireNewPassword extends MAuthPiece {
  constructor(props) {
    super(props);
    this.validAuthStates = ['requireNewPassword'];
  }

  checkContact = user => {
    Auth.verifiedContact(user).then(data => {
      if (!JS.isEmpty(data.verified)) {
        this.changeState('signedIn', user);
      } else {
        const usr = Object.assign(user, data);
        this.changeState('verifyContact', usr);
      }
    });
  };

  change = e => {
    const user = this.props.authData;
    const { password } = this.inputs;

    Auth.completeNewPassword(user, password, {})
      .then(usr => {
        this.checkContact(usr);
      })
      .catch(err => {
        this.error(err);
      });

    e.preventDefault();
  };

  showComponent = () => {
    const { hide } = this.props;
    if (hide && hide.includes(MRequireNewPassword)) {
      return null;
    }

    return (
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bg="transparent"
        width={1}
        style={{ height: '100vh', minWidth: '400px' }}
      >
        <Box>
          <Text fontWeight="bold" fontSize={5}>
            Mana
          </Text>
        </Box>
        <Box>
          <Card mt={4} bg="white">
            <Flex
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              p={4}
            >
              <Text fontWeight="bold" fontSize={3} sx={{ textAlign: 'center' }}>
                Change Your Password
              </Text>

              <Box as="form" onSubmit={this.change}>
                <Box width={1} mt={4} bg="transparent">
                  <Label htmlFor="password" mb={2} fontSize={1}>
                    New Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Your new Password"
                    onChange={this.handleInputChange}
                  />
                </Box>
                <Box width={1}>
                  <Button type="submit">Change</Button>
                </Box>
              </Box>
            </Flex>
          </Card>
        </Box>
      </Flex>
    );
  };
}
