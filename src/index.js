import React from 'react'
import ReactDOM from 'react-dom'
import App from './app.js'
import './css/style.css'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
