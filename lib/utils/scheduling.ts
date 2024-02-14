export async function fetchCalendarEvents(accessToken: string, timeMin: string, timeMax: string) {
    console.log(accessToken);
    const calendarId = 'shaaf.m.shahzad@gmail.com';
    const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`);
    
    url.searchParams.append('timeMin', timeMin);
    url.searchParams.append('timeMax', timeMax);

    const response = await fetch(url.toString(), {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const events = await response.json();
    return events;
}
