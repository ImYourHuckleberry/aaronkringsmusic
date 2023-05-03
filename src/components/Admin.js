import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Auth } from 'aws-amplify';
import { useEffect } from 'react';
import EventCreateForm from '../ui-components/EventCreateForm'
const Admin = () => {
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const isAdmin = user.signInUserSession.accessToken.payload['cognito:groups']?.includes('admin');
        if (!isAdmin) {
          window.location.href = '/'; // Redirect to home page for non-admin users
        }
      } catch (error) {
        console.log('Error:', error);
        // Handle error scenario
      }
    };
    checkAdminStatus();
  }, []);

  return <EventCreateForm />;
};

export default withAuthenticator(Admin);
