import axios from 'axios';
const sectionSplitter = '...';
const itemSplitter = ',';
function getAPIBase(){
    return `/${document.querySelector('#app-name-indicator').getAttribute('app-name')}/`;
}
function getLocalStorageProgressKey(){
    return 'dnd-character-indicator-progress-key-13';
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
    console.log(content);
    const response = await axios.post(`${getAPIBase()}home/save_data`, {content});
    if(response.data?.status !== 'success'){
        window.localStorage.setItem(getLocalStorageProgressKey(), content);
    }
}
async function archive(content){
    const data_key = `${Math.random().toString().split('.').join('')}-${Math.random().toString().split('.').join('')}-${Math.random().toString().split('.').join('')}`
    const response = await axios.post(`${getAPIBase()}home/archive_data`, { content, data_key });
    if(response.data?.status !== 'success'){
        window.localStorage.setItem(getLocalStorageProgressKey(), null);
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
    let loadedData = await load();
    
    if(!loadedData.content){
        loadedData = { content: '' };
    }
    const sections = loadedData.content.split(sectionSplitter).filter(item => item !== 'empty' && item !== '');
    const dataList = sections.length ? sections[0].split(itemSplitter) : [];
    const indexes = questionIndexes.join(itemSplitter);
    const progress = currentIndex;
    dataList[currentIndex] = progressData;
    // dataList.push(progressData);
    await save([ dataList.join(itemSplitter), indexes, progress ].join(sectionSplitter));
    if(questionIndexes.length - 1 === currentIndex) await archive([ dataList.join(itemSplitter), indexes, progress ].join(sectionSplitter));

}
async function parseContent(){
    let progress = [];
    let order = [];
    let currentIndex = 0;
    const loadedData = await load();
    console.log(loadedData);
    const hasLoadedData = loadedData.content && loadedData.content.includes(sectionSplitter);
    if(hasLoadedData){
        progress = loadedData.content.split(sectionSplitter)[0].split(itemSplitter).map(item => { 
            const [value, code, index] = item.split('-');
            return {
                value,
                code,
                index
            }
        });
        order = loadedData.content.split(sectionSplitter)[1].split(itemSplitter);
        currentIndex = loadedData.content.split(sectionSplitter)[2];
    }
    return { progress, order, currentIndex };

}
async function transferLocalDataToFile(){
    const response = await axios.get(`${getAPIBase()}home/load_data`);
    if(response.data?.status === 'success'){
        const localContent = await window.localStorage.getItem(getLocalStorageProgressKey());
        if(localContent && localContent.length > response.data.content.length){
            await save(localContent);
            window.localStorage.setItem(getLocalStorageProgressKey(), '');
        }
    }
    
}
async function getResults(content){
    const response = await axios.get(`${getAPIBase()}home/process_results`, {params:{content, section_splitter: sectionSplitter, item_splitter: itemSplitter, value_splitter: '-'}});
    return response.data;
}
export { getAPIBase, load, save, archive, getQuestions, questionsLoaded, updateProgress, parseContent, transferLocalDataToFile, getResults };