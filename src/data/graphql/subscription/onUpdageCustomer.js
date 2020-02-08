import gql from 'graphql-tag';

export default gql`
  subscription onUpdateCustomer {
    onUpdateCustomer {
      customerID
      name
      address
      district
      province
      zipcode
      telNumber
      description
    }
  }
`;
