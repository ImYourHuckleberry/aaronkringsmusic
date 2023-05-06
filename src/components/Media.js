import React from 'react';
import { Card, CardContent, styled, Typography } from '@mui/material';
import './Bio.css';

const Media = () => {
  const StyledCard = styled(Card)(({ theme }) => ({
    paddingTop: '2rem',
    width: '100%',
    maxWidth: '800px',
    marginBottom: '2rem',
    backgroundColor: '#fff',
    height: 'fit-content',
  }));
  return (
    <StyledCard className="home-card home-card-second">
        <Typography variant='h3'>Media</Typography>
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
  )
}
export default Media;