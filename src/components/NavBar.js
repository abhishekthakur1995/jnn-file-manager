import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Common } from './helpers/CommonHelper'
import { userAuth } from './services/AuthService'
import { NavBarService } from './services/ApiServices'
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl'
import { Glyphicon, NavDropdown, MenuItem, Grid, ListGroup } from 'react-bootstrap'
import '../../public/scss/style.scss'
import '../../public/scss/generic.scss'
import logo from '../../public/img/jnnLogoTransparent.png'

const messages = defineMessages({
    welcomeText: {
        id: 'common.navbar.welcomeText',
        defaultMessage: 'Welcome'
    }
})

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
        const { intl } = this.props
    	return (
    		<Grid componentClass="header" id="header" bsClass="custom-navbar">
                <Grid bsClass="container-fluid">
                    <Grid bsClass="navbar-collapse clearfix collapse no-height" aria-expanded="false">
                        <Grid bsClass="logo-box">
                            <Grid bsClass="logo">
                                <Link to="/servicePanel">
                                    <img src={logo} alt="logo" />
                                </Link>
                            </Grid>
                        </Grid>
                        {userAuth.isUserAuthenticated() &&
                            <ListGroup componentClass="ul" bsClass="nav navbar-nav navbar-right">
                                <ListGroup componentClass="li" bsClass="nav-link">
                                    <Link to="/servicePanel">
                                        <FormattedMessage id="common.navbar.servicePanelLink" defaultMessage="Service Panel" />
                                    </Link>
                                </ListGroup>

                                <NavDropdown eventKey={3} title={`${intl.formatMessage(messages.welcomeText)}, ${localStorage.getItem('userRole')}`} id="basic-nav-dropdown">
                                    <MenuItem eventKey={3.1} componentClass={Link} href="/resetPassword" to="/resetPassword">
                                        <Glyphicon glyph="refresh" className="margin-right-1x"></Glyphicon>
                                        <FormattedMessage id="common.navbar.resetPasswordLink" defaultMessage="Reset Password" />
                                    </MenuItem>
                                    <MenuItem eventKey={3.2} onClick={this.logout}>
                                        <Glyphicon glyph="log-out" className="margin-right-1x" />
                                        <FormattedMessage id="common.navbar.logoutLink" defaultMessage="Logout" />
                                    </MenuItem>
                                </NavDropdown>
                            </ListGroup>
                        }
                    </Grid>
                </Grid>
            </Grid>
		)
    }
}

NavBar.propTypes = {
    intl: PropTypes.object,
    doRedirectToHome: PropTypes.func
}

export default injectIntl(NavBar)