import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';

export const userAuth = {
  	authenticate(authToken, cb) {
        localStorage.setItem('authToken', authToken)
    	setTimeout(cb, 100)
  	},
  	signout(cb) {
        localStorage.setItem('authToken', null)
    	cb()
  	},
    isUserAuthenticated() {
        const isAuthenticated = localStorage.getItem('authToken') ? true : false
        return isAuthenticated
    }
}

export const PrivateRoute = ({ component: Component, isAuthenticated: isAuthenticated, ...rest }) => (
	<Route {...rest} render={(props) => (
		userAuth.isUserAuthenticated() === true ? <Component {...props} /> : <Redirect to={{
			pathname: '/login',
          	state: { from: props.location }
        }} />
  	)} />
)

PrivateRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
    isAuthenticated: PropTypes.bool
}