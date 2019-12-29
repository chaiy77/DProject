import gql from 'graphql-tag';

export default gql`
  query getAllItems($count: Int!) {
    getAllItems(count: $count) {
      items {
        id
        sk
      }
    }
  }
`;
