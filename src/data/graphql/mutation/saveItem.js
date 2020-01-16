import gql from 'graphql-tag';

export default gql`
  mutation saveItem($data: SaveItemInput!) {
    saveItem(input: $data) {
      id
      sk
    }
  }
`;
