import React from 'react'
import { isEmail, isNumeric, isMobilePhone } from 'validator';

export const required = (value, props) => {
  	if (!value || (props.isCheckable && !props.checked)) {
    	return <span className="error is-visible">Required</span>;
  	}
}

export const email = (value) => {
  	if (!isEmail(value)) {
    	return <span className="error is-visible">{value} is not a valid email.</span>;
  	}
}

export const lt = (value, props) => {
  	// get the maxLength from component's props
  	if (value.toString().trim().length > props.maxLength) {
    	// Return jsx
    	return <span className="error is-visible">The value exceeded {props.maxLength} symbols.</span>
  	}
}

export const isEqual = (value, props, components) => {
  	const bothUsed = components.password[0].isUsed && components.confirm[0].isUsed;
  	const bothChanged = components.password[0].isChanged && components.confirm[0].isChanged;

  	if (bothChanged && bothUsed && components.password[0].value !== components.confirm[0].value) {
    	return <span className="error is-visible">Passwords are not equal.</span>;
  	}
}

export const number = (value, props, component) => {
	if (!isNumeric(value)) {
  		return <span className="error is-visible">{value} is not a valid number.</span>;
	}
}

export const password = (value, props, components) => {
  	// NOTE: Tricky place. The 'value' argument is always current component's value.
  	// So in case we're 'changing' let's say 'password' component - we'll compare it's value with 'confirm' value.
  	// But if we're changing 'confirm' component - the condition will always be true
  	// If we need to always compare own values - replace 'value' with components.password[0].value and make some magic with error rendering.
 	 if (value !== components['confirm'][0].value) { // components['password'][0].value !== components['confirm'][0].value
    	// 'confirm' - name of input
    	// components['confirm'] - array of same-name components because of checkboxes and radios
    	return <span className="error">Passwords are not equal.</span>
  	}
}

export const phoneNumber = (value) => {
	if (!isMobilePhone(value)) {
  		return <span className="error is-visible">{value} is not a valid phone number.</span>;
	}
}