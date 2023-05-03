import { encodeBase32 } from 'geohashing';

export interface Event {
    id: string,
    creatorId: string,
    name: string,
}

export async function EventList(lat: number, lon: number): Promise<Event[]> {
    const geohash = encodeBase32(lat, lon);
    const result = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}&geoPoint=${geohash}&keyword=music&radius=50`);
    const eventlist= await result.json();
    return eventlist._embedded.events;
}