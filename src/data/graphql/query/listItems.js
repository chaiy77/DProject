import gql from 'graphql-tag';

export default gql`
  query getAllItems($username: String!, $count: Int!) {
    getAllItems(username: $username, count: $count) {
      items {
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
  }
`;
