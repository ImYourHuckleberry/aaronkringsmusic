import React, { useState, useEffect } from 'react';
import './Bio.css';
import './Events.css'
import { API, graphqlOperation } from 'aws-amplify';
import { listEvents } from '../graphql/queries'
import EventCard from './EventCard';
import { CardContent, styled, Card, Typography, Button, CardMedia } from '@mui/material';
import StyledContactFormCard from './StyledContactFormCard';
import ContactCreateForm from '../ui-components/ContactCreateForm';


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
  const handleButtonAlbum = () => {
    window.open(
      'https://thewicktheatre.thundertix.com/events/197583',
      '_blank' // <- This is what makes it open in a new window.
    );
  }
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
          <Typography style={{ paddingLeft: '2rem' }} variant='h3'>Events</Typography>
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

        <StyledCard id="current-gig">
          <CardContent >
            <Card className="event-card">
              <Typography variant='h3' id="listen">New Album:<em>Now Hear This!</em></Typography>
              <h3>Available Now</h3>
              <CardMedia
                component="img"
                image="https://aaronkringsmusic-storage-5a99e8b203307-staging.s3.amazonaws.com/nowhearthis.jpg"
                alt="Event Image"
                style={{ aspectRatio: 4 / 2 }}
              />
              <Button variant="contained" color="success" onClick={handleButtonAlbum}>
                Buy
              </Button>
            </Card>
          </CardContent>
        </StyledCard>
        <br></br>
        <StyledCard className="home-card home-card-second">
          <Typography variant='h3' id="listen">Media</Typography>
          <CardContent>
            <div className="youtube-video">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/cub1ArAfhjM"
                title="YouTube Video"
                allowFullScreen
              ></iframe>
            </div>
            <p>
              Glen Miller Orchestra vs Tommy Dorsy Orchestra: Battle of the Big Bands
            </p>

          </CardContent>
        </StyledCard>
        <br></br>
        <StyledCard className="home-card" id="bio">
          <CardContent>
          <Typography variant='h3'>Bio</Typography>
          <Typography variant='h5'>About Aaron Krings</Typography>
          

            <p>Aaron Krings is an upright and electric bassist living and performing in the greater Chicagoland area. Originally from St. Louis, MO, he has been passionate about music since a young age.</p>

            <h3>Education</h3>
            <p>Aaron started playing electric bass at age 11 and double bass at age 16. He holds a bachelor's degree in music therapy and a master's degree in jazz studies from Western Illinois University.</p>

            <h3>Professional Experience</h3>
            <p>In 2019, Aaron toured with the Glenn Miller Orchestra, showcasing his bass skills across all 48 continental states and internationally in Japan and Canada. Since returning to the Chicagoland area in 2020, he has been actively involved in the local music scene, drawing inspiration from the city's rich musical heritage.</p>

            <h3>Musical Style and Collaborations</h3>
            <p>Aaron's performances cover a wide range of styles including jazz, big band, progressive rock-fusion, roots rock, bluegrass, R&B, and theatre productions. He has had the opportunity to collaborate with notable artists such as Leroy Jones, Ashlin Parker, Rick Margitza, Chris Vadala, Sam Robinson, Jim Piela, and the Blueshift Big Band.</p>

            <h3>Teaching and Music Therapy</h3>
            <p>Aaron teaches both in person and virtual upright and electric bass lessons. Additionally, he holds a board certification in music therapy and works with adult and older adult clients in long term and hospice care.</p>

            <h3>Personal Life</h3>
            <p>Aaron resides in the Portage Park neighborhood of Chicago with his wife, who is also a board-certified music therapist.</p>


            <h2>Venues Performed At:</h2>


            <ul>
              <li>Jazz Showcase, Chicago, Illinois</li>

              <li>Andy’s Jazz Club, Chicago, Illinois</li>

              <li>Constellation, Chicago, Illinois</li>

              <li>Fulton Street Collective, Chicago, Illinois </li>

              <li>Hey Nonny, Arlington Heights, Illinois </li>

              <li>Arcada Theatre, St. Charles, Illinois </li>

              <li>Blue Note, Nagoya, Japan </li>

              <li>Town Hall, New York City, New York </li>

              <li>Benaroya Hall, Seattle, Washington </li>

              <li>Orchestra Hall, Minneapolis, Minnesota </li>

              <li>Orpheum Theater, New Orleans, Louisiana </li>

              <li>Banyan Bowl, Miami, Florida </li>

              <li>Sheldon Concert Hall, St. Louis, Missouri</li>

              <li>Wick Theatre, Boca Raton, Florida</li>
            </ul>
          </CardContent>
        </StyledCard>
        <br></br>
        <div id="contact"></div>
        <StyledContactFormCard  className="home-card"><ContactCreateForm /></StyledContactFormCard>
      </div>

    </div>
  )
}
export default Events;