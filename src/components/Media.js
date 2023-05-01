import React from 'react';
import { Card, CardContent, Button} from '@mui/material';
import './Bio.css';

const Media =()=>{
    return (
        <Card className="bio-card bio-card-second" id="listen">
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
    )
}
export default Media;