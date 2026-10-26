import gql from 'graphql-tag'

export const GET_PRODUCTS = gql`
  query GetProducts($limit: Int, $page: Int, $q: String) {
    products(limit: $limit, page: $page, q: $q) {
      total
      data {
        id
        created_at
        sku
        name
        slug
        description
        category {
          id
          name
        }
        category_id
        brand
        price
        compare_at_price
        currency
        color
        weight_g
        tags
        in_stock
        rating
        review_count
        status
      }
    }
  }
`

export const GET_PRODUCT = gql`
  query GetProduct($id: Int!) {
    product(id: $id) {
      id
      created_at
      updated_at
      sku
      name
      slug
      description
      category_id
      brand
      price
      compare_at_price
      currency
      color
      weight_g
      tags
      in_stock
      rating
      review_count
      status
      category {
        id
        name
      }
    }
  }
`

export const GET_CATEGORIES = gql`
  query GetCategories($limit: Int) {
    categories(limit: $limit) {
      data {
        id
        name
      }
    }
  }
`
