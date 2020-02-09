import { Input, Button, Label } from 'semantic-ui-react';
import { Fragment } from 'react';
import  CartItemQuantity from './CartItemQuantity'; 

import { addToCart } from '../lib/moltin'

export default class AddToCart extends React.Component {
  state = {
    loading: false,
    quantity: 1
  }

  _handleSubmit = async () => {
    const { productId } = this.props
    const { quantity } = this.state
    const cartId = await localStorage.getItem('mcart')

    this.setState({
      loading: true
    })

    const cart = await addToCart(cartId, productId, quantity)

    this.setState({
      loading: false,
      quantity: this.state.quantity
    })
  }

  _handleChange = ({ target: { value } }) =>
    this.setState({
      quantity: value
    })

  render() {
    const { loading, quantity } = this.state

    return (
      <Fragment>
        <Input
          type="number"
          placeholder="Quantity"
          min="0"
          value={quantity}
          onChange={e => this._handleChange(e)}
          action={{
            color: 'orange',
            content: 'Add to Cart',
            icon: 'plus cart',
            onClick: this._handleSubmit,
            loading,
            disabled: loading
          }}
      />
        <CartItemQuantity quantity={quantity}/>
      </Fragment>
    )
  }
}
