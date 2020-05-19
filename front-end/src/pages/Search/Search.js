import React from 'react';

import Item from '../../components/UI/Item/Item';
import Avatar from '../../components/UI/Avatar/Avatar';

import './User.scss';

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

const User = () => {
  return (
    <div className='user'>
      <div className='user__profile-container'>
        <Avatar
          size={100}
          source='https://images.unsplash.com/photo-1518157542428-1be9739022f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
        />

        <h3>Amanda Jones</h3>
        <h6>@amanjonae_</h6>
      </div>
      <div className='user__user-info-container'>
        <div className='user__user-info-posts'>
          <h5>122</h5>
          <h6>Posts</h6>
        </div>
        <div className='user__user-info-followers'>
          <h5>1.8k</h5>
          <h6>Followers</h6>
        </div>
        <div className='user__user-info-following'>
          <h5>203</h5>
          <h6>Following</h6>
        </div>
      </div>
      <div className='user__user-summary'>
        <h5>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac
          luctus nulla. Nulla non dui in sapien tristique sollicitudin.
        </h5>
      </div>
      <div className='list-container'>
        <ul className='feed-list'>
          {tileData.map((tile) => (
            <Item
              key={tile.img}
              source={tile.img}
              likes={122}
              comments={3}
              user={{
                img:
                  'https://images.unsplash.com/photo-1518157542428-1be9739022f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
                username: 'josdfsae2',
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default User;
