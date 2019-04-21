let WiFiControl = require('wifi-control')
let pcap = require('pcap')
let { promisify } = require('util')
const { EventEmitter } = require('events')

// --> charge for 100KB
const chunkSize = 100000,
  chunkPrize = 1

const ssid = "ETHCapeTownWifi"
const password = "ETHCPTbuidl"

let amountPaidTotal = 0,
  bytesConsumedTotal = 0,
  bytesCurrentChunk = 0,
  tcp_tracker = new pcap.TCPTracker(),
  pcap_session = pcap.createSession('en0', "ip proto \\tcp")

WiFiControl.scanForWiFi = promisify(WiFiControl.scanForWiFi)
WiFiControl.connectToAP = promisify(WiFiControl.connectToAP)
WiFiControl.resetWiFi = promisify(WiFiControl.resetWiFi)

WiFiControl.init({
  debug: true
})

class Spot extends EventEmitter {
  constructor() {
    super()
  }

  startSpotting() {
    pcap_session.on('packet', async (raw_packet) => {
      let packet = pcap.decode.packet(raw_packet)
      tcp_tracker.track_packet(packet)
      const packetSize = packet.payload.payload.length
      bytesConsumedTotal += packetSize
      bytesCurrentChunk += packetSize
      if (bytesCurrentChunk >= chunkSize) {
        bytesCurrentChunk -= chunkSize
        this.emit('PAYMENT_TRIGGERED', 100)
      }
    })
  }

  async findSpots() {
    const data = await WiFiControl.scanForWiFi()
    return data.networks
  }

  resetValues() {
    amountPaidTotal = 0
    bytesConsumedTotal = 0
    bytesCurrentChunk = 0
  }

  async connectToSpot() {
    await WiFiControl.connectToAP({
      ssid, password
    })
    this.resetValues()
    this.startSpotting()
  }

  async disconnectFromSpot() {
    await WiFiControl.resetWiFi()
  }
}

module.exports = new Spot()
