import React from 'react'
import { Navbar, NavDropdown, NavItem, Grid, Nav, MenuItem } from 'react-bootstrap'
import '../../public/scss/sidebar.scss'
import LoginForm from './LoginForm.js'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { userAuth } from './services/AuthService.js'

class NavBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
    	return (
    		<Navbar className="margin-0x">
				<Navbar.Header>
					<Navbar.Brand>
                        <Link to="/">JNN</Link>
					</Navbar.Brand>
				</Navbar.Header>

				<Nav pullRight>
                    <NavItem componentClass={Link} href="/login" to="/login">Login</NavItem>
                    <NavItem componentClass={Link} href="/logout" to="/login">Logout</NavItem>
 				</Nav>
    		</Navbar>
		)
    }
}

export default NavBar