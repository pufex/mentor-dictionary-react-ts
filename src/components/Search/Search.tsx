import React, {useState} from 'react'
import { IoSearch } from "react-icons/io5";
import "./Search.css"
import { useNavigate } from 'react-router-dom';

type SearchProps = {
  placeholder?: string,
  defaultValue?: string,
}

const Search = ({placeholder, defaultValue}:SearchProps) => {

  let navigate = useNavigate();

  const [search, setSearch] = useState(defaultValue 
    ? defaultValue
    : ""
  );

  const searchSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    navigate(`/searchlist?key=${search}`);
  }

  return <form
    className="search-container"
    onSubmit={(e) => {
      e.preventDefault();
      searchSubmitHandler(e)
    }}
  >
    <input 
        placeholder={placeholder}
        type="text"
        value={search}
        onChange={(e)=> {
          setSearch(e.target.value)
        }}
        className="search-input" 
    />
    <button
        type='submit'
        className="btn btn--search"
        disabled={
          search.length > 0 
            ? false
            : true
        }
    >
        <IoSearch 
          size={25}
        />
    </button>
  </form>
}

export default Search
