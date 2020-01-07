import gql from 'graphql-tag';

export default gql`
  query getItemGroups($coCode: String!, $brCode: String!) {
    getItemGroups(coCode: $coCode, brCode: $brCode) {
      itemGroups
    }
  }
`;
