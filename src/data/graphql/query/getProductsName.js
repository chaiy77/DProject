import gql from 'graphql-tag';

export default gql`
  query getProductsName($sk: String!, $count: Int!) {
    getProductsName(sk: $sk, count: $count) {
      products {
        id
        name
      }
    }
  }
`;
