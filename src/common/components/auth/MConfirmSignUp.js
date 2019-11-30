/*
  Refererence: https://github.com/aws-amplify/amplify-js/blob/master/packages/aws-amplify-react/src/Auth/SignUp.jsx.
*/
import React from 'react';
import { Auth } from 'aws-amplify';

import { Flex, Box, Text, Card, Button } from 'common/components/base';
import { Input, Label } from 'common/components/form';

import MAuthPiece from './MAuthPiece';

export default class MConfirmSignUp extends MAuthPiece {
  constructor(props) {
    super(props);
    this.validAuthStates = ['confirmSignUp'];
  }

  confirm = e => {
    e.preventDefault();

    const username = this.usernameFromAuthData() || this.inputs.username;
    const { code } = this.inputs;

    Auth.confirmSignUp(username, code)
      .then(() => this.changeState('signedUp'))
      .catch(err => this.error(err));
  };

  resend = e => {
    const username = this.usernameFromAuthData() || this.inputs.username;
    Auth.resendSignUp(username)
      .then(() => {})
      .catch(err => this.error(err));

    e.preventDefault();
  };

  showComponent = () => {
    const { hide } = this.props;
    const username = this.usernameFromAuthData();

    if (hide && hide.includes(MConfirmSignUp)) {
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
            Taxd
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
              <Text bold fontSize={3} sx={{ textAlign: 'center' }}>
                Confirm Signup
              </Text>

              <Box as="form" onSubmit={this.confirm}>
                <Box width={1} mt={4}>
                  <Label htmlFor="username" mb={2} fontSize={1}>
                    Username
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="admin.tjp"
                    defaultValue={username || ''}
                    onChange={this.handleInputChange}
                  />
                </Box>
                <Box width={1} mt={4}>
                  <Label htmlFor="code" mb={2} fontSize={1}>
                    Confirmation Code
                  </Label>
                  <Input
                    name="code"
                    type="code"
                    placeholder="Confirmation Code"
                    onChange={this.handleInputChange}
                  />
                </Box>
                <Box width={1} mt={4}>
                  <Button onClick={() => this.resend()}>Resend Code</Button>
                </Box>
                <Button type="submit" mt={4} fullWidth size="large">
                  Confirm
                </Button>
              </Box>

              <Box width={1} mt={4}>
                <Button onClick={() => this.changeState('signIn')}>
                  Signin
                </Button>
              </Box>
            </Flex>
          </Card>
        </Box>
      </Flex>
    );
  };
}
