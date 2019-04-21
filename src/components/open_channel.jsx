import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import {
  openPaymentChannel,
  closePaymentChannel,
  submitPayment
} from '../helpers/payment'

export default class ChannelButton extends Component {

  props = {
    tokenAddress: this.props.tokenAddress
  }

  async openPaymentChannel() {
    try {
      let res = await openPaymentChannel('0xd90E2bB3E2351C503C47B55F1ba9E96C1bc64921', '0x396764f15ed1467883A9a5B7D42AcFb788CD1826', .001, 100)
      console.log("opened", res)
    } catch (err) {
      console.log(err, "opening failed")
    }
  }

  async closePaymentChannel() {
    let res = await closePaymentChannel('0xd90E2bB3E2351C503C47B55F1ba9E96C1bc64921', '0x396764f15ed1467883A9a5B7D42AcFb788CD1826')
    console.log(res, "response")
  }

  async sendMoney() {
    let res = await submitPayment('0xd90E2bB3E2351C503C47B55F1ba9E96C1bc64921', '0x396764f15ed1467883A9a5B7D42AcFb788CD1826', 1)
    console.log(res, "money sent")
  }

  render() {
    return(
      <div>
      <Button letiant="contained" color="primary" onClick={this.paymentChannel}>
      Open Channel
      </Button>
      <Button letiant="contained" color="primary" onClick={this.sendMoney}>
      Send Money
      </Button>
      </div>
    )
  }
}