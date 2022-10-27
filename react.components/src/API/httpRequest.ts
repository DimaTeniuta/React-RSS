import axios from 'axios';
import { HttpData } from 'types/generalTypes';

const BASIC_QUERY = 'purple';
const URL = 'https://api.unsplash.com/search/photos?';
export const WRONG_HTTP_ANSWER = {
  total: 0,
  total_pages: 0,
  results: [],
};

export async function fetchCards(
  queryName: string,
  orientation: string,
  perPage: string,
  page = '1'
): Promise<HttpData> {
  try {
    if (!queryName) {
      queryName = BASIC_QUERY;
    }
    const response = await axios.get<HttpData>(
      `${URL}query=${queryName}&orientation=${orientation}&per_page=${perPage}&page=${page}&client_id=4Oi2KyIqnx8TfVkYLWksaLxeQfM3EsDcsBjoumqJ9Pk`
    );
    const data: HttpData = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return WRONG_HTTP_ANSWER;
  }
}
