import React from 'react';
import { Card, CardContent, Button } from '@mui/material';
import './Bio.css';

const Bio = () => {
  return (
    <Card className="bio-card">
      <CardContent>
        <h2>Aaron Krings</h2>
        <p>
          Aaron Krings is a highly accomplished bassist with a passion for jazz and music therapy. Born and raised in St. Louis, Aaron began playing electric bass at the age of 11 and double bass at 16. He went on to receive his degree in music therapy, with a minor in jazz studies, from Western Illinois University in 2016.
          Aaron's dedication to his craft led him to pursue a master's degree in jazz studies at WIU, which he completed in 2018. After graduation, Aaron joined the Glenn Miller Orchestra and embarked on a tour of the United States, performing in all 48 continental states. He also traveled to Japan and Canada to share his love of music with audiences around the world.
          Since returning to the Chicagoland area in 2020, Aaron has been actively performing with various musical groups and teaching music lessons. He has also been exploring the vibrant Chicago music scene, taking inspiration from the city's rich musical heritage.
          Currently, Aaron is the featured bassist in the musical Million Dollar Quartet at the Wick Theater in Boca Raton, Florida. With his technical skill and artistic sensibility, Aaron is sure to delight audiences with his exceptional musicianship and dynamic stage presence.
        </p>
      </CardContent>
    </Card>
  );
};

export default Bio;
