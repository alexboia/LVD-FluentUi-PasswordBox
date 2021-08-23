const PasswordStrengthLevels = {
	veryWeak: {
		id: 'very-weak',
		value: 1,
		defaultThreshold: 0.1,
		defaultLabel: 'Very weak',
		defaultPercent: 20,
		next: () => PasswordStrengthLevels.weak
	},
	weak: {
		id: 'weak',
		value: 2,
		defaultThreshold: 0.25,
		defaultLabel: 'Weak',
		defaultPercent: 40,
		next: () => PasswordStrengthLevels.medium
	},
	medium: {
		id: 'medium',
		value: 3,
		defaultThreshold: 0.5,
		defaultLabel: 'Medium',
		defaultPercent: 60,
		next: () => PasswordStrengthLevels.strong
	},
	strong: {
		id: 'strong',
		value: 4,
		defaultThreshold: 0.75,
		defaultLabel: 'Strong',
		defaultPercent: 80,
		next: () => PasswordStrengthLevels.veryStrong
	},
	veryStrong: {
		id: 'very-strong',
		value: 5,
		defaultThreshold: 0.9,
		defaultLabel: 'Very strong',
		defaultPercent: 100,
		next: () => PasswordStrengthLevels.veryStrong
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

function getAvailableLevelCount() {
	return getAllAvailableLevels().length;
}

export {
	PasswordStrengthLevels,
	getAllAvailableLevels,
	getAvailableLevelCount
};