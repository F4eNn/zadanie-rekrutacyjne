/** @format */

import { ComponentProps } from 'react';

type InputProps = ComponentProps<'input'> & { isError: boolean };

export const Input = ({ isError, ...props }: InputProps) => {
	return (
		<>
			<input
				{...props}
				className={`rounded-lg p-2.5 focus:ring-2 focus:ring-purple focus:border-opacity-0 focus:border-purple   border-lightPurple ${
					isError ? 'border-[2px] border-red bg-rose' : ''
				}`}
			/>
		</>
	);
};
