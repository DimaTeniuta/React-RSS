export type ResultsData = {
  id?: string;
  created_at?: string;
  width?: number;
  height?: number;
  color?: string;
  likes?: number;
  description?: string;
  user?: {
    id?: string;
    username?: string;
    name?: string;
    first_name?: string;
    last_name?: string;
    portfolio_url?: string;
    profile_image?: {
      small?: string;
      medium?: string;
      large?: string;
    };
    links?: {
      self?: string;
      html?: string;
      photos?: string;
      likes?: string;
    };
  };
  urls?: {
    raw?: string;
    full?: string;
    regular?: string;
    small?: string;
    thumb?: string;
  };
  links?: {
    self?: string;
    html?: string;
    download?: string;
  };
};

export interface HttpData {
  total: number;
  total_pages: number;
  results: ResultsData[];
}
