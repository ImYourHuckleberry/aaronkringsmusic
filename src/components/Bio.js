import React from 'react';
import { Card, CardContent, Button} from '@mui/material';
import './Bio.css';
import ContactCreateForm from '../ui-components/ContactCreateForm';
import StyledContactFormCard from './StyledContactFormCard';

const Bio = () => {
  const handleButtonShow=()=>{
    window.open(
      'https://thewicktheatre.thundertix.com/events/197583',
      '_blank' // <- This is what makes it open in a new window.
    );
  }
  const handleButtonAlbum=()=>{
    window.open(
      'https://jonolejnik.bandcamp.com/album/now-hear-this',
      '_blank' // <- This is what makes it open in a new window.
    );
  }


  return (
    <div className="bio-container">
      <div className='current-event'>
      <h1 className='name-title'>Aaron Krings</h1>

      
      
      <h1>New Album: <em>NOW HEAR THIS!</em></h1>
    <h1>Available Now!</h1>
    <div>
    <img src="https://aaronkringsmusic-storage-5a99e8b203307-staging.s3.amazonaws.com/nowhearthis.jpg" alt = "now hear this"></img>
    </div>
    <Button variant="contained" color="success" onClick={handleButtonAlbum}>
          Buy
        </Button>
      </div>
      <Card className="bio-card" id="current-gig">
        <CardContent>
        <h2>Now Playing in <em>The Million Dollar Quartet</em></h2>
        <h3>April 20 - May 14</h3>
        <div>
        <img src="https://aaronkringsmusic-storage-5a99e8b203307-staging.s3.amazonaws.com/MDQ.png" alt="million dollar quartet"></img>
        </div>
        <Button variant="contained" color="success" onClick={handleButtonShow}>
          Get Tickets
        </Button>
        </CardContent>
      </Card>
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
      <StyledContactFormCard ><ContactCreateForm/></StyledContactFormCard>
      <div> 
    </div>
    </div>
  );
};

export default Bio;
