import axios from 'axios';

const { REACT_APP_LOCAL_API_BASE_URI } = process.env;

export const getSources = (source) => axios.get(`${REACT_APP_LOCAL_API_BASE_URI}/observations/${source}`);
