import gql from 'graphql-tag';

export default gql`
  query getItemGroups($username: String!) {
    getItemGroups(username: $username) {
      itemGroups
    }
  }
`;
