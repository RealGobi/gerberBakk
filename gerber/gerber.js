'use strict'

const express = require('express');
const router = express.Router();

  const fs = require('fs')
  const path = require('path')
  const {promisify} = require('util')
  const pcbStackup = require('pcb-stackup')
  
  const writeFile = promisify(fs.writeFile)
  
  const GERBERS_DIR = path.join(__dirname, '../gerberFiles/')
  const TOP_OUT = path.join(__dirname, 'arduino-uno-top.svg')
  const BOTTOM_OUT = path.join(__dirname, 'arduino-uno-bottom.svg')
  
  const GERBER_FILENAMES = [
    'arduino-uno.cmp',
    'arduino-uno.drd',
    'arduino-uno.gko',
    'arduino-uno.plc',
    'arduino-uno.sol',
    'arduino-uno.stc',
    'arduino-uno.sts',
  ]
  

  router.get("/", (req, res) => {
         renderStackup()
        .then(writeStackup)
        .then(() => console.log(`Wrote:\n  ${TOP_OUT}\n  ${BOTTOM_OUT}`))
        .catch(error => console.error('Error rendering stackup', error))
  });

  function renderStackup() {
    const layers = GERBER_FILENAMES.map(filename => ({
      filename,
      gerber: fs.createReadStream(path.join(GERBERS_DIR, filename)),
    }))
  
    return pcbStackup(layers)
  }
  
  function writeStackup(stackup) {
    return Promise.all([
      writeFile(TOP_OUT, stackup.top.svg),
      writeFile(BOTTOM_OUT, stackup.bottom.svg),
    ])
  }



  module.exports = router;