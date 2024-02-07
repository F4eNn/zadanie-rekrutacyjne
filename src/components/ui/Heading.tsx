/** @format */

import { PropsWithChildren } from 'react';

type HeadingProps = PropsWithChildren;

export const Heading = ({ children }: HeadingProps) => {
	return <h2 className='font-weight-500 text-2xl'>{children}</h2>;
};
