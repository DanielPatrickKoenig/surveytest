import { useState } from 'react';
const Question = ({text, code, index, onAnswered}) => {
    const [answer, setAnswer] = useState(-1);
    const answerChanged = (e) => {
        setAnswer(e.target.value);
    }
    const onConfirm = () => {
        if(onAnswered){
            onAnswered(answer, code, index);
        }
        setAnswer(-1);
    }
    
    return <div>
        <p>{text}</p>
        <ul>
            {[...new Array(5).keys()].map(item => <li><label><span>{item + 1}</span><input type="radio" name="fivePointScale" value={item + 1} onChange={answerChanged} /></label></li>)}
        </ul>
        {answer !== -1 ? <button onClick={onConfirm}>Next</button> : ''}
    </div>
}
export default Question;