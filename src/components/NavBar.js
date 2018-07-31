import React from 'react'
import { Navbar, NavDropdown, NavItem, Grid, Nav, MenuItem } from 'react-bootstrap'
import '../scss/generic.scss'
import LoginForm from './LoginForm.js'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class NavBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
    	return (
    		<Navbar className="margin-0x">
				<Navbar.Header>
					<Navbar.Brand>
                        <Link to="/">Jaipur Nagar Nigam</Link>
					</Navbar.Brand>
				</Navbar.Header>

				<Nav pullRight>
                    <NavItem componentClass={Link} href="/login" to="/login">Login</NavItem>
 				</Nav>
    		</Navbar>
		)
    }
}

export default NavBar