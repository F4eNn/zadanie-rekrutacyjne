/** @format */

import { ComponentProps } from 'react';

type FormProps = ComponentProps<'form'>;

export const Form = ({ ...props }: FormProps) => {
	return (
		<form
			className='flex my-[120px] flex-col gap-7 max-w-[440px] mx-auto p-2 '
			{...props}
		/>
	);
};
