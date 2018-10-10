import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Common } from './helpers/CommonHelper'
import { userAuth } from './services/AuthService'
import { NavBarService } from './services/ApiServices'
import { Navbar, NavItem, Nav, Glyphicon, NavDropdown, MenuItem } from 'react-bootstrap'
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
               Common.clearLocalStorageData()
               this.props.doRedirectToHome()
            }
        })
    }

    render() {
    	return (
    		<Navbar className="margin-0x">
				<Navbar.Header>
					<Navbar.Brand>
                        <Link to="/servicePanel" className="bold">JNN</Link>
					</Navbar.Brand>
				</Navbar.Header>

                {userAuth.isUserAuthenticated() && <Glyphicon className="pull-right" glyph="user" />}

				<Nav pullRight>
                    {userAuth.isUserAuthenticated() &&
                        <NavDropdown eventKey={3} title={localStorage.getItem('userRole')} id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1} componentClass={Link} href="/resetPassword" to="/resetPassword">
                                <Glyphicon glyph="refresh"></Glyphicon> Reset Password
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.2} onClick={this.logout}><Glyphicon glyph="log-out" />Logout</MenuItem>
                        </NavDropdown>
                    }

                    {!userAuth.isUserAuthenticated() && <NavItem componentClass={Link} href="/login" to="/login"><Glyphicon glyph="log-in" /> Login</NavItem>}
 				</Nav>

    		</Navbar>
		)
    }
}

NavBar.propTypes = {
    doRedirectToHome: PropTypes.func
}

export default NavBar