const electron = require('electron')
const { remote } = electron

// let { findSpots } = require('./spot')
const spot = remote.getGlobal('spot')
window.spot = spot

