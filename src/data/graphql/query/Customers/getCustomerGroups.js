import gql from 'graphql-tag';

export default gql`
  query getCustomerGroups($username: String!) {
    getCustomerGroups(username: $username) {
      groups
    }
  }
`;
