import gql from 'graphql-tag';

export default gql`
  query getAllItems($username: String!, $count: Int!) {
    getAllItems(username: $username, count: $count) {
      items {
        name
        itemID
        mainUnit
      }
    }
  }
`;
