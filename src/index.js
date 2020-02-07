import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import 'polyfill'

import React from 'react'
import ReactDOM from 'react-dom'

import 'assets/css/global.scss'

import App from 'app'
import * as serviceWorker from 'serviceWorker'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

serviceWorker.unregister()
