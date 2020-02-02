import gql from 'graphql-tag';

export default gql`
  mutation saveCustomer($data: SaveCustomerInput!) {
    saveCustomer(input: $data) {
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
