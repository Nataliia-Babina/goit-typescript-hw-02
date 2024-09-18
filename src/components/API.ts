import axios from 'axios';

type Photo = {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
};

type FetchDataArgs = {
  query: string;
  page: number;
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>; 
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

export async function fetchData({ query, page, setPhotos, setLoading, setError }: FetchDataArgs): Promise<void> {
    try {
        setLoading(true);
        const response = await axios.get(`https://api.unsplash.com/search/photos/`, {
            params: {
                client_id: 'MhRd8tUVem2dBUwChNnr2_rTxeoS_aSZZt3DfhrhdN0',
                query: query,
                per_page: 12,
                page: page,
                orientation: 'landscape',
            },
        });
        setPhotos((prevPhotos) => [...prevPhotos, ...response.data.results]);
    } catch (error: unknown) {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError("An unknown error occurred");
    }
  } finally {
    setLoading(false);
  }
}