import gql from 'graphql-tag';

export default gql`
  query getLambda($id: String!) {
    getLambda(id: $id) {
      products {
        id
        name
      }
    }
  }
`;
