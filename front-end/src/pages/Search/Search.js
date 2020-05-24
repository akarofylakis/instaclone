import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../components/UI/Avatar/Avatar';
import Button from '../../components/UI/Button/Button';

import './Search.scss';

const data = [
  {
    avatar:
      'https://images.unsplash.com/photo-1502940113860-9d7391613fa7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    username: 'loddi21__',
    follows: 944,
    following: 234,
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1502940113860-9d7391613fa7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    username: 'loddi21__',
    follows: 944,
    following: 234,
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1502940113860-9d7391613fa7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    username: 'loddi21__',
    follows: 944,
    following: 234,
  },
];

const Search = () => {
  useEffect(() => {
    fetch('http://localhost:3000/api/v1/users')
      .then((res) => res.json())
      .then((res) => console.log(res));
  });

  return (
    <div className='search'>
      <ul className='search-list'>
        {data.map((item) => (
          <li className='search-item'>
            <Avatar size={60} source={item.avatar} />
            <div className='search-item__user-info'>
              <h3 className='name'> Joshua Roberts </h3>
              <h3 className='username'> {item.username} </h3>
            </div>
            <div className='search-item__user-follows'>
              <h3> Followers: {item.follows} </h3>
              <h3> Following: {item.following} </h3>
              <h3> Posts: {item.following} </h3>
            </div>
            <div className='  search-item__user-cta'>
              <Link to='/user'>
                <Button text='Show Profile' secondary />
              </Link>
              <Button text='Follow' primary>
                <img
                  alt='follow-user'
                  src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACwElEQVRoge2YTUtVURSG351mg7ImRZkG5qw0gqAmNWhQVHZT+gGNCsom/YD+QJMiMfowmgQSDa1wkBX9gUYKEfQBGY4CE52E5/o0uOfqdeP52vscj8R94Aw2Z++13nXv2uusvaUmTZo0+a8AjgDDwDSwGD7TwH2gr2x9kQDbgIdAlWgC4AHQVrbeNYTiP8QIt3m/qYIAHmUQX2ekbN2SVnI+Lm2iCIBeX/9bcojhmqOdFklXfZ3nEcAZj7VnfZ0bXwPAgqQdjssXjDE7ffzn8Q9Q0lpJ+QQw47H2p6/zPAKY9Fj7Ngf/fgB9YUl0KaOHy9YvSaLWHmRluGzdKwBtwLsM4ieBrWXrXkMYxAjx6RRQ61Q3l/hGgF7gHjAFLITPFHCXzZLzTXLEu5XwAeiSNCipIqlb0oHw1YykH5LeSHpljPlVisAogD3hZl5KUbGqwHOgo2zdkiSgAsxnKLl15oH+ssXfTCizSQTAUKPNPNrpFkmHJB2XdExST/jqkjFmuWFeRdK4/PuvqqQBY8yEswWgHbgCvAB+r/NLXbfm78ctbaL4A+xzEX4UeErt4xTFIrDdWjeapGgdX0k8ziK8Gxgj3eH9pbW2ixTVxiGAJaCzNYX4i5LGJO1KGe9Ha3xZUqIfB1olDcZuKOCWpNdKL16SPlnjCxmFZSG6rAInU6aMTYdl50ualEkiwtfnuH/gttxK3pw1LvIL2hkn8JSj0eXkKblBXADtjkbt/TLraCcNs3ncStj0WONv601K2hMp98zXIgI4YY3dP/nJTBQRQMUaj0sKCvATSBovIoDTwMr+CQ8jzwrwM2qMKXJ/rQJ0UGvA8mIO2Lsh4huCOIffWaBOlVprvvEAQ55BBMCNUsQ3BNGPWzrNAedLFV8H2A3cAf6mEL4EPCHiAFP2tUqnpAHVSu9Brb1W+a7Va5XIavMPuUIyg2epZ5MAAAAASUVORK5CYII='
                />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
