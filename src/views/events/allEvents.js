import { Button, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EventThumbnail from './EventThumbnail.js';
import apiServices from '../../services/apiServices.js';

const AllEvents = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const fetchEvents = async () => {
        try {
          const response = await apiServices.fetchAllEvents();
          // const response = await axios.get('https://swayam-website-d9b3d-default-rtdb.asia-southeast1.firebasedatabase.app/events.json');
          setEvents(response.data);
          console.log(events);
        } catch (error) {
        console.error('Error fetching Events:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

  const eventIds = Object.keys(events);

  return (
    <>
      <div style={{ width: "80%", margin: '50px auto' }}>
        <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between' }}>
          <h1>All Events</h1>
          <Button
            variant="contained"
            size="small"
            onClick={() => { navigate(`/events/add-edit-event/${'b1'}`) }}
            style={{fontSize:"30px"}}
          >+</Button>
        </div>

        <div style={{ width: "100%", margin: '25px auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridGap:"15px" }}>
          {eventIds.map((eventId) => {
            const event = events[eventId];
            return (
              <div key={eventId}>
                <EventThumbnail
                  title={event.eventtitle}
                  url={event.eventurl}
                  imageOne={event.eventimageone}
                  imageTwo={event.eventimagetwo}
                  date={event.eventdate}
                  id={eventId} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AllEvents;
