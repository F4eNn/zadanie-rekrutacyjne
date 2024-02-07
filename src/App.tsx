/** @format */

import { FormEvent, useState } from 'react';

import { DatePicker } from './components/controls/DatePicker';
import { FileInput } from './components/controls/FileInput';
import { Form } from './components/controls/Form';
import { Input } from './components/controls/Input';
import { PrimaryButton } from './components/controls/PrimaryButton';
import RangeInput from './components/controls/RangeInput';
import { TimePicker } from './components/controls/TimePicker';
import { Heading } from './components/ui/Heading';
import { InputWrapper } from './components/ui/InputWrapper';
import { Label } from './components/ui/Label';
import { ErrorMessage } from './components/ui/ErrorMessage';
import {
	emailValidation,
	fileValidation,
	nameAndLastNameValidation,
	selectedDateValidation,
} from './utils/validation-rules';
import { fetchAPI } from './utils/api-helpers';
import { FORM_BACKEND_URL } from './config';

export type FormDataTypes = {
	name: string;
	age: string;
	email: string;
	lastName: string;
	file: File | string;
	selectedDay: string;
	time: string;
};

function App() {
	const [errors, setErrors] = useState<Omit<FormDataTypes, 'time' | 'age'>>({
		email: '',
		lastName: '',
		name: '',
		file: '',
		selectedDay: '',
	});
	const [showTimePicker, setShowTimePicker] = useState(false);
	const [newFile, setNewFile] = useState<File | string>('');

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		formData.append('file', newFile);
		const credentials = Object.fromEntries(formData) as FormDataTypes;
		const { email, file, lastName, name, selectedDay } = credentials;
		const newErrors = {
			name: nameAndLastNameValidation('Name', name),
			lastName: nameAndLastNameValidation('Last name', lastName),
			email: emailValidation(email),
			selectedDay: selectedDateValidation(selectedDay),
			file: fileValidation(file as File),
		};
		const formIsValid = !Object.values(newErrors).some(error => error);
		setErrors(newErrors);
		if (formIsValid) {
			const path = FORM_BACKEND_URL;
			const options = {
				method: 'POST',
				body: credentials,
			};
			// console logs just for check if everything works
			console.log('sent');
			console.log(credentials);
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const res = await fetchAPI(path, options);
			console.log(res);
		}
	};

	return (
		<>
			<Form
				onSubmit={handleSubmit}
				noValidate>
				<Heading>Personal info</Heading>
				<InputWrapper>
					<Label htmlFor='name'>First Name</Label>
					<Input
						isError={!!errors.name}
						name='name'
						placeholder='John'
						type='text'
					/>
					{errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
				</InputWrapper>
				<InputWrapper>
					<Label htmlFor='lastName'>Last Name</Label>
					<Input
						isError={!!errors.lastName}
						name='lastName'
						placeholder='Doe'
						type='text'
					/>
					{errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
				</InputWrapper>
				<InputWrapper>
					<Label htmlFor='email'>Email Address</Label>
					<Input
						isError={!!errors.email}
						name='email'
						type='email'
						placeholder='johndoe@emails.com'
					/>
					{errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
				</InputWrapper>
				<InputWrapper>
					<RangeInput />
				</InputWrapper>
				<InputWrapper>
					<FileInput
						thisFileName={newFile as File}
						handleSetFile={setNewFile}
					/>
					{errors.file && <ErrorMessage>{errors.file as string}</ErrorMessage>}
				</InputWrapper>
				<Heading>Your workout</Heading>
				<div className='flex sm:flex-row sm:gap-6 flex-col'>
					<InputWrapper>
						<DatePicker toggleTimePicker={setShowTimePicker} />
						{errors.selectedDay && <ErrorMessage>{errors.selectedDay as string}</ErrorMessage>}
					</InputWrapper>
					{showTimePicker && <TimePicker />}
				</div>
				<PrimaryButton type='submit'>Send Application</PrimaryButton>
			</Form>
		</>
	);
}

export default App;
