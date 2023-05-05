import React, { useState, useEffect } from "react";
import { Button, Grid, Paper, ButtonBase, Typography } from "@mui/material";
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
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const getImage = async (image) => {
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

  const openNewTab = (url) => {
    window.open(url, '_blank').focus()
  }

  const convertToStandardTime = (militaryTime) => {
    if (militaryTime) {
      const [hours, minutes] = militaryTime.split(":");
      let period = "AM";

      if (Number(hours) >= 12) {
        period = "PM";
      }

      let standardHours = (Number(hours) % 12) || 12;

      return `${standardHours}:${minutes} ${period}`;
    }
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
    margin: '0',
    display: 'block',
    objectFit: 'cover',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'stretch',
  });

  return (

    <Paper
      sx={{
        margin: 'auto',
        maxWidth: 1400,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
      elevation={3}
    >


      <Grid container>


        <Grid item xs={33} sm container spacing={2} sx={{ p: 2 }} >
          <Grid item xs container direction="column" className="event-column">
            <Grid item >
              <Typography variant="h4">
                {formattedDate}
              </Typography>
              <Typography variant="h5">
                {standardTime}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="h6">
                <a href={veneueUrl}>{location}</a>
              </Typography>
              <Typography variant="h7">
                <a href={bandUrl}>More Info</a>
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Img alt="complex" src={imageUrl} className="image" />


        <Grid item xs={12} sm container spacing={2} sx={{ p: 2 }} >
          <Grid item xs container direction="column" spacing={1} className="last-column">
            <Grid item xs >
              <Typography className="" gutterBottom variant="h3" component="div">
                {title}
              </Typography>
              <Typography variant="h5" gutterBottom>
                {subTitle}
              </Typography>
              <Typography variant="h7" color="text.secondary">
                {extraInfo}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">

                <Button variant="contained" onClick={() => { openNewTab(veneueUrl) }}>Get Tickets</Button>
              </Typography>
            </Grid>
          </Grid>
        </Grid>


      </Grid>
    </Paper>
  )
};

export default EventCard;
