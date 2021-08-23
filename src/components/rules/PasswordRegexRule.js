export default class PasswordRegexRule {
	constructor(regex, name, allowEmpty = true) {
		this._regex = regex;
		this._name = name;
		this._allowEmpty = allowEmpty;
	}

	evaluate(input) {
		if (!input) {
			return this._allowEmpty;
		}

		return !!input.match(this._regex);
	}

	get name() {
		return this._name;
	}
}