import { save } from '../api';
import { useState } from 'react';
const ExampleComponent = ({content}) => {
    const [fluidContent, setFluidContent] = useState(content);
    const [saving, setSaving] = useState(false);
    const saveData = async () => {
        setSaving(true);
        await save(fluidContent);
        setSaving(false);
    }
    const onContentUpdate = (e) => {
        setFluidContent(e.target.value);
    }
    return <div>
        {saving ? <p>Saving...</p> : ''}
        <p>{fluidContent}</p>
        <label>Content <input type="text" value={fluidContent} onChange={onContentUpdate} /></label>
        <button onClick={saveData}>Save</button>
    </div>
}
export default ExampleComponent;