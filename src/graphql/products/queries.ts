import gql from 'graphql-tag'

export const GET_PRODUCTS = gql`
  query GetProducts($limit: Int, $page: Int, $q: String) {
    products(limit: $limit, page: $page, q: $q) {
      total
      data {
        id
        sku
        name
        slug
        category {
          id
          name
        }
      }
    }
  }
`
