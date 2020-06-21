import axios from 'axios';

//mude a sua porta do json server
//json-server -p 4001 services.json
const api = axios.create({baseURL:'http://localhost:4001'});

export default api