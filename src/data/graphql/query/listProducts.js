import gql from 'graphql-tag';

export default gql`
  query getProducts($id: String!, $sk: String!) {
    getProducts(id: $id, sk: $sk) {
      id
      sk
      date
      attr1
    }
  }
`;
