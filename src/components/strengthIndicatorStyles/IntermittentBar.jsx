import React from 'react';
import PropTypes from 'prop-types';

import StrengthIndicatorTextOnly from './TextOnly.jsx';
import { getAllAvailableLevels } from '../PasswordStrengthLevels.js';

export default class StrengthIndicatorIntermittentBar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const strengthText = this._getStrengthText();
		const strengthLevel = this._getStrengthLevel();
		const strengthPercent = this._getStrengthPercent();
		const className = this._getContainerCssClassNameFromStrengtLevel(strengthLevel);

		return (
			<React.Fragment>
				<div className={className}>
					{this._renderSegments(strengthLevel)}
					<div className="clear"></div>
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
		return this.props.strengthText;
	}

	_getStrengthPercent() {
		return Math.ceil(this.props.strengthPercent || 0);
	}

	_getStrengthLevel() {
		return this.props.strengthLevel || null;
	}

	_getContainerCssClassNameFromStrengtLevel(strengthLevel) {
		let className = 'lvd-passwordbox-strength lvd-passwordbox-strength-intermittent-bar';
		if (strengthLevel) {
			className = `${className} ${strengthLevel.id}`;
		}
		return className;
	}

	_renderSegments(currentLevel) {
		const segments = this._getAllAvailableLevels();

		return segments.map((strengthLevel) => {
			let className = `lvd-passwordbox-strength-intermittent-bar-segment ${strengthLevel.id}`;
			if (strengthLevel.value <= currentLevel.value) {
				className = `${className} is-active`;
			}
			return (
				<div key={strengthLevel.id} className={className}></div>
			);
		});
	}

	_getAllAvailableLevels() {
		return getAllAvailableLevels();
	}
}

StrengthIndicatorIntermittentBar.propTypes = {
	strengthPercent: PropTypes.number,
	strengthLevel: PropTypes.object,
	strengthText: PropTypes.string
};