import axios from 'axios';
import { HttpData, ResultsData } from 'types/generalTypes';

const basicQuery = 'purple';

export async function fetchCards(queryName: string, orientation: string): Promise<ResultsData[]> {
  try {
    if (!queryName) {
      queryName = basicQuery;
    }
    const response = await axios.get<HttpData>(
      `https://api.unsplash.com/search/photos?query=${queryName}&per_page=30&orientation=${orientation}&client_id=4Oi2KyIqnx8TfVkYLWksaLxeQfM3EsDcsBjoumqJ9Pk`
    );
    const data: ResultsData[] = response.data.results;
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
