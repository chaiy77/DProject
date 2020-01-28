import gql from 'graphql-tag';

export default gql`
  query getItemTypes($username: String!) {
    getItemTypes(username: $username) {
      types
    }
  }
`;
