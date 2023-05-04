import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify, Auth, DataStore } from 'aws-amplify';
import { useEffect } from 'react';
import { listEvents } from '../graphql/queries'
import EventCreateFormCopy from './EventCreateFormCopy'
import EventUpdateFormCopy from './EventUpdateFormCopy';
import { Card, CardContent, styled } from '@mui/material';
import './customContactFormStyles.css';
import { API, graphqlOperation } from 'aws-amplify'
import '@aws-amplify/ui-react/styles.css';
import React, { useState } from 'react';
import awsconfig from '../aws-exports';
import EventCard from './EventCard';
import { Button } from 'react-scroll';
import { deleteEvent } from '../graphql/mutations';
import { Event } from '../models'
import { Api } from '@mui/icons-material';
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
  const [formKey, setFormKey] = React.useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editEventKey, setEditEventKey] = useState("null")

  console.log("admin render")
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
      fetchEvents()
    };
    checkAdminStatus();
  }, []);

  const getFreshForm = () => {
    setFormKey((prevKey) => prevKey + 1);
    fetchEvents();
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

  const handleEdit = (event) => {
    console.log("click")
    console.log(event)
    setEditEventKey(event.id)
    setIsEditing(true)
  }

  const deleteEventById = async (event) => {
    console.log(event)
    try {
      const input = {
        id: event.id,
        _version: event._version
      };

      await API.graphql(graphqlOperation(deleteEvent, { input }));
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };
  const handleEditSubmission = () => {
    setEditEventKey(null)
    setIsEditing(false)
    fetchEvents()
  }
  return (

    <>
      <StyledCard key={formKey}>
        <CardContent >
          {!isEditing && <h1>Add an Event</h1>}
          {isEditing && <h1>Edit an Event</h1>}

          <div> {/* Apply the custom styles */}
            {!isEditing && <EventCreateFormCopy
              getFreshForm={getFreshForm}
            />}


            {isEditing && <EventUpdateFormCopy
              id={editEventKey}
              handleEditSubmission={handleEditSubmission}
            />}
          </div>
          {
            events.filter(event => !event._deleted).map((event, index) => (
              <div key={event.id}>

                <EventCard
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
                />
                <button key={"edit_button_" + index} onClick={() => handleEdit(event)}>edit</button>
                <button key={"delete_button_" + index} onClick={() => deleteEventById(event)}>DELETE</button>
              </div>
            ))
          }
        </CardContent>
      </StyledCard>
    </>
  )

    ;
};

export default withAuthenticator(Admin);
