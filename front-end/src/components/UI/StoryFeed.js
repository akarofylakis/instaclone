import React from 'react';
import Avatar from './Avatar';

import './StoryFeed.scss';

const tileData = [
  {
    img:
      'https://images.unsplash.com/photo-1502940113860-9d7391613fa7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Image',
    author: 'author',
    cols: 1,
  },
  {
    img:
      'https://images.unsplash.com/photo-1514315384763-ba401779410f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=630&q=80',
    title: 'Image',
    author: 'author',
    cols: 2,
  },
  {
    img:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    title: 'Image',
    author: 'author',
    cols: 2,
  },
  {
    img:
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    title: 'Image',
    author: 'author',
    cols: 1,
  },
  {
    img:
      'https://images.unsplash.com/photo-1514315384763-ba401779410f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=630&q=80',
    title: 'Image',
    author: 'author',
    cols: 2,
  },
  {
    img:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    title: 'Image',
    author: 'author',
    cols: 2,
  },
];

const StoryFeed = () => {
  return (
    <div className='story-feed'>
      <h2>Stories</h2>
      <div className='list-container'>
        <ul className='feed-list'>
          {tileData.map((tile) => (
            <li>
              <Avatar source={tile.img} size={55} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StoryFeed;
