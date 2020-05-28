import { createSelector } from 'reselect';

const selectPost = (state) => state.post;

export const selectPosts = createSelector([selectPost], (posts) =>
  posts ? posts.posts : null
);

export const selectCurrentPost = createSelector([selectPost], (posts) =>
  posts ? posts.post : null
);

export const selectUserPosts = createSelector([selectPost], (posts) =>
  posts ? posts.userPosts : null
);

export const selectPostsIsFetching = createSelector(
  [selectPost],
  (post) => post.isFetching
);
