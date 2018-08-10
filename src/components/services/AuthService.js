import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

export const userAuth = {
  	authenticate(authToken, validUpto, cb) {
        localStorage.setItem('authToken', authToken)
        localStorage.setItem('tokenValidUpto', validUpto)
    	setTimeout(cb, 100)
  	},
  	signout(cb) {
        localStorage.setItem('authToken', null)
    	cb()
  	},
    isUserAuthenticated() {
        var isAuthenticated = false
        const validUpto = localStorage.getItem('tokenValidUpto')
        if (validUpto && Date.now() < validUpto) {
            isAuthenticated = localStorage.getItem('authToken') ? true : false
        }
        return isAuthenticated
    }
}

export const PrivateRoute = ({ component: Component, ...rest }) => (
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