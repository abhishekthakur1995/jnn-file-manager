import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';

export const userAuth = {
	isAuthenticated: false,
  	authenticate(cb) {
    	this.isAuthenticated = true
    	setTimeout(cb, 100)
  	},
  	signout(cb) {
    	this.isAuthenticated = false
    	setTimeout(cb, 100)
  	}
}

export const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (
		userAuth.isAuthenticated === true ? <Component {...props} /> : <Redirect to={{
			pathname: '/login',
          	state: { from: props.location }
        }} />
  	)} />
)

PrivateRoute.propTypes = {
    component: PropTypes.object,
    location: PropTypes.object
}