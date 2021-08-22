import React from 'react';
import PropTypes from 'prop-types';

import StrengthIndicatorStyles from './StrengthIndicatorStyles';
import StrengthIndicatorBar from './strengthIndicatorStyles/Bar.jsx';
import StrengthIndicatorIntermittentBar from './strengthIndicatorStyles/IntermittentBar.jsx';
import StrengthIndicatorTextOnly from './strengthIndicatorStyles/TextOnly.jsx';

export default class PasswordStrengthIndicator extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const style = this._getStyle();
		const strengthText = this._getStrengthText();
		const strengthLevel = this._getStrengthLevel();
		const strengthPercent = this._getStrengthPercent(strengthLevel);

		const StrengthIndicatorStyleRenderer = this._getStyleRenderer(style);
		if (!StrengthIndicatorStyleRenderer) {
			throw new Error(`No renderer found for style ${style}`);
		}

		return (
			<StrengthIndicatorStyleRenderer 
				strengthPercent={strengthPercent}
				strengthText={strengthText}
				strengthLevel={strengthLevel}
			/>
		);
	}

	_getStyle() {
		return this.props.style || StrengthIndicatorStyles.textOnly;
	}

	_getStrengthText() {
		return this.props.strengthText;
	}

	_getStrengthPercent(currentStrengthLevel) {
		return Math.ceil(this.props.strengthPercent 
			|| currentStrengthLevel.defaultPercent);
	}

	_getStrengthLevel() {
		return this.props.strengthLevel;
	}

	_getStyleRenderer(style) {
		const mapping = {
			[StrengthIndicatorStyles.textOnly]: StrengthIndicatorTextOnly,
			[StrengthIndicatorStyles.bar]: StrengthIndicatorBar,
			[StrengthIndicatorStyles.intermittentBar]: StrengthIndicatorIntermittentBar
		};

		return mapping.hasOwnProperty(style)
			? mapping[style]
			: null;
	}
}

PasswordStrengthIndicator.propTypes = {
	style: PropTypes.string,
	strengthPercent: PropTypes.number,
	strengthLevel: PropTypes.object.isRequired,
	strengthText: PropTypes.string
};