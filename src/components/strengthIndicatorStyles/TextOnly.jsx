import React from 'react';
import PropTypes from 'prop-types';

export default class StrengthIndicatorTextOnly extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const strengthLevel = this._getStrengthLevel();
		const strengthText = this._getStrengthText(strengthLevel);
		const className = this._getContainerCssClassNameFromStrengtLevel(strengthLevel);

		return (
			<div className={className}>{strengthText}</div>
		);
	}

	_getStrengthLevel() {
		return this.props.strengthLevel || null;
	}

	_getStrengthText(currentLevel) {
		return this.props.strengthText || currentLevel.defaultLabel;
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
	strengthLevel: PropTypes.object.isRequired,
	strengthText: PropTypes.string
};