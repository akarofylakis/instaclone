export const DEFAULT_USER = {
  avatar_url: "",
  userId: "",
  email: "",
  posts_count: 0,
  followers_count: 0,
  following_count: 0,
  username: "",
  fullname: "",
  id: "",
  summary: "",
  token: "",
};

export const DEFAULT_POSTS = [
  {
    image_url: "",
    caption: "",
    createdAt: "",
    likes_count: 0,
    comments_count: 0,
    user: {
      username: "",
      id: "",
      user_info: {
        avatar_url: "defaulturl.com",
        summary: "",
      },
    },
  },
];

export const DEFAULT_POST = {
  image_url: "",
  caption: "",
  createdAt: "",
  likes_count: 0,
  comments_count: 0,
  user: {
    username: "",
    id: "",
    user_info: {
      avatar_url: "",
      summary: "",
    },
  },
};

export const DEFAULT_USER_PROFILE = {
  userId: "",
  email: "",
  posts_count: 0,
  followers_count: 0,
  following_count: 0,
  user_info: {
    avatar_url: "",
    summary: "",
    fullname: "",
  },
  username: "",
  id: "",
  token: "",
};
