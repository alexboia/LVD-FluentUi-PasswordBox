import React from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@fluentui/react';

import PasswordBoxDefaults from './PasswordBoxDefaults.js';
import StrengthIndicatorStyles from './StrengthIndicatorStyles.js';
import PasswordStrengthIndicator from './PasswordStrengthIndicator.jsx';
import PasswordStatusCallout from './PasswordStatusCallout.jsx';

export default class PasswordBox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			password: '',
			hasInteracted: false,
			showRulesCallout: true,
			canShowRulesCallout: false,
			showStrengthIndicator: true
		};

		this._handlePasswordFocused =
			this._handlePasswordFocused.bind(this);
		this._handlePasswordBlured = 
			this._handlePasswordBlured.bind(this);
		this._handlePasswordChanged = 
			this._handlePasswordChanged.bind(this);
		this._getPasswordFieldErrorMessage = 
			this._getPasswordFieldErrorMessage.bind(this);
		
		this._handlePasswordStatusCalloutDismiss = 
			this._handlePasswordStatusCalloutDismiss.bind(this);

		this._passwordBoxContainerRef = React.createRef();
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
		this.setState({
			canShowRulesCallout: true
		});

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

	_handlePasswordFocused(event) {
		if (!!this.state.password) {
			this.setState({
				showRulesCallout: true
			});
		}

		this.setState({
			showStrengthIndicator: true
		});

		if (this.props.onFocus != null) {
			this.props.onFocus(event);
		}
	}

	_handlePasswordBlured(event) {
		this.setState({
			showStrengthIndicator: this._shouldShowOnBlur()
		});

		if (this.props.onBlur != null) {
			this.props.onBlur(event);
		}
	}

	_shouldShowOnBlur() {
		const strengthProps = this._getPasswordStrengthProps();
		return !strengthProps.hideOnBlur;
	}

	render() {
		return (
			<div className="lvd-passwordbox-root" ref={this._passwordBoxContainerRef}>
				{this._renderPasswordInputField()}
				{this._renderPasswordStrengthIndicator()}
				{this._renderPasswordRulesCallout()}
			</div>
		);
	};

	_renderPasswordInputField() {
		const label = this._getLabel();
		const placeholder = this._getPlaceholder();
		const description = this._getDescription();
		const canReveal = this._canReveal();
		const disabled = this._isDisabled();
		const required = this._isRequired();
		const className = this._getClassName();
		const underlined = this._isUnderlined();
		const readOnly = this._isReadOnly();
		const autoComplete = this._isAutoComplete() 
			? 'on' 
			: 'off';

		return (
			<TextField 
				type="password"
				label={label}
				placeholder={placeholder}
				description={description}
				canRevealPassword={canReveal} 
				disabled={disabled}
				required={required}
				onChange={this._handlePasswordChanged}
				onFocus={this._handlePasswordFocused}
				onBlur={this._handlePasswordBlured}
				onGetErrorMessage={this._getPasswordFieldErrorMessage}
				className={className}
				underlined={underlined}
				readOnly={readOnly}
				autoComplete={autoComplete}
			/>
		);
	}

	_getLabel() {
		return this.props.label || PasswordBoxDefaults.label;
	}

	_getPlaceholder() {
		return this.props.placeholder || PasswordBoxDefaults.placeholder;
	}

	_getDescription() {
		return this.props.description || PasswordBoxDefaults.description;
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

	_isReadOnly() {
		return !!this.props.readOnly;
	}

	_isAutoComplete() {
		return !!this.props.autoComplete;
	}

	_renderPasswordStrengthIndicator() {
		const strengthProps = this._getPasswordStrengthProps();
		const showIndicator = this._shouldShowStrengthIndicator(strengthProps);

		return showIndicator && (
			<PasswordStrengthIndicator
				style={strengthProps.style}
				strengthPercent={strengthProps.percent} 
				strengthLevel={strengthProps.level} 
				strengthText={strengthProps.text}
			/>
		);
	}

	_getPasswordStrengthProps() {
		const strengthProps = this.props.passwordStrengthProps || {};
		return {
			style: strengthProps.style || PasswordBoxDefaults.strength.style,
			percent: strengthProps.percent || 0,
			level: strengthProps.level || null,
			text: strengthProps.text || null,
			hideOnBlur: strengthProps.hasOwnProperty('hideOnBlur')
				? !!strengthProps.hideOnBlur
				: false
		};
	}

	_shouldShowStrengthIndicator(strengthProps) {
		return  !!strengthProps.style 
			&& strengthProps.style != StrengthIndicatorStyles.none
			&& strengthProps.level != null
			&& this.state.showStrengthIndicator;
	}

	_renderPasswordRulesCallout() {
		const passwordRulesProps = this._getPasswordRulesProps();
		const showRulesCallout = this._shouldShowRulesCallout(passwordRulesProps);

		return showRulesCallout && (
			<PasswordStatusCallout 
				rules={passwordRulesProps.rules} 
				iconProps={passwordRulesProps.icons}
				containerProps={passwordRulesProps.container}
				titleProps={passwordRulesProps.title}
				target={this._passwordBoxContainerRef.current} 
				onDismiss={this._handlePasswordStatusCalloutDismiss}
			/>
		);
	}

	_getPasswordRulesProps() {
		const passwordRulesProps = this.props.passwordRulesProps || {};
		return {
			rules: passwordRulesProps.rules || [],
			container: Object.assign(PasswordBoxDefaults.rules.container, 
				passwordRulesProps.container || {}),
			title: Object.assign(PasswordBoxDefaults.rules.title, 
				passwordRulesProps.title || {}),
			icons: Object.assign(PasswordBoxDefaults.rules.icons, 
				passwordRulesProps.icons || {})
		};
	}

	_shouldShowRulesCallout(passwordRulesProps) {
		return this.state.canShowRulesCallout
			&& this.state.showRulesCallout
			&& passwordRulesProps.rules.length > 0;
	}

	_handlePasswordStatusCalloutDismiss() {
		this.setState({
			showRulesCallout: false
		});
	}
}

PasswordBox.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string,
	description: PropTypes.string,
	canReveal: PropTypes.bool,
	disabled: PropTypes.bool,
	underlined: PropTypes.bool,
	readOnly: PropTypes.bool,
	autoComplete: PropTypes.bool,
	
	required: PropTypes.bool,
	emptyErrorMessage: PropTypes.string,

	passwordStrengthProps: PropTypes.object,
	passwordRulesProps: PropTypes.object,

	onPasswordChanged: PropTypes.func,
	onPasswordBoxInitialized: PropTypes.func,
	onPasswordBoxDisposed: PropTypes.func,

	onFocus: PropTypes.func,
	onBlur: PropTypes.func
};