export const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

export const getDate = isoDate => {
    const date = new Date(isoDate);
    const dayOfWeek = date.getDay();
    const day = days[dayOfWeek];
    let minutes = date.getMinutes();
    let hours = date.getHours();

    if (hours < 10) {
        hours = `0${hours}`;
    }

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
}