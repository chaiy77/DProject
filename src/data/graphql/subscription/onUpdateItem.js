import gql from 'graphql-tag';

export default gql`
  subscription onUpdateItem {
    onUpdateItem {
      name
      itemID
      updatedDate
    }
  }
`;
