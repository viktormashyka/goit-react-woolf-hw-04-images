import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchImageByName } from 'API/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import css from './App.module.css';

const perPage = 12;

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { hits, totalHits } = await fetchImageByName(
          query,
          page,
          perPage
        );

        if (hits.length === 0) {
          toast.info(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }

        if (page === 1) {
          setPages(Math.ceil(totalHits / perPage));
        }

        setImages(prevState => [...prevState, ...hits]);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [query, page]);

  const onSubmit = search => {
    setQuery(search);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={onSubmit} />
      {error && <p>Whoops, something went wrong: {error.message}</p>}
      {isLoading && <Loader />}
      {images.length > 0 && <ImageGallery images={images} />}
      {!isLoading && !error && images.length > 0 && page < pages && (
        <Button onClick={handleLoadMore} />
      )}
      <ToastContainer />
    </div>
  );
};
