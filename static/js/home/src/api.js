import axios from 'axios';
function getAPIBase(){
    return `/${document.querySelector('#app-name-indicator').getAttribute('app-name')}/`;
}
function getLocalStorageProgressKey(){
    return 'dnd-character-indicator-progress-key-6';
}
async function load(){
    const response = await axios.get(`${getAPIBase()}home/load_data`);
    if(response.data?.status === 'success'){
        return response.data;
    }
    else{
        const content = await window.localStorage.getItem(getLocalStorageProgressKey());
        return { content };
    }
}
async function save(content){
    const response = await axios.post(`${getAPIBase()}home/save_data`, {content});
    if(response.data?.status !== 'success'){
        window.localStorage.setItem(getLocalStorageProgressKey(), content);
    }
}
async function getQuestions(){
    const response = await axios.get(`${getAPIBase()}home/get_questions`);
    document.querySelector('#app-name-indicator').setAttribute('loaded', 'true');
    return response.data;
}
function questionsLoaded(){
    return document.querySelector('#app-name-indicator').getAttribute('loaded') === 'true';
}
async function updateProgress(progressData, questionIndexes, currentIndex){
    const sectionSplitter = '|||';
    const itemSplitter = ',';
    let loadedData = await load();
    
    if(!loadedData.content){
        loadedData = { content: '' };
    }
    const sections = loadedData.content.split(sectionSplitter).filter(item => item !== 'empty' && item !== '');
    const dataList = sections.length ? sections[0].split(itemSplitter) : [];
    const indexes = questionIndexes.join(itemSplitter);
    const progress = currentIndex;
    dataList.push(progressData);
    await save([ dataList.join(itemSplitter), indexes, progress ].join(sectionSplitter));
}
export { getAPIBase, load, save, getQuestions, questionsLoaded, updateProgress };