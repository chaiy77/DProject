import gql from 'graphql-tag';

export default gql`
  query getItemTypes($coCode: String!, $brCode: String!) {
    getItemTypes(coCode: $coCode, brCode: $brCode) {
      itemTypes
    }
  }
`;
