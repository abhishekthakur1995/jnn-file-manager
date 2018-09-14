import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.js'
import { BrowserRouter as Router } from 'react-router-dom'
import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic'

ReactDOM.render((
	<Router>
		<BreadcrumbsProvider>
    		<App />
    	</BreadcrumbsProvider>
  	</Router>
), document.getElementById('root'))
