import React from 'react';
import styled from 'styled-components';

const SearchOuter = styled.div.attrs({
  className:
    'text-gray-600 text-left bg-white  border-solid border rounded-full flex space-between w-108 ml-auto mr-auto'
})``;

const SearchInput = styled.input.attrs({
  className: 'h-12 w-11/12 pl-5 rounded-full text-sm focus:outline-none'
})``;

const SearchBar = () => {
  return (
    <SearchOuter>
      <SearchInput placeholder="search" />
      <i className="fa fa-search mt-4" />
    </SearchOuter>
  );
};

export default SearchBar;
