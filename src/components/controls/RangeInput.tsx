/** @format */

import { useState, useRef, useEffect } from 'react';
import { Label } from '../ui/Label';

const SliderWithLabel = () => {
	const [value, setValue] = useState(8);
	const rangeRef = useRef<HTMLInputElement>(null);
	const [labelPosition, setLabelPosition] = useState(0);

	const updateLabelPosition = () => {
		const range = rangeRef.current;
		if (!range) return;
		const min = +range.min;
		const max = +range.max;
		const newPosition = Number(((value - min) * 100) / (max - min));
		const position = newPosition * 0.955;
		setLabelPosition(position);
	};
	useEffect(() => {
		updateLabelPosition();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	return (
		<div className='flex flex-col gap-2   relative '>
			<Label htmlFor='age'>Age</Label>
			<div className='flex justify-between'>
				<span className='ml-[5px]'>8</span>
				<span>100</span>
			</div>
			<input
				type='range'
				name='age'
				min='8'
				max='100'
				value={value}
				onChange={e => setValue(+e.target.value)}
				className='w-full appearance-none h-1 bg-lightPurple slider-thumb '
				ref={rangeRef}
			/>
			<div
				style={{ left: `${labelPosition}%`, transform: 'translateX(-25%)' }}
				className='absolute  border-lightPurple border-[1px] -bottom-[45px]  w-[37px] h-[25px] text-xs flex justify-center items-center bg-white rounded after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:-top-[5px]  after:w-[9px] after:h-[9px] after:rotate-45 after:bg-white after:border-lightPurple after:border-t-[1px] after:border-l-[1px] '>
				<span className='relative z-10 text-xs font-bold text-purple'>{value}</span>
			</div>
		</div>
	);
};

export default SliderWithLabel;
