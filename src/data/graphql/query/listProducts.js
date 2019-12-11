import gql from 'graphql-tag';

export default gql`
  query getAllProducts($count: Int!) {
    getAllProducts(count: $count) {
      products {
        id
        sk
      }
    }
  }
`;
