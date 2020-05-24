import { createSelector } from 'reselect';

const selectPost = (state) => state.post;

export const selectPosts = createSelector([selectPost], (posts) =>
  posts ? posts.posts : null
);

export const selectPostsIsFetching = createSelector(
  [selectPost],
  (post) => post.isFetching
);
