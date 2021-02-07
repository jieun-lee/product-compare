const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

/**
 * Changes the day to an ordinal day
 * @param {number} day 
 */
const getOrdinalDay = (day) => {
    if (day === 1 || day === 21 || day === 31) {
        return `${day}st`;
    } else if (day === 2 || day === 22) {
        return `${day}nd`;
    } else if (day === 3 || day === 23) {
        return `${day}rd`;
    } else {
        return `${day}th`;
    }
}

/**
 * Formats rawHour and rawMinute to the desired string
 * @param {number} rawHour
 * @param {number} rawMinute
 */
const formatTime = (rawHour, rawMinute) => {
    const isAM = rawHour < 12;
    const hour = (rawHour % 12) === 0 ? 12 : (rawHour % 12);
    const minute = (rawMinute < 10) ? `0${rawMinute}` : rawMinute;
    return `${hour}:${minute}${isAM ? 'am' : 'pm'}`;
}

/**
 * Converts a Date into the desired string
 * February 6th, 2021 8:25pm
 * @param {Date} date
 */
export const formatDate = (date) => {
    const workingDate = new Date(date);
    const year = workingDate.getFullYear();
    const month = months[workingDate.getMonth()];
    const day = getOrdinalDay(workingDate.getDate());
    const hour = workingDate.getHours();
    const minute = workingDate.getMinutes();
    return `${month} ${day}, ${year} ${formatTime(hour, minute)}`;
}