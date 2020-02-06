/*
  Refererence: https://github.com/aws-amplify/amplify-js/blob/master/packages/aws-amplify-react/src/Auth/SignUp.jsx.
*/
import React from 'react';
import { Auth } from 'aws-amplify';

// import { Flex, Box, Text, Card, Button } from '../../common/components/base';
// import { Input, Label } from 'common/components/form';
import { Flex, Box, Text, Card, Button } from '../base';
import { Input, Label } from '../form';

import MAuthPiece from './MAuthPiece';

export default class MSignUp extends MAuthPiece {
  constructor(props) {
    super(props);
    this.validAuthStates = ['signUp'];
  }

  signUp = async e => {
    e.preventDefault();
    const {
      username,
      password,
      email,
      Company,
      CoCode,
      Branch,
      BrCode,
    } = this.inputs;
    // console.log(Company);
    // console.log({ username, password, email, Company, CoCode, Branch, BrCode });
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          'custom:Company': Company,
          'custom:CoCode': CoCode,
          'custom:Branch': Branch,
          'custom:BrCode': BrCode,
        },
      })
        .then() // data => console.log('signUp completed:', data))
        .catch(err => console.error('signUp Error: ', err));
      this.changeState('confirmSignUp', username);
    } catch (err) {
      this.error(err);
    }
  };

  showComponent = () => {
    const { hide } = this.props;
    if (hide && hide.includes(MSignUp)) {
      return null;
    }

    /**
     * Disabled SignUp in Production.
     */
    let disabledSignUp = false;
    if (process.env.NODE_ENV === 'production') {
      disabledSignUp = true;
    }

    return (
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bg="transparent"
        width={['100%', '400px']}
        style={{ height: '100vh' }}
      >
        <Box width={1}>
          <Text fontWeight="bold" fontSize={5} sx={{ textAlign: 'center' }}>
            D-Project
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
              SignUp
            </Text>
            <Box as="form" width={1} mt={1} onSubmit={this.signUp}>
              <Box width={1} mt={4}>
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

              <Box width={1} mt={4}>
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

              <Box width={1} mt={4}>
                <Label htmlFor="email" mb={2} fontSize={1}>
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder=""
                  onChange={this.handleInputChange}
                />
              </Box>
              <Box width={1} mt={4}>
                <Label htmlFor="Company" mb={2} fontSize={1}>
                  Company
                </Label>
                <Input
                  id="Company"
                  name="Company"
                  placeholder="company name"
                  onChange={this.handleInputChange}
                />
              </Box>
              <Box width={1} mt={4}>
                <Label htmlFor="CoCode" mb={2} fontSize={1}>
                  Co-Code
                </Label>
                <Input
                  id="CoCode"
                  name="CoCode"
                  placeholder="company code ex.co12. length 6-9 chars"
                  onChange={this.handleInputChange}
                />
              </Box>
              <Box width={1} mt={4}>
                <Label htmlFor="Branch" mb={2} fontSize={1}>
                  Branch
                </Label>
                <Input
                  id="Branch"
                  name="Branch"
                  placeholder="branch name (default : head office)"
                  onChange={this.handleInputChange}
                />
              </Box>
              <Box width={1} mt={4}>
                <Label htmlFor="BrCode" mb={2} fontSize={1}>
                  Branch-Code
                </Label>
                <Input
                  id="BrCode"
                  name="BrCode"
                  placeholder="branch code (default : H01)"
                  onChange={this.handleInputChange}
                />
              </Box>
              <Button
                type="submit"
                mt={4}
                size="large"
                disabled={disabledSignUp}
                onClick={this.signUp}
              >
                Signup
              </Button>
            </Box>

            <Box width={1} mt={4}>
              <Button onClick={() => this.changeState('signIn')}>Signin</Button>
            </Box>
          </Flex>
        </Card>
      </Flex>
    );
  };
}
