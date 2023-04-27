import React, { useState } from 'react';
import { API } from 'aws-amplify';
import { Card, CardContent, TextField, Button } from '@mui/material';
import './Bio.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create the request payload
    const payload = {
      name: name,
      email: email,
      message: message,
    };

    console.log(payload);

    try {
      // Invoke the Lambda function
      const response = await API.post('handler', 'https://khnmm32bwpktpbo5wckujv7buu0cykti.lambda-url.us-east-1.on.aws/', { body: payload });
      console.log(response)
      // Handle the response
      // ...
    } catch (error) {
      console.log(error)
    }
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
