import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify, Auth, DataStore } from 'aws-amplify';
import { useEffect } from 'react';
import { listEvents } from '../graphql/queries'
import EventCreateFormCopy from './EventCreateFormCopy'
import EventUpdateFormCopy from './EventUpdateFormCopy';
import { Card, CardContent, styled, Snackbar, IconButton } from '@mui/material';
import './customContactFormStyles.css';
import { API, graphqlOperation } from 'aws-amplify'
import '@aws-amplify/ui-react/styles.css';
import React, { useState } from 'react';
import awsconfig from '../aws-exports';
import EventCard from './EventCard';
import { deleteEvent } from '../graphql/mutations';
import CloseIcon from '@mui/icons-material/Close';
import './Admin.css';
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
  const [editEventKey, setEditEventKey] = useState(null)
  const [eventAction, setEventAction] = useState(null)
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setEventAction(null)
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  const handleScrollToSectionAdmin = (id) => {
    const section = document.getElementById(id);
    const yOffset = -80;

    const top = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top });

  };

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
    handleScrollToSectionAdmin('top-of-admin-page')
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
    setEventAction("Deleted")
    setOpen(true)
  };
  const handleEditSubmission = (eventActionString) => {
    setEditEventKey(null)
    setIsEditing(false)
    fetchEvents()
    setEventAction(eventActionString)
    setOpen(true)
  }
  return (

    <div className='admin-container'>
      <StyledCard key={formKey} id='top-of-admin-page'>
        <CardContent >
          {!isEditing && <h1>Add an Event</h1>}
          {isEditing && <h1>Edit an Event</h1>}

          <div> {/* Apply the custom styles */}
            {!isEditing && <EventCreateFormCopy
              getFreshForm={getFreshForm}
              setEventAction={setEventAction}
              setOpen={setOpen}
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
                <button key={"edit_button_" + index} onClick={() => handleEdit(event)}>edit the card above</button>

                <button key={"delete_button_" + index} onClick={() => deleteEventById(event)}>DELETE the card above</button>
                <br></br><br></br>
              </div>

            ))
          }
        </CardContent>
      </StyledCard>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={`Event Successfully ${eventAction}`}
        action={action}
      />
    </div>
  )

    ;
};

export default withAuthenticator(Admin);
