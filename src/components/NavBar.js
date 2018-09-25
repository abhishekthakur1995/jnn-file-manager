import React from 'react'
import { Link } from 'react-router-dom'
import { NavBarService } from './services/ApiServices'
import { Navbar, NavItem, Nav } from 'react-bootstrap'
import { userAuth } from './services/AuthService'
import PropTypes from 'prop-types'
import '../../public/scss/style.scss'
import '../../public/scss/generic.scss'

class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout() {
        NavBarService.logout().then((res) => {
            if (res.data.success === true) {
               localStorage.setItem('authToken', '')
               localStorage.setItem('userRole', '')
               this.props.doRedirectToHome()
            }
        })
    }

    render() {
        const navBtn = userAuth.isUserAuthenticated()
        ? <NavItem onClick={this.logout}>Logout</NavItem>
        : <NavItem componentClass={Link} href="/login" to="/login">Login</NavItem>

    	return (
    		<Navbar className="margin-0x">
				<Navbar.Header>
					<Navbar.Brand>
                        <Link to="/servicePanel">JNN</Link>
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