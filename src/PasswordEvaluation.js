import PasswordEvaluator from './components/rules/PasswordEvaluator.js';
import PasswordCallbackRule from './components/rules/PasswordCallbackRule.js';
import PasswordLengthRule from './components/rules/PasswordLengthRule.js';

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
		new PasswordLengthRule(8),
		new PasswordCallbackRule(_hasLowercaseLetters, 
			'Must contain lowercase letters'),
		new PasswordCallbackRule(_hasUppercaseLetters, 
			'Must contain uppercase letters'),
		new PasswordCallbackRule(_hasNumbers, 
			'Must contain numbers'),
		new PasswordCallbackRule(_hasNonAlphaNumericCharacters, 
			'Must contain non-alphanumeric characters')
	];
}

export function evaluatePassword(password) {
	const evaluator = new PasswordEvaluator(_getRules());
	return evaluator.evaluatePassword(password);
}