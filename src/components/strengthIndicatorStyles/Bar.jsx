import React from 'react';
import PropTypes from 'prop-types';

import StrengthIndicatorTextOnly from './TextOnly.jsx';

export default class StrengthIndicatorBar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const strengthText = this._getStrengthText();
		const strengthLevel = this._getStrengthLevel();
		const strengthPercent = this._getStrengthPercent(strengthLevel);
		
		const cssWidth = `${strengthPercent}%`;
		const className = this._getContainerCssClassNameFromStrengtLevel(strengthLevel);

		return (
			<React.Fragment>
				<div className={className}>
					<div className="lvd-passwordbox-strength-bar-meter" style={{width: cssWidth}}></div>
				</div>

				{!!strengthText && (
					<StrengthIndicatorTextOnly 
						strengthText={strengthText} 
						strengthLevel={strengthLevel} 
						strengthPercent={strengthPercent} />
				)}
			</React.Fragment>
		);
	}

	_getStrengthText() {
		return this.props.strengthText || null;
	}

	_getStrengthPercent(currentLevel) {
		return Math.ceil(this.props.strengthPercent || currentLevel.defaultPercent);
	}

	_getStrengthLevel() {
		return this.props.strengthLevel || null;
	}

	_getContainerCssClassNameFromStrengtLevel(strengthLevel) {
		let className = 'lvd-passwordbox-strength lvd-passwordbox-strength-bar';
		if (strengthLevel) {
			className = `${className} ${strengthLevel.id}`;
		}
		return className;
	}
}

StrengthIndicatorBar.propTypes = {
	strengthPercent: PropTypes.number,
	strengthLevel: PropTypes.object.isRequired,
	strengthText: PropTypes.string
};