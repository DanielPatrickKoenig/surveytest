
import { useState } from 'react';
import { updateProgress, getResults, load} from '../api';
import Question from './Question';
const Survey = ({ questions, index }) => {
    // const [fluidContent, setFluidContent] = useState(content);
    // const [saving, setSaving] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(Number(index));
    const [saving, setSaving] = useState(false);
    const onQuestionAnswered = async (value, code, index) => {
        setSaving(true);
        await updateProgress(`${value}-${code}-${index}`, questions.map(item => item.index), currentQuestion);
        setCurrentQuestion(currentQuestion + 1);
        setSaving(false);
    }
    const getSurveyResults = async () => {
        const loadedData = await load();
        await getResults(loadedData.content);
    }
    return <div>
        {
            saving
                ? ''
                : <Question onAnswered={onQuestionAnswered} text={questions[currentQuestion].text}  code={questions[currentQuestion].exclusion_group} index={questions[currentQuestion].index} />
        }
        
        <button onClick={getSurveyResults}>Get Results</button>
    </div>

}
export default Survey;