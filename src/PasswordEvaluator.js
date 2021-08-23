import PasswordCallbackRule from './components/rules/PasswordCallbackRule.js';
import { PasswordStrengthLevels } from './components/PasswordStrengthLevels.js';

function _hasMoreThanMinimumLength(password) {
	return password.length > 8;
}

function _hasLowercaseLetters(password) {
	return !!password.match(/[a-z]+/);
}

function _hasUppercaseLetters(password) {
	return !!password.match(/[A-Z]+/);
}

function _hasNumbers(password) {
	return !!password.match(/[0-9]+/);
}

function _hasNonAlphaNumericCharacters(password) {
	return !!password.match(/[^a-zA-Z0-9]+/);
}

function _getRules() {
	return [
		new PasswordCallbackRule(_hasMoreThanMinimumLength, 'Must be more than 8 characters in length'),
		new PasswordCallbackRule(_hasLowercaseLetters, 'Must contain lowercase letters'),
		new PasswordCallbackRule(_hasUppercaseLetters, 'Must contain uppercase letters'),
		new PasswordCallbackRule(_hasNumbers, 'Must contain numbers'),
		new PasswordCallbackRule(_hasNonAlphaNumericCharacters, 'Must contain non-alphanumeric characters')
	];
}

export function evaluatePassword(password) {
	if (!password) {
		return {
			level: null,
			rules: []
		};
	}

	const rules = _getRules();
	const rulesResult = [];
	let level = PasswordStrengthLevels.veryWeak;
	
	rules.forEach(rule => {
		if (rule.evaluate(password)) {
			level = level.next();
			rulesResult.push({
				ruleMet: true,
				text: rule.name
			});
		} else {
			rulesResult.push({
				ruleMet: false,
				text: rule.name
			});
		}
	});

	return {
		level: level,
		rules: rulesResult
	};
}