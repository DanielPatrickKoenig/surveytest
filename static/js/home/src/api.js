import axios from 'axios';
function getAPIBase(){
    return `/${document.querySelector('#app-name-indicator').getAttribute('app-name')}/`;
}
async function load(){
    const response = await axios.get(`${getAPIBase()}home/load_data`);
    return response.data;
}
async function save(content){
    await axios.post(`${getAPIBase()}home/save_data`, {content});
}
async function getQuestions(){
    const response = await axios.get(`${getAPIBase()}home/get_questions`);
    document.querySelector('#app-name-indicator').setAttribute('loaded', 'true');
    return response.data;
}
function questionsLoaded(){
    return document.querySelector('#app-name-indicator').getAttribute('loaded') === 'true';
}
async function updateProgress(progressData){
    const dataSplitter = '|||';
    const loadedData = await load();
    const dataList = loadedData.content.split(dataSplitter).filter(item => item !== 'empty');
    dataList.push(progressData);
    await save(dataList.join(dataSplitter));
}
export { getAPIBase, load, save, getQuestions, questionsLoaded, updateProgress };