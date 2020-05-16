import axios from 'axios';

const { REACT_APP_LOCAL_API_BASE_URI } = process.env;

export const getSources = () => axios.get(`${REACT_APP_LOCAL_API_BASE_URI}/sources/get`);

export const getSource = (sourceId) => axios.get(`${REACT_APP_LOCAL_API_BASE_URI}/sources/get/${sourceId}`);
