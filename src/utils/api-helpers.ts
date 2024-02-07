/** @format */

import { APIResponseTypes } from '../model/api';
import { isSameDay } from './date-helpers';

type APIResponse<T> = T;

export const fetchAPI = async <T>(path: string, options = {}): Promise<APIResponse<T>> => {
	try {
		const mergedOptions = {
			headers: {
				...options,
			},
		};
		const res = await fetch(path, mergedOptions);
		if (!res.ok) {
			throw new Error('Invalid response');
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getNationalHolidays = (apiData: APIResponseTypes[]) =>
	apiData.filter(({ type }) => type === 'NATIONAL_HOLIDAY').map(({ date }) => date);

export const getObservanceDays = (apiData: APIResponseTypes[]) => apiData.filter(({ type }) => type === 'OBSERVANCE');

export const checkIfObservanceDay = (observanceDays: APIResponseTypes[], selectedDate: Date) =>
	observanceDays.find(day => isSameDay(selectedDate, new Date(day.date)));
