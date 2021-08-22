import React from 'react';
import PasswordBox from './components/PasswordBox.jsx';
import { PasswordStrengthLevels } from './components/PasswordStrengthLevels.js';
import StrengthIndicatorStyles from './components/StrengthIndicatorStyles.js';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			strengthLevel: null,
			rules: []
		}

		this._handlePasswordChanged =
			this._handlePasswordChanged.bind(this);
		this._handlePasswordBoxInitialized = 
			this._handlePasswordBoxInitialized.bind(this);
		this._handlePasswordBoxDisposed = 
			this._handlePasswordBoxDisposed.bind(this);
	}

	_handlePasswordChanged(oldValue, newValue) {
		this._log('Password changed.')
		this._log(`Old password is ${this._formatPasswordValue(oldValue)}`);
		this._log(`New password is ${this._formatPasswordValue(newValue)}`);

		const strengthLevel = this._computePasswordStrengthLevel(newValue);
		this.setState({
			strengthLevel: strengthLevel
		});
	}

	_computePasswordStrengthLevel(password) {
		if (!password) {
			return null;
		}

		let level = PasswordStrengthLevels.veryWeak;
		
		if (this._hasLowercaseLetters(password)) {
			level = level.next();
		}

		if (this._hasUppercaseLetters(password)) {
			level = level.next();
		}

		if (this._hasNonAlphaNumericCharacters(password)) {
			level = level.next();
		}

		if (this._hasMoreThanMinimumLength(password)) {
			level = level.next();
		}

		return level;
	}

	_formatPasswordValue(value) {
		return value || '<empty>';
	}

	_log(text) {
		console.log(text);
	}

	_handlePasswordBoxInitialized() {
		this._log('Password box initialized.');
	}

	_handlePasswordBoxDisposed(value) {
		this._log('Password box disposed.');
		this._log(`Last password value is ${this._formatPasswordValue(value)}.`);
	}

	_hasMoreThanMinimumLength(password) {
		return password.length > 8;
	}

	_hasLowercaseLetters(password) {
		return !!password.match(/[a-z]+/);
	}

	_hasUppercaseLetters(password) {
		return !!password.match(/[A-Z]+/);
	}

	_hasNumbers(password) {
		return !!password.match(/[0-9]+/);
	}

	_hasNonAlphaNumericCharacters(password) {
		return !!password.match(/[^a-zA-Z0-9]+/);
	}

	render() {
		const strengthLevel = this.state.strengthLevel;
		const strengthText = strengthLevel != null 
			? strengthLevel.defaultLabel 
			: null;

		return (
			<div className="lvd-passwordbox-demo-container">
				<PasswordBox 
					passwordStrengthProps={{
						style: StrengthIndicatorStyles.intermittentBar,
						level: strengthLevel,
						text: strengthText
					}}
					onPasswordChanged={this._handlePasswordChanged}
					onPasswordBoxInitialized={this._handlePasswordBoxInitialized}
					onPasswordBoxDisposed={this._handlePasswordBoxDisposed}
					required={true}
					underlined={false}
				/>
			</div>
		);
	}
}