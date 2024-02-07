/** @format */

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Calendar from 'react-calendar';

//@ts-expect-error svgr error
import InfoIcon from '../../assets/info-icon.svg?react';
import { checkIfObservanceDay, fetchAPI, getNationalHolidays, getObservanceDays } from '../../utils/api-helpers';
import { formatDate, formatShortWeekDay, isSameDay } from '../../utils/date-helpers';
import { APIResponseTypes } from '../../model/api';
import { Label } from '../ui/Label';
import { API_KEY, BACKEND_URL } from '../../config';

type DatePickerProps = {
	toggleTimePicker: Dispatch<SetStateAction<boolean>>;
};

export const DatePicker = ({ toggleTimePicker }: DatePickerProps) => {
	const [nationalHolidays, setNadionalHolidays] = useState<Date[]>([]);
	const [observanceDays, setObservanceDays] = useState<APIResponseTypes[]>([]);
	const [isObservanceDay, setIsObservanceDay] = useState<Pick<APIResponseTypes, 'name'> | null>(null);
	const [selectedDay, setSelectedDay] = useState('');

	const disabledDays = (date: Date) => {
		return date.getDay() === 0 || nationalHolidays.some(disabledDate => isSameDay(date, new Date(disabledDate)));
	};

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		let isMounted = true;

		const getDisabledDates = async () => {
			const path = `${BACKEND_URL}?country=PL&year=2023`;
			const options = {
				'X-Api-Key': `${API_KEY}`,
				'Content-Type': 'application/json',
			};
			const data = await fetchAPI<APIResponseTypes[]>(path, options);

			const nationalHolidaysDates = getNationalHolidays(data);
			const observanceDays = getObservanceDays(data);

			setObservanceDays(observanceDays);
			setNadionalHolidays(nationalHolidaysDates);
		};
		getDisabledDates();

		return () => {
			isMounted = false;
		};
	}, []);

	const handleSelectDay = (selectedDate: Date) => {
		const observanceDay = checkIfObservanceDay(observanceDays, selectedDate);
		setSelectedDay(formatDate(selectedDate));
		toggleTimePicker(true);
		return setIsObservanceDay(observanceDay ? { name: observanceDay.name } : null);
	};
	return (
		<div className='flex items-center flex-col w-full'>
			<div>
				<Label className='self-start'>Date</Label>
				<input
					type='hidden'
					value={selectedDay}
					name='selectedDay'
				/>
				<Calendar
					locale='en-GB'
					showNeighboringMonth={false}
					defaultActiveStartDate={new Date('2023')}
					minDate={new Date('2023')}
					tileDisabled={({ date }) => disabledDays(date)}
					onClickDay={date => handleSelectDay(date)}
					formatShortWeekday={(locale, date) => formatShortWeekDay(locale, date)}
				/>
				<input
					type='hidden'
					value={'2023'}
					name='date'
				/>
				<div className={`flex gap-2 items-center mt-1 ${isObservanceDay ? 'visible' : 'invisible'}`}>
					<InfoIcon />
					<span className='text-sm'>{isObservanceDay?.name}</span>
				</div>
			</div>
		</div>
	);
};
