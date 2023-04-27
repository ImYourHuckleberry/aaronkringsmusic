import React from 'react';
import { Card, CardContent } from '@mui/material';
import './Bio.css';
import ContactForm from './ContactForm'
import ContactCreateForm from '../ui-components/ContactCreateForm';

const Bio = () => {
  return (
    <div className="bio-container">
      <Card className="bio-card" id="bio">
        <CardContent>
          <h2>Aaron Krings</h2>
          <p>
            Aaron Krings is a highly accomplished bassist with a passion for jazz and music therapy. Born and raised in St. Louis, Aaron began playing electric bass at a young age and later pursued a degree in music therapy, with a minor in jazz studies. He has performed with renowned orchestras and traveled internationally to share his love of music. Currently, Aaron is captivating audiences as the featured bassist in the musical "Million Dollar Quartet." With his exceptional musicianship and dynamic stage presence, Aaron continues to make a lasting impact in the music industry.
          </p>
        </CardContent>
      </Card>
      <Card className="bio-card bio-card-second" id="media">
        <CardContent>
          <h2>Media</h2>
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
      </Card>
      <ContactForm />
    </div>
  );
};

export default Bio;
