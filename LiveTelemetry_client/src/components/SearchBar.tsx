import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import SearchPage from '../pages/SearchPage';
import { JSX } from 'react/jsx-runtime';



const SearchBar = ({setPage}: {setPage:any}) => {
  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef<HTMLInputElement | any>();

  const handleSearch = () => {
    console.log('Searching for:', searchText);
    setPage(<SearchPage/>);
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
        if (document.activeElement === searchInputRef.current) {
          searchInputRef.current.blur();
        } else {
          searchInputRef.current.focus();
        }
      };
    };

    document.addEventListener('keydown', handleKeyPressCmdK);

    return () => {
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
        inputRef={searchInputRef}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          ),
        }}
        sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          '& input': {
            color: 'white', // Colore del testo
            //background: 'rgba(0, 0, 0, 0.8)', // Colore di sfondo
          },
          '& label': {
            color: 'white', // Colore dell'etichetta
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white', // Colore del bordo
          },
          '& .MuiIconButton-root': {
            color: 'white', // Colore dell'icona della ricerca
          },
        }}
      />
    </div>
  );
};

export default SearchBar;
function setPage(arg0: JSX.Element) {
  throw new Error('Function not implemented.');
}

