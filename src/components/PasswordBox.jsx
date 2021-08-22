import React from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@fluentui/react';

export default class PasswordBox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			password: ''
		};
	}
	
	render() {
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
		return (
			<TextField 
				label="Password" 
				canRevealPassword={true} 
			/>
		);
	};

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
	passwordStatusProps: PropTypes.object,

	onPasswordChanged: PropTypes.func,
	onPasswordBoxDisposed: PropTypes.func
};