//declare function to format date to dynamic date
const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
    { label: 'second', seconds: -10 }
];

export function formatDate(date) {
    const seconds = Math.floor((Date.now() - date) / 1000);
    const interval = intervals.find((interval) => {
        return interval.seconds < seconds;
    });
    const count = Math.floor(seconds / interval.seconds);
    return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
}
