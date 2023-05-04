import React, { useState, useEffect } from "react";
import { Img, Typography, Grid, Paper, ButtonBase } from "@mui/material";
import { Storage } from "aws-amplify";
import { styled } from "@mui/material/styles";
import "./EventCard.css"; // Import the CSS file

const EventCard = ({
  time,
  date,
  title,
  subTitle,
  extraInfo,
  location,
  veneueUrl,
  bandUrl,
  image,
}) => {
  console.log("event card render")
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const getImage = async (image) => {
      console.log("hit")
      try {
        const url = await Storage.get(image);
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    if (image && !imageUrl) {
      getImage(image);
    }
  }, [image, imageUrl]);

  const convertToStandardTime = (militaryTime) => {
    if(militaryTime){
      const [hours, minutes] = militaryTime.split(":");
      let period = "AM";
    
      if (Number(hours) >= 12) {
        period = "PM";
      }
    
      let standardHours = (Number(hours) % 12) || 12;
    
      return `${standardHours}:${minutes} ${period}`;}
    };
    const formatDate = (dateString) => {
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
      };
      const dateObj = new Date(dateString);
      return dateObj.toLocaleDateString('en-US', options);
    };

  const standardTime = convertToStandardTime(time);
  const formattedDate = formatDate(date);

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

  return (
    <>
        <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <img src={imageUrl} alt="Event" />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
              <a href={bandUrl}>{title}</a>
              </Typography>
              <Typography variant="body2" gutterBottom>
                {subTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {extraInfo}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
              <span>{formattedDate}</span><span> at </span><span>{standardTime}</span>
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
               <a href={veneueUrl}>Get Tickets</a>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
    </>

  );
};

export default EventCard;
