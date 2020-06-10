import { createSelector } from "reselect";

const selectPost = (state) => state.post;

export const selectPosts = createSelector([selectPost], (posts) =>
  posts ? posts.posts : []
);

export const selectCurrentPost = createSelector([selectPost], (posts) =>
  posts ? posts.post : null
);

export const selectUserPosts = createSelector([selectPost], (posts) =>
  posts ? posts.userPosts : []
);

export const selectPostsIsFetching = createSelector(
  [selectPost],
  (post) => post.isFetching
);

export const selectNewPostEvent = createSelector(
  [selectPost],
  (post) => post.newPostEvent
);
