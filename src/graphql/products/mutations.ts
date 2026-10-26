import gql from 'graphql-tag'

const PRODUCT_FIELDS = `
  id
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
  status
`

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      ${PRODUCT_FIELDS}
    }
  }
`

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: Int!, $input: ProductPatch!) {
    updateProduct(id: $id, input: $input) {
      ${PRODUCT_FIELDS}
    }
  }
`

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id)
  }
`
