/** @format */

import  { ComponentProps } from 'react';

type LabelProps = ComponentProps<'label'>;

export const Label = ({ ...props }: LabelProps) => {
	return <label {...props}></label>;
};
