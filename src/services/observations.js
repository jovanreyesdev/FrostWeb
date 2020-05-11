import axios from 'axios';

const { REACT_APP_LOCAL_API_BASE_URI } = process.env;

export const getObservations = ({ sourceId, range }) => axios.get(`${REACT_APP_LOCAL_API_BASE_URI}/observations/get/${sourceId}`, {
  params: {
    range,
  },
});
