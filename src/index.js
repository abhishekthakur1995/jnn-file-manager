import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.js'
import { BrowserRouter as Router, browserHistory } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render((
	<Router>
    	<App />
  	</Router>
), document.getElementById('root'))
registerServiceWorker()
