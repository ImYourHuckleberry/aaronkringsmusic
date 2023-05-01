import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Boy, ContactPage, MusicNote } from '@mui/icons-material';

const BottomNav = () => {
  const handleScrollToBio = () => {
    const bioSection = document.getElementById('bio');
    bioSection.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToMedia = () => {
    const mediaSection = document.getElementById('media');
    mediaSection.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({ behavior: 'smooth' });
  };

  const [value, setValue] = React.useState(0);

  return (
    <Box>
      <BottomNavigation
        className='signup'
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Aaron"
          icon={<Boy />}
          onClick={handleScrollToBio}
        />
        <BottomNavigationAction
          label="Listen"
          icon={<MusicNote />}
          onClick={handleScrollToMedia}
        />
        <BottomNavigationAction
          label="Contact"
          icon={<ContactPage />}
          onClick={handleScrollToContact}
        />
      </BottomNavigation>
    </Box>
  );
};

export default BottomNav;
