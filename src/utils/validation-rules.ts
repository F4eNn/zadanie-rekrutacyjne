/** @format */
import isEmail from 'validator/lib/isEmail';

export const nameAndLastNameValidation = (fieldName: 'Name' | 'Last name', value: string) => {
	if (!value.trim() && value.length === 0) {
		return `${fieldName} is required`;
	} else if (value.length < 3) {
		return `${fieldName} must include min 3 char.`;
	} else if (value.length > 15) {
		return `${fieldName} must include max 15 char.`;
	} else {
		return '';
	}
};

export const emailValidation = (email: string) => {
	if (!isEmail(email)) {
		return 'Please use correct formatting. Example: address@email.com';
	}
	return '';
};

export const fileValidation = (file: File | string) => {
	if (typeof file === 'string') {
		return file === '' ? 'Add file' : '';
	} else if (file.name === '' || file.size === 0) {
		return 'Add file';
	}
	return '';
};

export const selectedDateValidation = (day: string) => {
	if (day.length === 0) {
		return 'Select your workout day';
	}
	return '';
};
