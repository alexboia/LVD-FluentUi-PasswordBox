import React from 'react';
import PropTypes from 'prop-types';

import { DirectionalHint, FontWeights, TextField } from '@fluentui/react';
import { Text, Callout } from '@fluentui/react';

import PasswordBoxDefaults from './PasswordBoxDefaults.js';

export default class PasswordStatusCallout extends React.Component {
	constructor(props) {
		super(props);

		this._handleCalloutDismiss = 
			this._handleCalloutDismiss.bind(this);
	}

	_handleCalloutDismiss() {
		if (this.props.onDismiss != null) {
			this.props.onDismiss();
		}
	}

	render() {
		const target = this._getTarget();
		const containerProps = this._getContainerProps();
		const rules = this._getRules();

		return rules.length && (
			<Callout 
				target={target} 
				gapSpace={containerProps.gapSpace}
				isBeakVisible={containerProps.isBeakVisible}
				beakWidth={containerProps.beakWidth}
				directionalHint={containerProps.directionalHint}
				setInitialFocus={true}
				style={containerProps.style}
				onDismiss={this._handleCalloutDismiss}>
				
				{this._renderTitle()}

				<div className="lvd-passwordbox-rules-container">
					<ul>{this._renderPassowrdRules(rules)}</ul>
				</div>

			</Callout>
		);;
	}

	_getTarget() {
		return this.props.target;
	}

	_getContainerProps() {
		const containerProps = this.props.containerProps || {};
		return Object.assign(PasswordBoxDefaults.rules.container, 
			containerProps);
	}

	_getRules() {
		return this.props.rules || [];
	}

	_renderTitle() {
		const titleProps = this._getTitleProps();
		const showTitle = titleProps.visible 
			&& !!titleProps.text;

		return showTitle && (
			<Text variant={titleProps.variant} style={titleProps.style}>{titleProps.text}</Text>
		);
	}

	_getTitleProps() {
		const titleProps = this.props.title;
		return Object.assign(PasswordBoxDefaults.rules.title, 
			titleProps);
	}

	_renderPassowrdRules(rules) {
		let ruleIndex = 0;
		const iconProps = this._getIconProps();

		return rules.map((rule) => {
			const ruleKey = `rule-${ruleIndex++}`;
			let ruleIcon = iconProps.notMetIcon;
			let className = 'lvd-passwordbox-rule';

			if (rule.ruleMet) {
				className = `${className} is-rule-met`;
				ruleIcon = iconProps.metIcon;
			} else {
				className = `${className} is-not-rule-met`;
			}

			const ruleIconClassName = `lvd-passwordbox-rule-icon ms-Icon ms-Icon--${ruleIcon}`;

			return (
				<li key={ruleKey} className={className}>
					<i className={ruleIconClassName}></i>
					{rule.text}
				</li>
			);
		});
	}

	_getIconProps() {
		const iconProps = this.props.iconProps || {};
		return Object.assign(PasswordBoxDefaults.rules.icons, iconProps);
	}
}

PasswordStatusCallout.propTypes = {
	target: PropTypes.element.isRequired,
	rules: PropTypes.arrayOf(PropTypes.object).isRequired,
	iconProps: PropTypes.object,
	containerProps: PropTypes.object,
	titleProps: PropTypes.object,

	onDismiss: PropTypes.func
};