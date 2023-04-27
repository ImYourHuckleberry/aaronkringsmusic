import React from 'react';
import { Card, CardContent, TextField, Button } from '@mui/material';
import './Bio.css';

const ContactForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("you submitted")
  };
  return (
    <Card className="contact-form-card" id="contact">
      <CardContent>
        <h2>Contact Form</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            id="message"
            label="Message"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" onSubmit={handleSubmit}>
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
