import React, { useState } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import pixabay from '../api/pixabay';

import ImageResults from './ImageResults';

const Search = () => {
  const [searchInfo, setSearchInfo] = useState({
    searchText: '',
    amount: 15,
    apiKey: '',
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'searchText') {
      setSearchInfo((prevSearchInfo) => {
        return {
          ...prevSearchInfo,
          searchText: value,
        };
      });

      pixabay
        .get(
          `?key=${searchInfo.apiKey}&q=${searchInfo.searchText}&image_type=photo&per_page=${searchInfo.amount}&safesearch=true`
        )
        .then((res) => {
          setSearchInfo((prevSearchInfo) => {
            return {
              ...prevSearchInfo,
              images: res.data.hits,
            };
          });
        })
        .catch((err) => console.log(err));
    } else {
      setSearchInfo((prevSearchInfo) => {
        return {
          ...prevSearchInfo,
          amount: value,
        };
      });
    }
  };

  return (
    <div style={{ padding: '0 1rem' }}>
      <TextField
        name="searchText"
        value={searchInfo.searchText}
        onChange={handleChange}
        label="Search For Images..."
        fullWidth
        margin="normal"
      />

      <br />

      <FormControl>
        <InputLabel>Amount</InputLabel>
        <Select
          name="amount"
          label="amount"
          value={searchInfo.amount}
          onChange={handleChange}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>

      <br />

      {searchInfo.images.length > 0 ? (
        <ImageResults images={searchInfo.images} />
      ) : null}
    </div>
  );
};

export default Search;
