
import { useState } from 'react';
import { updateProgress, getResults, load} from '../api';
import Question from './Question';
// import Results from './Results';
const Survey = ({ questions, index }) => {
    // const [fluidContent, setFluidContent] = useState(content);
    // const [saving, setSaving] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(Number(index));
    const [saving, setSaving] = useState(false);
    const [results, setResults] = useState(null);
    const onQuestionAnswered = async (value, code, index) => {
        setSaving(true);
        await updateProgress(`${value}-${code}-${index}`, questions.map(item => item.index), currentQuestion);
        setCurrentQuestion(currentQuestion + 1);
        setSaving(false);
    }
    const getSurveyResults = async () => {
        const loadedData = await load();
        const resultData = await getResults(loadedData.content);
        setResults(resultData);
    }
    return <div>
        {
            saving || currentQuestion >= questions.length
                ? ''
                : <Question onAnswered={onQuestionAnswered} text={questions[currentQuestion].text}  code={questions[currentQuestion].exclusion_group} index={questions[currentQuestion].index} />
        }
        <p>{currentQuestion}</p>
        {!results ? <button style={{display: currentQuestion >= questions.length ? 'block' : 'none'}} onClick={getSurveyResults}>Get Results</button> : <p>{results}</p>}
    </div>

}
export default Survey;