import './App.css';
import { getQuestions, questionsLoaded } from './api';
import { useState } from 'react';
import { shuffle } from 'lodash';
import Survey from './components/Survey';
function App() {
  const [questions, setQuestions] = useState(null);
  const loadData = async () => {
    const qDada = await getQuestions();
    const randomizedQuestions = shuffle(qDada.questions.map((item, index) => ({ ...item, index })));
    setQuestions(randomizedQuestions);
  }
  if(!questionsLoaded()){
    loadData();
  }
  
  return (
    <div className="App">
      {
        questions 
          ? <Survey questions={questions} /> 
          : <div>Loading...</div>
      }
    </div>
  );
}

export default App;
