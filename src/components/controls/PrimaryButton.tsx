/** @format */

import { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'>;

export const PrimaryButton = ({ type, ...props }: ButtonProps) => {
	return (
		<button
			{...props}
			type={type}
			className='py-2.5  text-lg px-8  bg-purple rounded text-white hover:bg-darkPurple  transition-colors duration-300'
		/>
	);
};
