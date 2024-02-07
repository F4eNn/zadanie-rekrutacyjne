/** @format */

export const isSameDay = (d1: Date, d2: Date) => {
	return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
};
export const formatShortWeekDay = (locale: string | undefined, date: Date) => {
	return date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2);
};
export const formatDate = (date: Date) => {
	return date.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: '2-digit' });
};
