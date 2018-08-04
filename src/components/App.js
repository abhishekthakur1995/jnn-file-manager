import React from 'react'
import NavBar from './NavBar.js'
import LoginForm from './LoginForm.js'
import Dashboard from './Dashboard.js'
import ErrorPage from './ErrorPage.js'
import { PrivateRoute } from './services/AuthService.js'
import { Switch, Route } from 'react-router-dom'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			authenticated: false
		}
	}

	render() {
		return (
			<div className="app">
				<NavBar />
				<Switch>
					<Route path="/" exact={true} render={(props) => <LoginForm {...props} />} />
                    <Route exact={true} path="/login" render={(props) => <LoginForm {...props} />} />
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                    <Route component={ErrorPage} />
				</Switch>
			</div>
		)
	}
}

export default App
