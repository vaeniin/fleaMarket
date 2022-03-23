import dayjs from 'dayjs';
let advancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(advancedFormat);

export const formatDate = (d) => {
    const date = dayjs(d);
    const now = dayjs();
    const sameYear = now.year() === date.year();
    const sameMonth = now.month() === date.month();
    const sameDay = now.date() === date.date();

    if (sameYear && sameMonth && sameDay) return date.format('HH:mm');
    if (sameYear && sameMonth) return date.format('Do HH:mm');
    if (sameYear) return date.format('Do MMMM HH:mm');

    return date.format('Do MMMM YYYY HH:mm');
};

export const compareDates = (d1, d2) => {
    if (!d1) return true;
    if (!d2) return true;
    
    return new Date(d1) > new Date(d2);
};

export const setLocation = (loc) => {
    if (!loc) return;

    if (loc.postalcode) return loc.postalcode + ', ' + loc.country;
    else if (loc.city) return loc.city + ', ' + loc.country;
    else if (loc.region) return loc.region + ', ' + loc.country;
    
    return loc.country;
};

export const requiredFields = (required, fields) => {
    const result = {};

    required.forEach(item => {
        const regex = /location/g;
        if (!regex.test(item) && (fields[item] === undefined || fields[item].length < 1)) {
            result[item] = 'This field is required!';
        }
    });

    if (fields.email) {
        const regex = /\S+@\S+\.\S+/;
        if (!regex.test(fields.email)) result['email'] = 'Not a valid email address!';
    };
    if (fields.location && !fields.location?.country) result.location = 'This field is required!';

    return Object.keys(result).length < 1 ? false : result;
};

export const generateOTP = () => {
    let string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let OTP = '';
    
    const len = string.length;
    for (let i = 0; i < 4; i++) {
        OTP += string[Math.floor(Math.random() * len)];
    }
    
    return OTP;
};