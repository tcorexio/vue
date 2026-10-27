import gql from 'graphql-tag'

export const GET_ORDERS = gql`
  query GetOrders {
    orders {
      total
      data {
        id
        total
        status
        payment_method
        placed_at
        currency
      }
    }
  }
`
