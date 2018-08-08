import React from 'react'
import { Navbar, NavItem, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { userAuth } from './services/AuthService.js'
import PropTypes from 'prop-types'
import '../../public/scss/sidebar.scss'
import '../../public/scss/generic.scss'

class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout() {
        localStorage.setItem('authToken', '')
        this.props.doRedirectToHome()
    }

    render() {
        const navBtn = userAuth.isUserAuthenticated()
        ? <NavItem onClick={this.logout}>Logout</NavItem>
        : <NavItem componentClass={Link} href="/login" to="/login">Login</NavItem>

    	return (
    		<Navbar className="margin-0x">
				<Navbar.Header>
					<Navbar.Brand>
                        <Link to="/dashboard">JNN</Link>
					</Navbar.Brand>
				</Navbar.Header>

				<Nav pullRight>
                    {navBtn}
 				</Nav>
    		</Navbar>
		)
    }
}

NavBar.propTypes = {
    doRedirectToHome: PropTypes.func
}

export default NavBar