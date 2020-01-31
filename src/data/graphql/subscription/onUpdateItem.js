import gql from 'graphql-tag';

export default gql`
  subscription onUpdateItem {
    onUpdateItem {
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
