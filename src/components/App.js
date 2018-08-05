import React from 'react'
import NavBar from './NavBar.js'
import LoginForm from './LoginForm.js'
import Dashboard from './Dashboard.js'
import ErrorPage from './ErrorPage.js'
import { PrivateRoute } from './services/AuthService.js'
import { Grid } from 'react-bootstrap'
import { Switch, Route } from 'react-router-dom'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.doRedirectToHome = this.doRedirectToHome.bind(this)
		this.state = {
			initRedirection:false
		}
	}

	doRedirectToHome() {
		this.setState(() => ({
			initRedirection:true
		}))
	}

	render() {
		return (
			<Grid bsClass="app">
				<NavBar doRedirectToHome={this.doRedirectToHome}/>
				<Switch>
					<Route path="/" exact={true} render={(props) => <LoginForm {...props} />} />
                    <Route path="/login" render={(props) => <LoginForm {...props} />} />
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                    <Route component={ErrorPage} />
				</Switch>
			</Grid>
		)
	}
}

export default App
