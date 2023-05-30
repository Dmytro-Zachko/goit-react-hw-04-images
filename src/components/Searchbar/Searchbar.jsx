import { useState } from "react";
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { SearchBar, SearchBarButton,SearchBarForm,SearchBarInput } from "./Searchbar.styled";
import { MdImageSearch } from 'react-icons/md';

export const Searchbar = ({onSubmit}) =>  {
const [inputValue,setInputValue] = useState('')

  Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

 const handleInputChange = event => {
   setInputValue(event.currentTarget.value.toLowerCase());
  };

const handleSubmit = event => {
    event.preventDefault();

    if (inputValue.trim() === '') {
      toast.error(`Введіть текст для пошуку зображення`);
      return;
    }

    onSubmit(inputValue);

  resetForm();
  };

  const resetForm = () => {
    setInputValue('');
  };
  
        return (
    <SearchBar className="searchbar">
  <SearchBarForm onSubmit={handleSubmit}>
    <SearchBarButton type="submit" >
        <MdImageSearch size="30px" fill="violet" />
    </SearchBarButton>

    <SearchBarInput
            onChange={handleInputChange}
            value={inputValue}
            name="inputValue"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
    />
  </SearchBarForm>
            </SearchBar>
        )
    }