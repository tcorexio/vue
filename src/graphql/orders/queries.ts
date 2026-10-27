import gql from 'graphql-tag'

export const GET_ORDERS_PAGINATION = gql`
  query GetOrdersPagination(
    $ids: Int
    $limit: Int
    $page: Int
    $q: String
    $sort: String
  ) {
    orders(ids: $ids, limit: $limit, page: $page, q: $q, sort: $sort) {
      data {
        notes
        customer {
          address
          company
          created_at
          email
          id
          marketing_opt_in
          name
          notes
          orders_count
          phone
          tier
          total_spent
          updated_at
        }
        created_at
        currency
        customer_id
        delivered_at
        discount
        id
        paid_at
        payment_method
        number
        placed_at
        shipped_at
        shipping
        shipping_address
        shipping_method
        status
        subtotal
        tax
        total
        tracking_number
        updated_at
      }
      limit
      page
      pages
      total
    }
  }
`
