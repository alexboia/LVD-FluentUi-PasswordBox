import React from 'react';
import PropTypes from 'prop-types';

export default class StrengthIndicatorTextOnly extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const strengthText = this._getStrengthText();
		const strengthLevel = this._getStrengthLevel();
		const className = this._getContainerCssClassNameFromStrengtLevel(strengthLevel);

		return (
			<div className={className}>{strengthText}</div>
		);
	}

	_getStrengthText() {
		return this.props.strengthText;
	}

	_getStrengthPercent() {
		return Math.ceil(this.props.strengthPercent || 0);
	}

	_getStrengthLevel() {
		return this.props.strengthLevel || null;
	}

	_getContainerCssClassNameFromStrengtLevel(strengthLevel) {
		let className = 'lvd-passwordbox-strength lvd-passwordbox-strength-text';
		if (strengthLevel) {
			className = `${className} ${strengthLevel.id}`;
		}
		return className;
	}
}

StrengthIndicatorTextOnly.propTypes = {
	strengthPercent: PropTypes.number,
	strengthLevel: PropTypes.object,
	strengthText: PropTypes.string.isRequired
};