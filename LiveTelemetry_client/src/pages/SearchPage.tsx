import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const SearchPage = () => {
  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef<HTMLInputElement | any>();

  const handleSearch = () => {
    console.log('Searching for:', searchText);
  };

  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchText(event.target.value);
  };

  const handleKeyPress = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    const handleKeyPressCmdK = (event: { metaKey: any; ctrlKey: any; key: string; }) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        // When Cmd (or Ctrl on Windows) and K are pressed together
        if (document.activeElement === searchInputRef.current) {
          // If the search input is already in focus, blur it
          searchInputRef.current.blur();
        } else {
          // If the search input is not in focus, focus it
          searchInputRef.current.focus();
        }
      }
    };

    // Add an event listener for Cmd+K (or Ctrl+K)
    document.addEventListener('keydown', handleKeyPressCmdK);

    return () => {
      // Remove the event listener when the component unmounts
      document.removeEventListener('keydown', handleKeyPressCmdK);
    };
  }, []);

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchText}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        inputRef={searchInputRef} // Collega il riferimento alla casella di testo
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </div>
  );
};

export default SearchPage;
