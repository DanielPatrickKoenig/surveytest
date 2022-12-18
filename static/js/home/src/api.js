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
export { getAPIBase, load, save };