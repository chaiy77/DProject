/*
 * Use ApolloClient with custom AppSync Links, for versions of the Apollo client newer than 2.4.6.
 * - https://github.com/awslabs/aws-mobile-appsync-sdk-js#using-authorization-and-subscription-links-with-apollo-client-no-offline-support
 * - https://github.com/awslabs/aws-mobile-appsync-sdk-js/issues/448#issuecomment-541229659
 *
 * For use with ComplexObjectLink (AWS S3)
 * - https://github.com/awslabs/aws-mobile-appsync-sdk-js/blob/49f2c17fb4aa1006d6adb032e16b6c97a48673ba/packages/aws-appsync/src/client.ts#L102
 * - https://github.com/awslabs/aws-mobile-appsync-sdk-js/blob/master/packages/aws-appsync/src/link/complex-object-link.ts
 *
 *
 */
import ApolloClient from 'apollo-client';
import { createAuthLink } from 'aws-appsync-auth-link';
import { Auth } from 'aws-amplify';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { RetryLink } from 'apollo-link-retry';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { log } from 'common/log';

import { ComplexObjectLink } from '../node_modules/aws-appsync/lib/link/complex-object-link';

import awsConfigs from './aws-configs';

const url = awsConfigs.aws_appsync_graphqlEndpoint;
const region = awsConfigs.aws_appsync_region;
const auth = {
  type: awsConfigs.aws_appsync_authenticationType,
  credentials: () => Auth.currentCredentials(),
};
const complexObjectsCredentials = () => Auth.currentCredentials();

const httpLink = createHttpLink({ uri: url });

// console.log("======= appSyncClients =========");
// console.log("url :: ",url);
// console.log("auth:", auth.credentials);
// console.log("========================================");

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      log.error(
        `[GraphQL error ###]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    log.error(`[Network error ###]: ${networkError}`);
  }
});

const retryLink = new RetryLink({
  delay: {
    initial: 500,
    max: Infinity,
    jitter: true,
  },
  attempts: {
    max: 5,
    retryIf: error => !!error,
  },
});

const complexObjectLink = new ComplexObjectLink(complexObjectsCredentials);

const link = ApolloLink.from([
  onErrorLink,
  retryLink,
  complexObjectLink,
  createAuthLink({ url, region, auth }),
  createSubscriptionHandshakeLink(url, httpLink),
]);

const client = new ApolloClient({ link, cache: new InMemoryCache() });

export default client;
