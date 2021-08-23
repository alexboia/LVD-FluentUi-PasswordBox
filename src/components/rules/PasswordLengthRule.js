export default class PasswordLengthRule {
	constructor(minimumLength, name = null) {
		this._minimumLength = minimumLength;
		this._name = name;
	}

	evaluate(input) {
		if (!input || !input.length) {
			return this._minimumLength == 0;
		}

		return input.length >= this._minimumLength;
	}

	get name() {
		return this._name || `Must be at least ${this._minimumLength} character(s) in length`;
	}
}