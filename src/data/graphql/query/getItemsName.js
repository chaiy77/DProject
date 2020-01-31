import gql from 'graphql-tag';

export default gql`
  query getItemsName($username: String!, $count: Int!) {
    getItemsName(username: $username, count: $count) {
      items {
        itemID
        name
      }
    }
  }
`;
