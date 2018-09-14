import React from 'react'
import { Glyphicon, Breadcrumb } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import PropTypes from 'prop-types'

export const CrumbIconItem = ({to, glyph, children, ...props}) => (
	<LinkContainer to={to}>
		<Breadcrumb.Item {...props}>
  			{glyph ? <span><Glyphicon glyph={glyph} /> {children}</span> : children}
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