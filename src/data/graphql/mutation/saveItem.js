import gql from 'graphql-tag';

export default gql`
  mutation saveItem($itemData: SaveItemInput!) {
    saveItem(input: $itemData) {
      id
      sk
    }
  }
`;
