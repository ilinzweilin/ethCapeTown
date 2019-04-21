import React, { Component } from 'react'
import './App.css'
import NetworksList from './components/networks_list'
import BalanceButton from './components/balance_button'
import ConnectedSnackBar from './components/connected_snackbar'
import DisconnectedSnackBar from './components/disconnected_snackbar'
import Web3 from 'web3'

import {
  openPaymentChannel,
  closePaymentChannel,
  submitPayment,
  joinTokenNetwork,
  getExistingPartners,
  leaveTokenNetwork
} from './helpers/payment'

const style = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
}

class App extends Component {

  state = {
    networks: [],
    partners: {},
    tokenAddress: '0x396764f15ed1467883A9a5B7D42AcFb788CD1826',
    partnerAddress: '0x5Ed1E563C6917411cB667179764C05112f0DE7B9',
    pricePerChunk: .001,
    account: undefined,
    connectedNetwork: undefined,
    balance: 0,
    connectedSnackBarOpen: false,
    disconnectedSnackBarOpen: false,
    kBytesConsumed:0,
    moneySpent:0
  }

  componentDidMount () {
    this.init()    
  }

  async init() {
    // await window.spot.disconnectFromSpot()
    window.spot.on('PAYMENT_TRIGGERED', this.payForChunks)
    await this.loadData()
    await this.getTokenBalance()
    // await this.leaveTokenNetwork()
    await this.joinTokenNetwork()
    // await this.getExistingPartners()
  }

    payForChunks = async (size) => {
    const kBytesConsumed = this.state.kBytesConsumed + size
    const moneySpent = this.state.moneySpent + this.state.pricePerChunk
    let balance = this.state.balance - this.state.pricePerChunk
    balance = balance.toFixed(3)
    this.setState({ kBytesConsumed, moneySpent, balance })
    let res = submitPayment(this.state.partnerAddress, this.state.tokenAddress, this.state.pricePerChunk)
  }

    closePaymentChannel = async () => {
    let res = await closePaymentChannel(this.state.partnerAddress, this.state.tokenAddress)
  }

  leaveTokenNetwork = async () =>{
    let res = await leaveTokenNetwork(this.state.tokenAddress)
  }

    sendMoney = async () => {
    let res = await submitPayment(this.state.partnerAddress, this.state.tokenAddress, .001)
  }
  
    joinTokenNetwork = async () => {
    let res = await joinTokenNetwork()
  }

    getExistingPartners = async () => {
    const partners = await getExistingPartners()
  }

  getTokenBalance = async () => {
    const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
    const account = await web3.eth.getAccounts()
    const weiBalance = await web3.eth.getBalance(account[0])
    const ethBalance = web3.utils.fromWei(weiBalance)
    const balance = (ethBalance/0.005449266175824176).toFixed(3)
    this.setState({ balance })
  }

  loadData = async () => {

    let networks = []
    try {
      networks = await window.spot.findSpots()    
    } catch (error) {
    }
    this.setState({ networks })
  }

  loadNetworks = () =>  {
    return (
      <div>
      <NetworksList kBytesConsumed = {this.state.kBytesConsumed} moneySpent = {this.state.moneySpent} networks={ this.state.networks } connectToNetwork = {this.connectToNetwork} disconnectFromNetwork = {this.disconnectFromNetwork} connectedNetwork = { this.state.connectedNetwork} />
      </div>
    )
  }

connectToNetwork = async (networkId) => {
  this.setState({ 
    connectedNetwork : networkId,
    connectedSnackBarOpen : true,
    disconnectedSnackBarOpen : false,
  })
  this.hideConnectedSnackBar()
  window.spot.connectToSpot()
  openPaymentChannel(this.state.partnerAddress, this.state.tokenAddress, 20, 500)
}

disconnectFromNetwork = async () => {
  // Avoiding for now due to Raiden waiting time of 500 blocks
  // await this.closePaymentChannel()
  this.setState({ 
    connectedNetwork : undefined,
    connectedSnackBarOpen : false,
    disconnectedSnackBarOpen : true,
    kBytesConsumed: 0,
    moneySpoent: 0 })
  this.hideDisconnectedSnackBar()
}

hideConnectedSnackBar = () => {
  setTimeout(() => { 
    this.setState ({ connectedSnackBarOpen : false })
  }, 3000)  
}

hideDisconnectedSnackBar = () => {
  setTimeout(() => { 
    this.setState ({ disconnectedSnackBarOpen : false })
  }, 3000)  
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <BalanceButton balance = { this.state.balance}/>
        { this.loadNetworks() }
        <ConnectedSnackBar open = {this.state.connectedSnackBarOpen}/>
        <DisconnectedSnackBar open = {this.state.disconnectedSnackBarOpen}/>
        </header>
      </div>
    )
  }
}

export default App
