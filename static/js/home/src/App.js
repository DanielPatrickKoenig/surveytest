import './App.css';
import { getQuestions, questionsLoaded, parseContent } from './api';
import { useState } from 'react';
import { shuffle } from 'lodash';
import Survey from './components/Survey';
function App() {
  const [questions, setQuestions] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const loadData = async () => {
    const qDada = await getQuestions();
    const loadedData = await parseContent();
    console.log(loadedData);
    // const hasL oadedData = loadedData.includes(sectionSplitter);
    const randomizedQuestions = loadedData.order.length
      ? loadedData.order.map(item => ({...qDada.questions[item], index: item}))
      : shuffle(qDada.questions.map((item, index) => ({ ...item, index })));
    const currentQuestion = loadedData.order.length
      ? loadedData.progress.length
      : 0;
    setQuestions(randomizedQuestions);
    setQuestionIndex(currentQuestion);
  }
  if(!questionsLoaded()){
    loadData();
  }
  
  return (
    <div className="App">
      {
        questions 
          ? <Survey questions={questions} index={questionIndex} /> 
          : <div>Loading...</div>
      }
    </div>
  );
}

export default App;
