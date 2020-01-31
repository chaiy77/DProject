import gql from 'graphql-tag';

export default gql`
  mutation saveItem($data: SaveItemInput!) {
    saveItem(input: $data) {
      name
      itemID
      mainUnit
      packingUnits {
        name
        multiplier
      }
      rentable
      type
      group
      updatedDate
      createdDate
    }
  }
`;
