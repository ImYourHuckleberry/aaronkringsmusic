import React, { useState } from 'react';
import { Card, CardContent, styled } from '@mui/material';
import ContactCreateForm from '../ui-components/ContactCreateForm';
import './customContactFormStyles.css';
import { API } from 'aws-amplify'
import { createContact } from '../graphql/mutations';
import { Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const StyledCard = styled(Card)(({ theme }) => ({
  minWidth: '100%',
  maxWidth: '1000px',
  padding: '2rem',
  marginBottom: '2rem',
  backgroundColor: '#fff',
  height: 'fit-content'
}));

const StyledContactFormCard = () => {
  const [open, setOpen] = useState(false);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
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

  const [formKey, setFormKey] = React.useState(0);

  const handleSubmit = async (event) => {
    const Name = event.Name
    const Email = event.Email
    const Phone = event.Phone
    const LessonType = event.LessonType
    const Message = event.Message
    // Prepare the data to send in the POST request

    try {
      // Send the POST request to the Lambda function using Amplify's API module
      await API.graphql({
        query: createContact,
        variables: {
          input: {
            Name,
            Email,
            Phone,
            LessonType,
            Message
          },
        },
      })
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
    setFormKey((prevKey) => prevKey + 1);
    setOpen(true)
  };
  return (
    <>
      <StyledCard >
        <CardContent >
          <h1>Contact me for lessons or questions</h1>
          <div className="myFormContainer"> {/* Apply the custom styles */}
            <ContactCreateForm key={formKey} onSubmit={handleSubmit} />
          </div>
        </CardContent>
      </StyledCard>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Your message has been sent!"
        action={action}
      />
    </>
  );
};

export default StyledContactFormCard;
