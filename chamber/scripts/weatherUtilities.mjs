export async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        } else {
            const errorText = await response.text();
            console.error(`API Error: ${response.status} ${response.statusText}. URL: ${url}. Details: ${errorText}`);
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Fetch utility error:', error.message);
        throw error; 
    }
}

export function formatUnixToTimeString(unixTime, timeZone, options = {}) {
    const defaultOptions = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        ...options
    };
    return new Date(unixTime * 1000).toLocaleTimeString("en-US", {
        ...defaultOptions,
        timeZone: timeZone
    });
}


export function formatUnixToDateTimeStrings(unixTime, timeZone) {
    const dateObj = new Date(unixTime * 1000);
    const dateString = dateObj.toLocaleDateString("en-US", {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        timeZone: timeZone
    });
    const timeString = dateObj.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: timeZone
    });
    return { date: dateString, time: timeString };
}