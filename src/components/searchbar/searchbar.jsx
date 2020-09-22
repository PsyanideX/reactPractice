import React, { useState, useEffect } from 'react';
import { apiUrl, getRequest } from '../../shared/constants/constants';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './searchbar.css';

const Searchbar = props => {
  const history = useHistory();
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    fetch(`${apiUrl}/departments`, getRequest)
      .then(response => response.json())
      .then(response => setDepartments(response));
  }, []);

  const searchChange = event => {
    setSearch(event.target.value);
  };

  const departmentRedirect = direction => {
    history.push(direction);
  };

  return (
    <div className="form-group row search">
      <div className="dropdown col-1 search__buttoncontainer">
        <button className="btn btn-dark search__button" id="dropdownMenuButton" data-toggle="dropdown">
          <i className="fas fa-bars"></i>
        </button>
        <div className="dropdown-menu department__dropdown">
          {departments.map(department => (
            <button className="dropdown-item department" key={department.name} onClick={() => departmentRedirect(`/products/${department.name}`)}>
              {department.name}
            </button>
          ))}
        </div>
      </div>
      <div className="search__inputcontainer col-xl-10 col-bg-10 col-md-10 col-sm-9 col-9">
        <input
          type="text"
          name="search"
          placeholder="What product are you interested in?"
          onChange={searchChange}
          className="form-control search__input"
        />
      </div>
      <div className="col-1 search__buttoncontainer">
        <Link to={`/products/?search=${search}`}>
          <button tyle="submit" className="btn btn-dark search__button" onClick={() => props.onSearch(search)}>
            <i className="fas fa-search"></i>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default React.memo(Searchbar);
