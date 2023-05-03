import { useContext, useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import UserContext from "../context/user";
import { EventList, Event, } from "../functions/concert-api";
import { GoogleMap, MarkerF, useJsApiLoader, } from "@react-google-maps/api";

export const Dashboard = () => {
    const user = useContext(UserContext);
    const navigate = useNavigate();

    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const [locationLoaded, setLocationLoaded] = useState(false);
    const [eventlist, setEventList] = useState<Event[] | undefined>(undefined);
    const { isLoaded } = useJsApiLoader({
        id: "thing",
        googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
      });

    async function saveEvent(id: string, name: string) {
        const event = {
            id: id,
            creatorId: user!.uid,
            name: name
        }
        const docRef = await addDoc(collection(db, "events"), event);
        console.log(docRef.id);
        (event as Event).id = docRef.id;
    }

    async function fetchMyEvents() {
        if (lat === 0 || lon === 0) {
            return null;
        }
        const events = await EventList(lat, lon);
        setEventList(events);
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((location) => {
            setLat(location.coords.latitude);
            setLon(location.coords.longitude);
            setLocationLoaded(true);
        }, (err) => {
            console.log(err);
        }, {
            enableHighAccuracy: true,
            timeout: 1000
        });
    }, []);

    useEffect(() => {
        fetchMyEvents();
    }, [lat, lon]);

    if (eventlist === undefined) {
        return <p>Loading...</p>
    }

    return (
        <div className="bones">
            <div className="login">
                <h1>Dashboard</h1>
            </div>
            <div className="login-commands">
                <button onClick={() => signOut(auth)}>Signout</button>
                <button onClick={() => navigate('/upcoming_events')}>Upcoming Events</button>
            </div>
            {isLoaded && locationLoaded ? (
                <GoogleMap
                mapContainerStyle={{ width: "600px", height: "600px" }}
                zoom={5}
                onLoad={(map) => {
                    const bounds = new window.google.maps.LatLngBounds();
                    map.fitBounds(bounds);
                    map.panTo({ lat: lat, lng: lon });
                }}
                >
                    // MarkerF
                    <MarkerF position={{lat: lat,lng: lon}}></MarkerF>
                </GoogleMap>
            ) : (
                <div>Loading...</div>
            )}
            <div>
                {eventlist.map((event) => {
                    return (
                        <div id="eventdiv" key={event.id}>
                            <p>
                                {event.name}
                                <button onClick={() => saveEvent(event.id, event.name)}>Save</button>
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

