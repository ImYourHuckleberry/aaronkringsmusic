import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify, Auth } from 'aws-amplify';
import { useEffect } from 'react';
import { listEvents } from '../graphql/queries'
import EventCreateForm from '../ui-components/EventCreateForm'
import { Card, CardContent, styled } from '@mui/material';
import './customContactFormStyles.css';
import { API, graphqlOperation } from 'aws-amplify'
import '@aws-amplify/ui-react/styles.css';
import React, { useState } from 'react';
import awsconfig from '../aws-exports';
import EventCard from './EventCard';
Amplify.configure(awsconfig)
Auth.configure(awsconfig)

const StyledCard = styled(Card)(({ theme }) => ({
  width: '80%',
  maxWidth: '1000px',
  padding: '2rem',
  marginBottom: '2rem',
  backgroundColor: '#fff',
  height: 'fit-content'
}));

const Admin = () => {
  const [events, setEvents] = useState([])
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const isAdmin = user.signInUserSession.accessToken.payload['cognito:groups']?.includes('admin');
        if (!isAdmin) {
          window.location.href = '/'; // Redirect to home page for non-admin users
        }
      } catch (error) {
        console.log('Error:', error);
        // Handle error scenario
      }
    };
    checkAdminStatus();
  }, []);

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    try {
      const eventData = await API.graphql(graphqlOperation(listEvents))
      const events = eventData.data.listEvents.items
      setEvents(events)
    } catch (err) { console.log('error fetching events') }
  }

  return (

    <>
      <StyledCard >
        <CardContent >
          <h1>Contact me for lessons or questions</h1>
          <div> {/* Apply the custom styles */}
            <EventCreateForm />
          </div>
            {
         events.map((event, index) => (
          <EventCard 
            time={event.time}
            date={event.date}
            title={event.title}
            subTitle={event.subTitle}
            extraInfo={event.extraInfo}
            location={event.location}
            bandUrl={event.bandUrl}
            veneueUrl={event.veneueUrl}

          />
          //  <div key={event.id ? event.id : index} >
          //   <p >{event.title}</p>
          //    <p>{event.subTitle}</p>
          //  </div>
         ))
       }
        </CardContent>
      </StyledCard>
    </>
      )
      
  ;
};

export default withAuthenticator(Admin);
