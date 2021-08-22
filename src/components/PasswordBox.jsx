import React from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@fluentui/react';

import PasswordBoxDefaults from './PasswordBoxDefaults.js';

export default class PasswordBox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			password: '',
			hasInteracted: false
		};

		this._handlePasswordChanged = 
			this._handlePasswordChanged.bind(this);
		this._getPasswordFieldErrorMessage = 
			this._getPasswordFieldErrorMessage.bind(this);
	}

	_handlePasswordChanged(event) {
		event.preventDefault();
		const oldPassword = this.state.password;
		this.setState({
			password: event.target.value,
			hasInteracted: true
		}, () => this._raisePasswordChanged(oldPassword));
	}

	_raisePasswordChanged(oldValue) {
		const newValue = this.state.password;
		if (this.props.onPasswordChanged != null) {
			this.props.onPasswordChanged(oldValue, newValue);
		}
	}

	_getPasswordFieldErrorMessage(value) {
		const message = this._getEmptyErrorMessage();
		return this._displayPasswordErrorMessages(value)
			? message
			: '';
	}

	_displayPasswordErrorMessages(value) {
		return !this._isPasswordFilledIn(value) 
			&& this._displayFieldErrorMessages() 
			&& this._isRequired();
	}

	_isPasswordFilledIn(value) {
		return (value != null && value.length > 0);
	}

	_displayFieldErrorMessages() {
		return !!this.state.hasInteracted;
	}

	_getEmptyErrorMessage() {
		return this.props.emptyErrorMessage 
			|| PasswordBoxDefaults.messages.empty;
	}

	componentDidMount() {
		if (this.props.onPasswordBoxInitialized != null) {
			this.props.onPasswordBoxInitialized();
		}
	}

	componentWillUnmount() {
		const value = this.state.password;
		if (this.props.onPasswordBoxDisposed != null) {
			this.props.onPasswordBoxDisposed(value);
		}
	}

	render() {
		const label = this._getLabel();
		const canReveal = this._canReveal();
		const disabled = this._isDisabled();
		const required = this._isRequired();
		const className = this._getClassName();
		const underlined = this._isUnderlined();

		return (
			<TextField 
				type="password"
				label={label}
				canRevealPassword={canReveal} 
				disabled={disabled}
				required={required}
				onChange={this._handlePasswordChanged}
				onGetErrorMessage={this._getPasswordFieldErrorMessage}
				className={className}
				underlined={underlined}
			/>
		);
	};

	_getLabel() {
		return this.props.label || PasswordBoxDefaults.label;
	}

	_canReveal() {
		return this.props.hasOwnProperty('canReveal') 
			? !!this.props.canReveal
			: true;
	}

	_isRequired() {
		return !!this.props.required;
	}

	_isDisabled() {
		return !!this.props.disabled;
	}

	_getClassName() {
		return this.props.className || '';
	}

	_isUnderlined() {
		return !!this.props.underlined;
	}

	_getPasswordSampleStatus() {
		const status = {
			strength: {
				score: { //or percentage 0-1
					value: 1,
					max: 5 
				},
				description: 'The password is strong with this one!'
			},
			rules: [
				{
					text: 'Must contain characters',
					ruleMet: false
				}
			]
		};
	}

	_getPasswordStatusProps() {
		return {
			onPasswordStatusRequested: null,
			requireInputStabilityMilliseconds: 400,
			strengthIndicator: {
				style: 'bar/intermittentBar/textOnly/none',
				mapping: {
					veryWeak: 0.1,
					weak: 0.25,
					medium: 0.5,
					strong: 0.75,
					veryStrong: 0.9
				},
				mappingLabels: {
					veryWeak: 'Very weak',
					weak: 'Weak',
					medium: 'Medium',
					strong: 'Strong',
					veryStrong: 'Very strong'
				}
			},
			rulesCallout: {
				position: 'auto',
				beakSize: 29,
				gapSize: 10
			}
		}
	}
}

PasswordBox.propTypes = {
	label: PropTypes.string,
	canReveal: PropTypes.bool,
	disabled: PropTypes.bool,
	underlined: PropTypes.bool,
	
	required: PropTypes.bool,
	emptyErrorMessage: PropTypes.string,

	passwordStatusProps: PropTypes.object,

	onPasswordChanged: PropTypes.func,
	onPasswordBoxInitialized: PropTypes.func,
	onPasswordBoxDisposed: PropTypes.func
};