import React from 'react';
import { Authenticator } from 'aws-amplify-react';
import MSignIn from './MSignIn';
import MSignUp from './MSignUp';
import MConfirmSignUp from './MConfirmSignUp';
import MRequireNewPassword from './MRequireNewPassword';

const appName = 'D-Project';

const MAuthenticator = () => (
  <Authenticator hideDefault>
    <MSignIn appName={appName} />
    <MSignUp appName={appName} />
    <MConfirmSignUp appName={appName} />
    <MRequireNewPassword appName={appName} />
  </Authenticator>
);

export default MAuthenticator;
