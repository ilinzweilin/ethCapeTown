import React, { Component } from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import ListItem from "@material-ui/core/ListItem"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import NetworkToggle from "./toggle_on"
import Button from '@material-ui/core/Button'

export default class NetworksList extends Component {

  props = {
      networks: [],
      connectedNetwork: undefined,
      connectToNetwork: {},
      disconnectFromNetwork: {},
      kBytesConsumed: 0,
      moneySpent: 0
  }
  state = {
      connected: false
  }

  showNetworksList() {
    const { networks, connectedNetwork, connectToNetwork, disconnectFromNetwork, kBytesConsumed } = this.props
      return (
        <div className="mainContent" >
          <Typography className="paymentInfo">
          Pay .001 ETC / 100 Kbyte 
          </Typography>
          <div className="networkList">
            {
              networks.map((network, i) => (
                <ListItem key={i}>
                  <ListItemText primary={network.ssid} /> 
                  
                  {
                    (connectedNetwork && connectedNetwork === network.mac) && (
                    <Typography className ="dataConsumption" primary={`${kBytesConsumed} kBytes`}> 
                    {`${kBytesConsumed} kBytes`}
                    </Typography>
                    )
                  }

                  <ListItemSecondaryAction>
                    <NetworkToggle connectToNetwork = {connectToNetwork} disconnectFromNetwork = {disconnectFromNetwork} networkId={network.mac} disabled={connectedNetwork && connectedNetwork !== network.mac}/>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            }
          </div>
        </div>
      )
  }
  showDataStats() {
    return ( <Button  color="primary">
       Connected
      </Button>
    )
  }

  render() {
    if (!this.state.connected) {
        return (
           <div>
               { this.showNetworksList() }
           </div> 
        )
    } else {
        return (
            <div>
                { this.showDataStats() }
            </div> 
         )
    }
  }
}
