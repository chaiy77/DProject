import gql from 'graphql-tag';

export default gql`
  query getAllCustomers($username: String!) {
    getAllCustomers(username: $username) {
      customers {
        customerID
        name
        address
        district
        province
        zipcode
        telNumber
        description
        group
      }
    }
  }
`;
