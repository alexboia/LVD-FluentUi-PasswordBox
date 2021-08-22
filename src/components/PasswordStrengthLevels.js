const PasswordStrengthLevels = {
	veryWeak: {
		id: 'very-weak',
		value: 1
	},
	weak: {
		id: 'weak',
		value: 2
	},
	medium: {
		id: 'medium',
		value: 3
	},
	strong: {
		id: 'strong',
		value: 4
	},
	veryStrong: {
		id: 'very-strong',
		value: 5
	}
};

function getAllAvailableLevels() {
	return [
		PasswordStrengthLevels.veryWeak,
		PasswordStrengthLevels.weak,
		PasswordStrengthLevels.medium,
		PasswordStrengthLevels.strong,
		PasswordStrengthLevels.veryStrong
	];
}

export {
	PasswordStrengthLevels,
	getAllAvailableLevels
};