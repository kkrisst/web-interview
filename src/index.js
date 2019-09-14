import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

import './fontawesome'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
