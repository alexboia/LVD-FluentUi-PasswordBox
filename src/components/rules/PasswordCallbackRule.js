export default class PasswordCallbackRule {
	constructor(callback, name, allowEmpty = true) {
		this._callback = callback;
		this._name = name;
		this._allowEmpty = allowEmpty;
	}

	evaluate(input) {
		if (!input) {
			return this._allowEmpty;
		}

		return this._callback(input);
	}

	get name() {
		return this._name;
	}
}