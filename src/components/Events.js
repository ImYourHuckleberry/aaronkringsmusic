import React, {useState, useEffect} from 'react';
import './Bio.css';
import './Events.css'
import { API, graphqlOperation } from 'aws-amplify';
import { listEvents } from '../graphql/queries'
import EventCard from './EventCard';
import { CardContent, styled, Card, Typography } from '@mui/material';


  
const Events = () => {
    const [events, setEvents] = useState([])
    const StyledCard = styled(Card)(({ theme }) => ({
    paddingTop: '2rem',
    width: '100%',
    maxWidth: '1000px',
    marginBottom: '2rem',
    backgroundColor: '#fff',
    height: 'fit-content',
  }));
  async function fetchEvents() {
    try {
      const eventData = await API.graphql(graphqlOperation(listEvents));
      const events = [...eventData.data.listEvents.items]; // Create a new array with the updated content
      events.sort((a, b) => new Date(a.date) - new Date(b.date));
      setEvents(events);
    } catch (err) {
      console.log('error fetching events');
    }
  }

    useEffect(() => {
        fetchEvents();
      }, []);
    
    return (
        <div id="home" className="events-page-container">
            <div className='admin-container'>
            <StyledCard>
              <Typography style={{paddingLeft:'2rem'}} variant='h3'>Events</Typography>
        <CardContent >
            {
            events.filter(event => !event._deleted).map((event, index) => (
              <div key={event.id} className="event-container">
                <EventCard
                  index={index}
                  time={event.time}
                  date={event.date}
                  title={event.title}
                  subTitle={event.subTitle}
                  extraInfo={event.extraInfo}
                  location={event.location}
                  bandUrl={event.bandUrl}
                  veneueUrl={event.veneueUrl}
                  image={event.image}
                  key={event.id ? event.id : index}
                  ticketAvailability={event.ticketAvailability}
                  ticketPrice={event.ticketPrice}
                  googleMapsUrl={event.googleMapsUrl}
                />                
              </div>
            ))
          }
          </CardContent>
          </StyledCard>
            </div>
            
        </div>
    )
}
export default Events;