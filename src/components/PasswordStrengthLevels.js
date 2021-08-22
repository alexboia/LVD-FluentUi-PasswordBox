const PasswordStrengthLevels = {
	veryWeak: {
		id: 'very-weak',
		value: 1,
		defaultThreshold: 0.1,
		defaultLabel: 'Very weak',
		defaultPercent: 20
	},
	weak: {
		id: 'weak',
		value: 2,
		defaultThreshold: 0.25,
		defaultLabel: 'Weak',
		defaultPercent: 40
	},
	medium: {
		id: 'medium',
		value: 3,
		defaultThreshold: 0.5,
		defaultLabel: 'Medium',
		defaultPercent: 60
	},
	strong: {
		id: 'strong',
		value: 4,
		defaultThreshold: 0.75,
		defaultLabel: 'Strong',
		defaultPercent: 80
	},
	veryStrong: {
		id: 'very-strong',
		value: 5,
		defaultThreshold: 0.9,
		defaultLabel: 'Very strong',
		defaultPercent: 100
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