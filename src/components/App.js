import React from 'react'
import EntryForm from './EntryForm.js'
import NavBar from './NavBar.js'
import LoginForm from './LoginForm.js'
import SideBar from './SideBar.js'
import ErrorPage from './ErrorPage.js'
import { Switch, Route } from 'react-router-dom'


class App extends React.Component {
	render() {
		return (
			<div className="app">
				<NavBar />
				<Switch>
					<Route path="/" exact={true} component={LoginForm} />
                    <Route exact={true} path="/login" component={LoginForm} />
                    <Route component={ErrorPage} />
				</Switch>
			</div>
		)
	}
}

export default App
