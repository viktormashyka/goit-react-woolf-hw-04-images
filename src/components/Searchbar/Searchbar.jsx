import { useState } from 'react';
import css from './SearchBar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleChange = evt => {
    setSearch(evt.currentTarget.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(search);
    setSearch('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          value={search}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  );
};
