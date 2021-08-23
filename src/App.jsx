import React from 'react';
import PasswordBox from './components/PasswordBox.jsx';
import StrengthIndicatorStyles from './components/StrengthIndicatorStyles.js';

import { evaluatePassword } from './PasswordEvaluation.js';

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

		const result = evaluatePassword(newValue);

		this.setState({
			strengthLevel: result.level,
			rules: result.rules
		});
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

	render() {
		const rules = this.state.rules;
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
					passwordRulesProps={{
						rules: rules
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