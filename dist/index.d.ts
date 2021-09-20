import * as React from 'react';
import { DirectionalHint } from '@fluentui/react';

export enum StrengthIndicatorStyles {
	bar = 'bar',
	intermittentBar = 'intermittentBar',
	textOnly = 'textOnly',
	none = 'none'
};

export interface IPasswordStrengthLevel {
	id: string;
	value: number;
	defaultThreshold: number;
	defaultLabel: string;
	defaultPercent: null;
	next: () => IPasswordStrengthLevel | null;
}

export declare class PasswordStrengthLevels {
	readonly veryWeak: IPasswordStrengthLevel;
	readonly weak: IPasswordStrengthLevel;
	readonly medium: IPasswordStrengthLevel;
	readonly strong: IPasswordStrengthLevel;
	readonly veryStrong: IPasswordStrengthLevel;
}

export declare function getAllAvailableLevels(): IPasswordStrengthLevel[];
export declare function getAvailableLevelCount(): number;

export interface IPasswordRule {
	evaluate(input: string): boolean;
	get name(): string;
}

export declare class PasswordCallbackRule implements IPasswordRule {
	constructor(callback: (input: string) => boolean, 
		name:string, 
		allowEmpty:boolean = true);

	evaluate(input: string): boolean;
	get name(): string;
}

export declare class PasswordLengthRule implements IPasswordRule {
	constructor(minimumLength:number, name:string = null);

	evaluate(input: string): boolean;
	get name(): string;
}

export declare class PasswordRegexRule implements IPasswordRule {
	constructor(regex:RegExp, 
		name:string, 
		allowEmpty:boolean = true);

		evaluate(input: string): boolean;
		get name(): string;
}

export interface IPasswordEvaluationResult {
	level: IPasswordStrengthLevel;
	rules: IPasswordRule[];
}

export declare class PasswordEvaluator {
	constructor(rules:IPasswordRule[]);

	evaluatePassword(password:string): IPasswordEvaluationResult;
}

export interface IPasswordStrengthProps {
	style: StrengthIndicatorStyles;
	percent: number;
	level: IPasswordStrengthLevel;
	text: string;
	hideOnBlur: boolean;
}

export interface IPasswordRulesContainerProps {
	calloutMaxWidth?: number;
	calloutMinWidth?: number;
	calloutWidth?: number;
	gapSpace?: number;
	isBeakVisible?: boolean;
	beakWidth?: number;
	directionalHint?: DirectionalHint;
	style?: React.CSSProperties;
}

export interface IPasswordRulesTitleProps {
	text?: string;
	visible?: boolean;
	variant?: string;
	style?: React.CSSProperties;
}

export interface IPasswordRulesIconProps {
	metIcon: string;
	notMetIcon: string;
}

export interface IPasswordRulesProps {
	rules?: IPasswordRule[];
	title?: IPasswordRulesTitleProps;
	icons?: IPasswordRulesTitleProps;
}

export interface IPasswordBoxProps {
	label?: string;
	placeholder?: string;
	description?: string;
	canReveal?: boolean;
	disabled?: boolean;
	underlined?: boolean;
	readOnly?: boolean;
	autoComplete?: boolean
	
	required?: boolean;
	emptyErrorMessage?: string;

	passwordStrengthProps?: IPasswordStrengthProps;
	passwordRulesProps?: IPasswordRulesProps;

	onPasswordChanged?: (oldValue:string, newValue: string) => void;
	onPasswordBoxInitialized?: () => void;
	onPasswordBoxDisposed?: (value: string) => void;

	onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
	onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export declare class PasswordBox extends React.Component<IPasswordBoxProps, {}> {
	constructor(props:IPasswordBoxProps);
	render(): JSX.Element;
}

export interface IPasswordStrengthIndicatorProps {
	style?: StrengthIndicatorStyles;
	strengthPercent?: number;
	strengthLevel: IPasswordStrengthLevel;
	strengthText?: string;
}

export declare class PasswordStrengthIndicator extends React.Component<IPasswordStrengthIndicatorProps, {}> {
	constructor(props: IPasswordStrengthIndicatorProps);
	render(): JSX.Element;
}