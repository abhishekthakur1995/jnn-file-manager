import React from 'react'
import NavBar from './NavBar.js'
import LoginForm from './LoginForm.js'
import ErrorPage from './ErrorPage.js'
import { Switch, Route } from 'react-router-dom'
import EntryForm from './EntryForm.js'

class App extends React.Component {
	render() {
		return (
			<div className="app">
				<NavBar />
				<Switch>
					<Route path="/" exact={true} component={EntryForm} />
                    <Route exact={true} path="/login" component={LoginForm} />
                    <Route component={ErrorPage} />
				</Switch>
			</div>
		)
	}
}

export default App
