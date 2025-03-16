import { useState } from 'react';
import Header from './components/Header';
import Survey from './Pages/Survey';
import SurveyComplete from './Pages/SurveyComplete';
import Container from '@mui/material/Container';

function App() {
  const [surveySubmitted, setSurveySubmitted] = useState(false);

  const handleSurveySubmit = () => {
    setSurveySubmitted(true);
  };

  return (
    <div>
      <Header />
      <Container>
        {surveySubmitted ? (
          <SurveyComplete />
        ) : (
          <Survey handleSurveySubmit={handleSurveySubmit} />
        )}
      </Container>
    </div>
  );
}

export default App;
