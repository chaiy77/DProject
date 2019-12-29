import gql from 'graphql-tag';

export default gql`
  query getItemsName($sk: String!, $count: Int!) {
    getItemsName(sk: $sk, count: $count) {
      items {
        id
        name
      }
    }
  }
`;
