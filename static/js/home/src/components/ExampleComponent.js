import { save } from '../api';
import { useState } from 'react';
const ExampleComponent = ({content}) => {
    const [fluidContent, setFluidContent] = useState(content);
    const saveData = () => {
        save(fluidContent);
    }
    const onContentUpdate = (e) => {
        setFluidContent(e.target.value);
    }
    return <div>
        <p>{fluidContent}</p>
        <label>Content <input type="text" value={fluidContent} onChange={onContentUpdate} /></label>
        <button onClick={saveData}>Save</button>
    </div>
}
export default ExampleComponent;