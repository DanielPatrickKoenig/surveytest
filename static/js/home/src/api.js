import axios from 'axios';
const apiBase = '/reactpytemplate/';
async function load(){
    const response = await axios.get(`${apiBase}home/load_data`);
    return response.data;
}
async function save(content){
    const response = await axios.post(`${apiBase}home/save_data`, {content});
    return response.data;
}
export { apiBase, load, save };