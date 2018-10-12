import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Common } from './helpers/CommonHelper'
import { userAuth } from './services/AuthService'
import { NavBarService } from './services/ApiServices'
import { Navbar, NavItem, Nav, Glyphicon, NavDropdown, MenuItem } from 'react-bootstrap'
import '../../public/scss/style.scss'
import '../../public/scss/generic.scss'
import logo from '../../public/img/jnnLogoSm.jpg'

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
    		<header id="header">
                <div className="container">
                    <div className="navbar-collapse clearfix collapse no-height" aria-expanded="false">
                        <div className="logo-box">
                            <div className="logo">
                                <Link to="/servicePanel">
                                    <img src={logo} alt="logo" />
                                </Link>
                            </div>
                        </div>
                        <ul className="nav navbar-nav navbar-right">
                            {userAuth.isUserAuthenticated() &&
                                <NavDropdown eventKey={3} title={localStorage.getItem('userRole')} id="basic-nav-dropdown">
                                    <MenuItem eventKey={3.1} componentClass={Link} href="/resetPassword" to="/resetPassword">
                                        <Glyphicon glyph="refresh"></Glyphicon> Reset Password
                                    </MenuItem>
                                    <MenuItem eventKey={3.2} onClick={this.logout}>
                                        <Glyphicon glyph="log-out margin-right-1x" />Logout
                                    </MenuItem>
                                </NavDropdown>
                            }
                        </ul>
                    </div>
                </div>
            </header>
		)
    }
}

NavBar.propTypes = {
    doRedirectToHome: PropTypes.func
}

export default NavBar