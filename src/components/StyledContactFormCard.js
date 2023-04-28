import { Card, CardContent, styled } from '@mui/material';
import ContactCreateForm from '../ui-components/ContactCreateForm';
import './customContactFormStyles.css';
import { API } from 'aws-amplify'
import { createContact } from '../graphql/mutations'; 


const StyledCard = styled(Card)(({ theme }) => ({
  width: '80%',
  maxWidth: '800px',
  padding: '2rem',
  marginBottom: '2rem',
  backgroundColor: '#fff',
  height: 'fit-content'
}));

const handleSubmit = async (event) => {
    console.log("my handlesubmit is being hit")
const Name = event.Name
const Email = event.Email
const Phone = event.Phone
const LessonType = event.LessonType
const Message = event.Message
    // Prepare the data to send in the POST request

    try {
      // Send the POST request to the Lambda function using Amplify's API module
      await API.graphql({
        query: createContact,
        variables: {
          input: {
            Name,
            Email,
            Phone,
            LessonType,
            Message
          },
        },
      })
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  
const StyledContactFormCard = () => {
  return (
    <StyledCard>
      <CardContent>
        <h1>Contact me for lessons or questions</h1>
        <div className="myFormContainer"> {/* Apply the custom styles */}
          <ContactCreateForm onSubmit={handleSubmit} />
        </div>
      </CardContent>
    </StyledCard>
  );
};

export default StyledContactFormCard;
