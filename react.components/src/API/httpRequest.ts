import axios from 'axios';
import { HttpData, ResultsData } from 'types/generalTypes';

export async function fetchCards(queryName: string): Promise<ResultsData[]> {
  try {
    if (!queryName) {
      queryName = 'purple';
    }
    const response = await axios.get<HttpData>(
      `https://api.unsplash.com/search/photos?query=${queryName}&per_page=30&orientation=landscape&client_id=4Oi2KyIqnx8TfVkYLWksaLxeQfM3EsDcsBjoumqJ9Pk`
    );
    const data: ResultsData[] = response.data.results;
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
