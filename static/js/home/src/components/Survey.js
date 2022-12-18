
import { useState } from 'react';
import { updateProgress} from '../api';
import Question from './Question';
const Survey = ({ questions }) => {
    // const [fluidContent, setFluidContent] = useState(content);
    // const [saving, setSaving] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [saving, setSaving] = useState(false); 
    const onQuestionAnswered = async (value, code, index) => {
        setSaving(true);
        await updateProgress(`${value}/${code}/${index}`);
        setCurrentQuestion(currentQuestion + 1);
        setSaving(false);
    }
    return <div>
        {
            saving
                ? ''
                : <Question onAnswered={onQuestionAnswered} text={questions[currentQuestion].text}  code={questions[currentQuestion].exclusion_group} index={questions[currentQuestion].index} />
        }
        
        
    </div>

}
export default Survey;