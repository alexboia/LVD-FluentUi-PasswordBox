import { PasswordStrengthLevels } from "../PasswordStrengthLevels.js";

export default class PasswordEvaluator {
	constructor(rules) {
		this._rules = rules || [];
		this._maxLevelScore = PasswordStrengthLevels.veryStrong.value;
		this._ruleScore = this._computeRuleScore();
	}

	_computeRuleScore() {
		return this._rules.length > 0 
			? Math.round(this._maxLevelScore / this._rules.length * 10) / 10 
			: this._maxLevelScore;
	}

	evaluatePassword(password) {
		if (!password) {
			return {
				level: null,
				rules: []
			};
		}

		if (this._rules.length == 0) {
			return {
				level: PasswordStrengthLevels.veryStrong,
				rules: []
			};
		}

		let score = 0;
		const rulesResult = [];

		this._rules.forEach(rule => {
			const ruleMet = rule.evaluate(password);

			if (ruleMet) {
				score = Math.min(this._ruleScore + score, this._maxLevelScore);
			}

			rulesResult.push({
				ruleMet: ruleMet,
				text: rule.name
			});
		});

		let level = PasswordStrengthLevels.veryWeak;
		while (level.value < score && level.value < this._maxLevelScore) {
			level = level.next();
		}

		return {
			level: level,
			rules: rulesResult
		};
	}
}