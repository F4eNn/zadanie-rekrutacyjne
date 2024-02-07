/** @format */

import { PropsWithChildren } from 'react';
//@ts-expect-error svgr error
import ErrorIcon from '../../assets/error-icon.svg?react';

type ErrorMessageTypes = PropsWithChildren;

export const ErrorMessage = ({ children }: ErrorMessageTypes) => {
	return (
		<div className='text-darkBlue text-sm w-[225px] items-start mt-1 flex gap-2'>
			<div className='mt-1'>
				<ErrorIcon />
			</div>{' '}
			<p>{children}</p>
		</div>
	);
};
