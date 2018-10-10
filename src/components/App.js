import React from 'react'
import NavBar from './NavBar'
import LoginForm from './LoginForm'
import ErrorPage from './ErrorPage'
import ServicePanel from './ServicePanel'
import ResetPassword from './ResetPassword'
import Dashboard from './Dashboard'
import LettertrackingDashboard from './letterTracking/LetterTrackingDashboard'
import { PrivateRoute } from './services/AuthService'
import { Grid } from 'react-bootstrap'
import { Switch, Route } from 'react-router-dom'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.doRedirectToHome = this.doRedirectToHome.bind(this)
		this.state = { initRedirection:false }
	}

	doRedirectToHome() {
		// Used to redirect to home after logout is clicked in navbar
		this.setState({ initRedirection:true })
	}

	render() {
		return (
			<Grid bsClass="app">
				<NavBar doRedirectToHome={this.doRedirectToHome} />
				<Switch>
					<Route path="/" exact={true} render={(props) => <LoginForm {...props} />} />
                    <Route path="/login" render={(props) => <LoginForm {...props} />} />
                    <PrivateRoute path={'/servicePanel/fileManager'} component={Dashboard} />
                    <PrivateRoute path={'/servicePanel/letterTracking'} component={LettertrackingDashboard} />
                    <PrivateRoute path="/servicePanel" component={ServicePanel} />
                    <PrivateRoute path="/resetPassword" component={ResetPassword} />
                    <Route component={ErrorPage} />
				</Switch>
			</Grid>
		)
	}
}

export default App
