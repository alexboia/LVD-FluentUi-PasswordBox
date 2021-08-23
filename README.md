# LVD-FluentUi-PasswordBox

A ReactJS password box built using the [FluentUI library](https://github.com/microsoft/fluentui).
It features a basic structure, with some additional features: 

- a strength indicator which can be set to one of the three avaialble different flavours;
- a password status callout bubble, which shows the strength rules the password must meet and which have been met thus far.

Additionally, it exposes some of the customization options which are available for the standard FluentUI `TextInput` field.

Here's a static screenshot of how it all looks like [using the default styling](https://github.com/alexboia/LVD-FluentUi-PasswordBox/tree/main/src/css/components):

<p align="left">
	<img align="center" src="https://raw.githubusercontent.com/alexboia/LVD-FluentUi-PasswordBox/main/docs/Sample.png" style="margin-bottom: 20px; margin-right: 20px; border-radius: 5px;" />
</p>

And also an animated gif which shows how it all respons to user input:

<p align="left">
	<img align="center" src="https://raw.githubusercontent.com/alexboia/LVD-FluentUi-PasswordBox/main/docs/AnimationPWD.gif" style="margin-bottom: 20px; margin-right: 20px; border-radius: 5px;" />
</p>

## Installation
<a name="lb-installation"></a>

`npm install --save lvd-fluentui-passwordbox`

## Demo
<a name="lb-demo"></a>

The `demo` directory contains [a compiled and ready-to-run example](https://github.com/alexboia/LVD-FluentUi-PasswordBox/tree/main/demo). Just open up the `index.html` file.

## Basic Usage


```javascript
import React from 'react';
import { PasswordBox, StrengthIndicatorStyles } from 'lvd-fluentui-passwordbox';

class SomePasswordPage extends React.Component {
	constructor(props) {
		super(props);

		this._handlePasswordChanged =
			this._handlePasswordChanged.bind(this);
	}

	_handlePasswordChanged(oldValue, newValue) {
		// For instance, compute strength level or password rules
		//	See below for a built-in API to do that (though it's not mandatory)
	}

	render() {
		const strengthLevel = /* fetch or compute strength level from somehwere */;
		const strengthLevelText = /* fetch or compute strength level text from somehwere */;
		const rules = /* fetch or compute password rules from somewhere */;

		return (
			<PasswordBox 
				label="Your password, please"
				placeholder="Please fill in your new password"
				canReveal={true}
				required={true}
				underlined={true}
				emptyErrorMessage="The password is required, whether you like it or not!"
				passwordStrengthProps={{
					style: StrengthIndicatorStyles.intermittentBar,
					level: strengthLevel,
					text: strengthText
				}}
				passwordRulesProps={{
					rules: rules
				}}
				onPasswordChanged={this._handlePasswordChanged}
			/>
		);
	}
}
```