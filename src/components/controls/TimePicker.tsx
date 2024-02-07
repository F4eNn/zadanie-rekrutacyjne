/** @format */

import { Label } from '../ui/Label';
import { useState } from 'react';

export const TimePicker = () => {
	const times = ['11:00', '13:30', '17:30', '19:00', '20:30'];
	const [selectedTime, setSelectedTime] = useState<string>(times[0]);

	const handleTimeClick = (time: string) => {
		setSelectedTime(time);
	};
	return (
		<div>
			<input
				type='hidden'
				name='time'
				value={selectedTime}
			/>
			<div className='flex flex-wrap items-center justify-center flex-col px-[38px] sm:px-0 '>
				<Label
					htmlFor='time'
					className='self-start'>
					Time
				</Label>
				<div className='flex flex-wrap n sm:justify-normal gap-2 sm:gap-3'>
					{times.map((time, idx) => (
						<button
							key={idx}
							name='time'
							onClick={() => handleTimeClick(time)}
							type='button'
							className={`rounded-lg ${
								selectedTime === time ? 'border-purple border-[2px]' : ''
							}  border-lightPurple outline-purple/50  bg-white block border-[1px] py-2 px-5`}>
							{time}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};
