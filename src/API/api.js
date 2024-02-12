import axios from 'axios';

import { API_KEY, BASE_URL } from './api-config';

axios.defaults.baseURL = BASE_URL;

export const fetchImageByName = async (query, page, perPage) => {
  const response = await axios.get(
    `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );
  return response.data;
};
