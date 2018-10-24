import React from 'react'
import ReactDOM from 'react-dom'
import messages from './messages'
import App from './components/App'
import { flattenMessages } from './util'
import en from 'react-intl/locale-data/en'
import hi from 'react-intl/locale-data/hi'
import { addLocaleData, IntlProvider } from 'react-intl'
import { BrowserRouter as Router } from 'react-router-dom'
import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic'

addLocaleData([...en, ...hi])

let locale = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || 'en-HI'

ReactDOM.render((
	<IntlProvider locale={locale} messages={flattenMessages(messages[locale])}>
		<Router>
			<BreadcrumbsProvider>
	    		<App />
	    	</BreadcrumbsProvider>
  		</Router>
  	</IntlProvider>
), document.getElementById('root'))
