import React from 'react'
import PropTypes from 'prop-types'
import { USERS } from './../helpers/Constants'
import { Route, Redirect } from 'react-router-dom'

export const userAuth = {
  	authenticate(authToken, validUpto, cb) {
        localStorage.setItem('authToken', authToken)
        localStorage.setItem('tokenValidUpto', validUpto)
    	cb()
  	},
  	signout(cb) {
        localStorage.setItem('authToken', null)
        localStorage.setItem('userRole', null)
    	cb()
  	},
    isUserAuthenticated() {
        var isAuthenticated = false
        const validUpto = localStorage.getItem('tokenValidUpto')
        if (validUpto && Date.now() < validUpto) {
            isAuthenticated = localStorage.getItem('authToken') ? true : false
        }
        return isAuthenticated
    },
    getHeaders() {
        return { 'Authorization': this.getUserAuthToken(), 'UserRole': this.getUserRole() }
    },
    getUserRole() {
        return localStorage.getItem('userRole')
    },
    getUserAuthToken() {
        return localStorage.getItem('authToken')
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

export const SystemUserRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        userAuth.isUserAuthenticated() === true && userAuth.getUserRole() === USERS.SYSUSER ? <Component {...props} /> : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
        }} />
    )} />
)

SystemUserRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
    isAuthenticated: PropTypes.bool
}

export const SystemAdminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        userAuth.isUserAuthenticated() === true && userAuth.getUserRole() === USERS.SYSADMIN ? <Component {...props} /> : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
        }} />
    )} />
)

SystemAdminRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
    isAuthenticated: PropTypes.bool
}