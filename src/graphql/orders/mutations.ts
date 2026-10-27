import gql from 'graphql-tag'

const ORDER_FIELDS = `
id
notes
created_at
currency
customer_id
delivered_at
discount
paid_at
payment_method
number
placed_at
`
export const CREATE_ORDER = gql`
mutation CreateOrder($input: OrderInput!){
  createOrder(input:$input){
    ${ORDER_FIELDS}
  }
}
`

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($id: INT!, $input: OrderPatch) {
    updateOrder(id: $id, inout: $input){${ORDER_FIELDS}}
  }
`
export const DELETE_ORDER = gql`
  mutation DeleteOrder($id: Int!) {
    deleteProduct(id: $id)
  }
`
