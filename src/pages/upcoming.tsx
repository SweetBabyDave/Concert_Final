import { useContext, useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, query, where, doc, deleteDoc } from "firebase/firestore";
import { Event } from "../functions/concert-api";
import UserContext from "../context/user";
import { useNavigate } from "react-router-dom";

export const UpcomingEvents = () => {
    const user = useContext(UserContext);
    const navigate = useNavigate();
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        loadEvents();
    }, [events]);

    async function deleteEvent(event: Event) {
        await deleteDoc(doc(db, "events", event.id))
    }

    async function loadEvents() {
        const queryEvents = await getDocs(
            query(
                collection(db, "events"),
                where("creatorId", "==", user!.uid)
            )
        )
        const myEvents: Event[] = [];
        queryEvents.forEach((doc) => {
            myEvents.push({...doc.data(), id: doc.id} as Event);
        })
        setEvents(myEvents);
    }



    return (
        <div className="bones">
            <div>
                <h1>Upcoming Events</h1>
                <button onClick={() => navigate("/dashboard")}>Dashboard</button>
            </div>
            {events.map((event) =>
                <div id="eventdiv" key={event.id}>
                <p>
                    {event.name}
                    <button onClick={() => deleteEvent(event)}>Delete</button>
                </p>
            </div>
            )}
        </div>
    )
}