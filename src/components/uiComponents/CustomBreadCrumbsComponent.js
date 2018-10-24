import React from 'react'
import PropTypes from 'prop-types'
import { LinkContainer } from 'react-router-bootstrap'
import { Grid, Glyphicon, Breadcrumb } from 'react-bootstrap'

export const CrumbIconItem = ({to, glyph, children, ...props}) => (
    <LinkContainer to={to}>
        <Breadcrumb.Item {...props}>
            {glyph ? <Grid componentClass="span" bsClass=""><Glyphicon glyph={glyph} /> {children}</Grid> : children}
        </Breadcrumb.Item>
    </LinkContainer>
)

CrumbIconItem.propTypes = {
    to: PropTypes.string,
    glyph: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ])
}

export const CrumbItem = ({to, ...props}) => (
    <LinkContainer to={to}>
        <Breadcrumb.Item {...props}>
        </Breadcrumb.Item>
    </LinkContainer>
)

CrumbItem.propTypes = {
    to: PropTypes.string
}