import { DirectionalHint, FontWeights } from "@fluentui/react";
import StrengthIndicatorStyles from "./StrengthIndicatorStyles";

const PasswordBoxDefaults = {
	label: 'Password:',
	placeholder: 'Please fill in the password',

	messages: {
		empty: 'You must fill in the password'
	},

	strength: {
		style: StrengthIndicatorStyles.none
	},

	rules: {
		container: {
			calloutMaxWidth: 0,
			calloutMinWidth: 0,
			calloutWidth: 0,
			gapSpace: 5,
			isBeakVisible: true,
			beakWidth: 15,
			directionalHint: DirectionalHint.bottomCenter,
			style: {
				width: 300,
				padding: 10
			},
		},
		title: {
			text: 'Password rules',
			visible: true,
			variant: 'mediumPlus',
			style: {
				marginBottom: 0,
				fontWeight: FontWeights.semilight
			}
		},
		icons: {
			metIcon: 'CheckMark',
			notMetIcon: 'Cancel'
		}
	}
};

export default PasswordBoxDefaults;