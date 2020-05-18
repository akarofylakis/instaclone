import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from './Avatar';

import './Item.scss';

const Item = (props) => {
  return (
    <li className='item'>
      <div
        className='item__image'
        style={{ backgroundImage: `url(${props.img})` }}
      ></div>
      <div className='item__bar'>
        <div className='item__bar__user-info'>
          <Avatar
            size={15}
            source='https://images.unsplash.com/photo-1518157542428-1be9739022f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
          />
          <Link to='/profile'>
            <h3>amanjoees2</h3>
          </Link>
        </div>
        <div className='item__bar__cta'>
          <div className='item__bar__cta__like-container'>
            <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABmJLR0QA/wD/AP+gvaeTAAABoElEQVRIie2VvS8EURTFf2uTld0VhaCQIBQaYhFRrY5EIxv/BgUqrUpHI9EplEJoROKj8RcoVJtYCQnxtUR8NVjFnJd5u5mdHYxC4iQ3M3PvuefMvMy7D/7xTUQr1OuBBPASgBcHXr9i3gwsAVdAQXEOzAJJi5dU7sLiXQKLQFMlkzSQtxrvSp6zQIcia+Xz4prna2CgnEkjcCPiFtBp1YaBY9XOFAXlhixel3rN19V5Gc2JsANUedRrgAPrrfeVK0UVsCvOrJfRkYppr6JQC+xJKOHDG5TWoVfxSUU/gaBISuvRJOwlMvfxEIyMRsTLKKdrdwhGqRLNIqMNXSdCMBov0SxCA84E+ADGfmAyKo1nnInhiWncjZoqR/JBD3AvjUk/YgRYE/EW6P+CST/uFFnF+hHKIQZsquEJyAQwGQEe1LMNVAd9uxiwosY3YMqHOyVOQT2xoCY2ZoB3iSxQvBwRYF61d3F/hAzODi8AyzhnWFT3ZvcHWd5A6MM9d9YV5pzqDcvEoBU4wZ3eOaAlbBODduBU0fZbJgZxwhm8fxyfIB1wvohVA9cAAAAASUVORK5CYII=' />
            <h5>166</h5>
          </div>
          <div className='item__bar__cta__comment-container'>
            <img src='data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTEuMDcyIDUxMS4wNzIiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTEuMDcyIDUxMS4wNzIiIHdpZHRoPSI1MTJweCI+PGcgaWQ9IlNwZWVjaF9CdWJibGVfNDhfIj48Zz48cGF0aCBkPSJtNzQuMzkgNDgwLjUzNmgtMzYuMjEzbDI1LjYwNy0yNS42MDdjMTMuODA3LTEzLjgwNyAyMi40MjktMzEuNzY1IDI0Ljc0Ny01MS4yNDYtMzYuMDI5LTIzLjY0NC02Mi4zNzUtNTQuNzUxLTc2LjQ3OC05MC40MjUtMTQuMDkzLTM1LjY0Ny0xNS44NjQtNzQuODg4LTUuMTIxLTExMy40ODIgMTIuODktNDYuMzA5IDQzLjEyMy04OC41MTggODUuMTI4LTExOC44NTMgNDUuNjQ2LTMyLjk2MyAxMDIuNDctNTAuMzg3IDE2NC4zMy01MC4zODcgNzcuOTI3IDAgMTQzLjYxMSAyMi4zODkgMTg5Ljk0OCA2NC43NDUgNDEuNzQ0IDM4LjE1OSA2NC43MzQgODkuNjMgNjQuNzM0IDE0NC45MzMgMCAyNi44NjgtNS40NzEgNTMuMDExLTE2LjI2IDc3LjcwMy0xMS4xNjUgMjUuNTUxLTI3LjUxNCA0OC4zMDItNDguNTkzIDY3LjYxOS00Ni4zOTkgNDIuNTIzLTExMi4wNDIgNjUtMTg5LjgzIDY1LTI4Ljg3NyAwLTU5LjAxLTMuODU1LTg1LjkxMy0xMC45MjktMjUuNDY1IDI2LjEyMy01OS45NzIgNDAuOTI5LTk2LjA4NiA0MC45Mjl6bTE4Mi00MjBjLTEyNC4wMzkgMC0yMDAuMTUgNzMuOTczLTIyMC41NTcgMTQ3LjI4NS0xOS4yODQgNjkuMjggOS4xNDMgMTM0Ljc0MyA3Ni4wNDMgMTc1LjExNWw3LjQ3NSA0LjUxMS0uMjMgOC43MjdjLS40NTYgMTcuMjc0LTQuNTc0IDMzLjkxMi0xMS45NDUgNDguOTUyIDE3Ljk0OS02LjA3MyAzNC4yMzYtMTcuMDgzIDQ2Ljk5LTMyLjE1MWw2LjM0Mi03LjQ5MyA5LjQwNSAyLjgxM2MyNi4zOTMgNy44OTQgNTcuMTA0IDEyLjI0MSA4Ni40NzcgMTIuMjQxIDE1NC4zNzIgMCAyMjQuNjgyLTkzLjQ3MyAyMjQuNjgyLTE4MC4zMjIgMC00Ni43NzYtMTkuNTI0LTkwLjM4NC01NC45NzYtMTIyLjc5LTQwLjcxMy0zNy4yMTYtOTkuMzk3LTU2Ljg4OC0xNjkuNzA2LTU2Ljg4OHoiIGZpbGw9IiMwMDAwMDAiLz48L2c+PC9nPjwvc3ZnPgo=' />{' '}
            <h5>7</h5>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Item;
