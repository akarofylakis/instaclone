import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  likePostAsync,
  unlikePostAsync,
} from '../../../redux/likes/like-actions';
import { selectCurrentUser } from '../../../redux/users/user-selectors';

import Avatar from '../Avatar/Avatar';

import './Item.scss';

const Item = ({
  source,
  userAvatar,
  userId,
  username,
  likes,
  comments,
  postId,
  likePost,
  unlikePost,
  currentUser,
  likedByCurrentUser,
}) => {
  const [likeStatus, toggleLike] = useState(likedByCurrentUser);
  const [currentLikes, mutateLikes] = useState(likes);

  useEffect(() => {
    toggleLike(likedByCurrentUser);
    mutateLikes(likes);
  }, [likedByCurrentUser, likes]);

  const likeToggler = () => {
    toggleLike((prevState) => {
      if (!prevState) {
        likePost(postId, currentUser.userId);
        mutateLikes((prevLikes) => prevLikes + 1);
      } else {
        unlikePost(postId, currentUser.userId);
        mutateLikes((prevLikes) => prevLikes - 1);
      }
      return !prevState;
    });
  };

  return (
    <li className='item'>
      <div className='item__image-container'>
        <div className='like-container' onClick={likeToggler}>
          <img
            className={`item__image__like-icon not-liked ${
              likeStatus && 'show-off'
            }`}
            alt='not-liked'
            src='data:image/png;base64,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'
          />
          <img
            className={`item__image__like-icon liked ${
              !likeStatus && 'show-off'
            }`}
            alt='like'
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAFhklEQVR4nO2cWaxdUxjHf58Wpaa0hhoSRAzVJiVIkIgQQ0UMMbyRRhAE4YGIRKTiTbzgicSLlEgTQoNWNIYImvJgVhQ1tYqq6uCS2/vzsA+R5vbuvc/Z++xz7l6/pOnLt9b5r/+Xte6a9oJEIpFIJBKJRCKRSCQSiURbiLp/QJ0LzAfmAccBRwBTgD2BEWA98C3wEfAGsDwittWkZTpwDnAmMBc4HDgImAZsA7YDa4BVwAfAsoj4uA4ttaLOUu9T11ieP9Wl6gJ1twq07K5eoy7r1F2Wb9SF6qwqvKkV9SD1MfWvLho6Hj+od6p7d6FlH/UudW1FWkbUR9UD6/CuJ9RQb1d/r6ixO/KDenkJPVeqP9akZaN6q1r78F0IdX/1pZoauyPPqzMm0DJTXdInLS+oM/vp9XgNPk79tk8N/pev1RPH0XKS2XjdT9aoxzbhPeqJ6s99bvC/bFHP+5+Ws9Q/GtKyXj2hWx+7GsfMsv42sNPhoA+MABeQtWEpsHuDWjYAp0XEl2ULlk6A2Ri8Aji6bNka2NT5f99GVWR8QZaE38oU2qVMsNlf/qcYDPMhM34QzAc4BnjSkrOjUgkAbgbOL1mmTcwHbihToHC21EOBz4HpJUW1jS3A0RHxU5HgMj3gfpL5RdgLuK9ocKEeoB4JfEm2iZbIZxQ4KiK+ywss2gNuJplfhqnATUUCc3uAuguwDhi8TajBZi1wWEQ4UVCRHnA6yfxuOAQ4JS+oSALO7l1La8n1rkgCTqpASFvJ9a5IAo6pQEhbyfWuSAIG/yhucDk4L6BIAkofByb+Y6+8gLJ7QYly5E7ziyRgcwVC2kqud0USsL4CIW3ll7yAIgn4qgIhbWV1XkCRBAzfzbDB4aO8gCIJWFGBkLbyTl5Akc24GcDPpN3QsowC+0fEpomCcntA55D5tapUtYhX8syH4uuART2KaSOFPCt6IjadbDqajiSLsRWYFRFb8gIL9YCI2Ao826uqFrG4iPlQ7lbE8WTTqrR9MTHbgbkRsapIcGEzI+JTUi8owuKi5kPJq4nqHOBDUi/YGWPAvDKfNZUyMiI+AZ4uq6pFLCr7TVk3l3NnAZ8B+5UtO8nZBMyOiHVlCpUeSjpX7u4tW64F3F3WfOj++4ApZHtEJ3dTfhLyLnBqRIyVLdj1h2adaem7ZN/7tpltwMkR8Vk3hbuezXSmpXd0W34ScXu35kMFX8qrzwGX9FrPkPJsRBT+fHY8qkjATLKh6Mhe6xoyvgJOiYiNvVTS84IqIjYAFwJ/9FrXELEZuLRX86GiFW1nDFxAthKc7IwBV1X1iEdlWwoR8RywsKr6Bph7ImJJVZVV/t6B+ghwS9X1DgiPRsSNVVZYRwKmAIuBy6quu2GWAJdFxPYqK63lxQ91D+Bl4Iw66m+A14ELImKk6opre3Klc4y5lOFPwjvA+RFRyxXNWt+8UfcFljO8e0bvA2dXMd3cGbUerHSuZcwH3qvzd2piJTWbD3042eos1M4CXq37tyrkTeDcus2HPh0tdm4IXET2h3nQWUY25k++lb26m/pM/95SKs0SdVrTPtWKOlV9smGjx+MJdWrT/vQFs1cWH2zY8P/zsNmLAO3C7F3PsQaNH1MXNu1Do6jXq6MNmD+qXtt0+wcC9WJ1Wx/NH1GvaLrdA4V6qvprH8zfqA779kg9qHPU72s0f609vPHZCtTD1VU1mL9aParp9g0F6gz1rQrNX6ke0HS7hgp1utU8Cr7cLp6/T/DfqvnxHsxfpO7adDuGGrNV8wNdmP+QbVzd1oV6m7q9gPFpdVsX6tXq3xOYP6pe17TOSY16rrp5HPO3qhc2ra8VqLPNZkhbO/9eVGc3rat1qFPM7iElEolEIpFIJBKJRCKRSCTy+QcRtuOUczEuKwAAAABJRU5ErkJggg=='
          />
        </div>

        <div
          className='item__image mc-item_image'
          style={{ backgroundImage: `url(${source})` }}
        ></div>
        <Link to={`/post/${postId}`}>
          <div className='item__image-caption'>
            <h4>Open Post</h4>
            <img
              alt='arrow'
              className='hvr-wobble-horizontal'
              src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAA50lEQVRYhe2WzwpBURCHfyPZWHgEWVJ2LHgdZetVSF6AFdnbKylZ6q49g5LlZ3FTJ7lX3Hud0vlWp3Oamd/MnH9SIBD4B4AZsAJqvgRsiDkD3U9sSzlrqUvaAqOc/abjVMBlDlR9CgCIgFaabdlxUpbU1ndtSdp8TUl7YGBm61QPwDAhi7wYA5XnuG62RfdrJGkHNJIE/IKOpAPQ9iXgAb4EHCV1zez0SsC14OATSX0zO7uT9hhkPIZTSb2EtYuk98cwC1kuoiL3wEJxv6MCY8Q8VeCGx8fo4+c4LwEzYImvD0kgEMjCHVRnJIehqKFqAAAAAElFTkSuQmCC'
            />
          </div>
        </Link>
      </div>
      <div className='item__bar'>
        <div className='item__bar__user-info'>
          <Avatar size={15} source={userAvatar} />
          <Link to={`/user/${userId}`}>
            <h3>{username}</h3>
          </Link>
        </div>

        <div className='item__bar__cta'>
          <div className='item__bar__cta__like-container'>
            <img
              onClick={likeToggler}
              className={`bar-like not-liked ${likeStatus && 'show-off'}`}
              alt='like'
              src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABmJLR0QA/wD/AP+gvaeTAAABoElEQVRIie2VvS8EURTFf2uTld0VhaCQIBQaYhFRrY5EIxv/BgUqrUpHI9EplEJoROKj8RcoVJtYCQnxtUR8NVjFnJd5u5mdHYxC4iQ3M3PvuefMvMy7D/7xTUQr1OuBBPASgBcHXr9i3gwsAVdAQXEOzAJJi5dU7sLiXQKLQFMlkzSQtxrvSp6zQIcia+Xz4prna2CgnEkjcCPiFtBp1YaBY9XOFAXlhixel3rN19V5Gc2JsANUedRrgAPrrfeVK0UVsCvOrJfRkYppr6JQC+xJKOHDG5TWoVfxSUU/gaBISuvRJOwlMvfxEIyMRsTLKKdrdwhGqRLNIqMNXSdCMBov0SxCA84E+ADGfmAyKo1nnInhiWncjZoqR/JBD3AvjUk/YgRYE/EW6P+CST/uFFnF+hHKIQZsquEJyAQwGQEe1LMNVAd9uxiwosY3YMqHOyVOQT2xoCY2ZoB3iSxQvBwRYF61d3F/hAzODi8AyzhnWFT3ZvcHWd5A6MM9d9YV5pzqDcvEoBU4wZ3eOaAlbBODduBU0fZbJgZxwhm8fxyfIB1wvohVA9cAAAAASUVORK5CYII='
            />

            <img
              onClick={likeToggler}
              className={`bar-like not-liked ${!likeStatus && 'show-off'}`}
              alt='like'
              src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABt0lEQVRIie2UsU8TYRiHn/c7cGLEIAUcTUxcWPgDjIksEnrXkEpSEmYGBgYi7sbdP0BSSxEDBTSEElZdTBzUkdHrFRDjZoTj7nWQ6sn1uGK76W/73vf7nufuy90L/5MSOV/IvLrfy7E1j5AFBoEj0F2j+sjNlfcABipTN5RwAeUO0Au4KOtizOOaXfySKMisTg0j4TbQ1+RhfBWdQcUIPAG6m+w5EOFuzS69jwmuvZi+aiz/YwK8EU1686iEK8Et797yEYBpVK0u/2EKvAG+CA7Qp771oLH4JVAlm3Kw5UiEZSL1TKcEQH8zwacOCtyYQFV3OiioxgSWpU/5/ZW0E1UTLsYEbrb8Flhpny/L9Wz5XUwAEIjMArU26Pt+YM1FC38IDuxnh4jJA8d/Af8Omvs8sbifKADw7OJrYAI4vQQ8ELTgOUtvzjdiAgDPKb0UkUngpAX4iaD5mrO02qx54W8/UCncVtVNoCdhyzcVnLpdqib0U+cKg+uTI2Fotvg5lqP5ipixsytNTKoAoL9SuCmqVeD6Walu1Iy6ueKHtLMtCQAyG/khCbrWANQ6dbzx550cLf9yfgCTGomyD1rmMgAAAABJRU5ErkJggg=='
            />
            <h5>{currentLikes}</h5>
          </div>
          <div className='item__bar__cta__comment-container'>
            <img
              alt='comment'
              src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABlElEQVRIidXUP2tUURAF8F/CKqKSJRCSD+AqaiNJEQS1MUUaO6sVC7WwtRfxIxjBwiZJKTZWVmHbGLBRlJhGSAorLfwThaBF1uLNJS/xbd7djRYeuAx35syZue/NvfzvGKqJN9HGLM5hPPwf8QZLeIpv/RZu4D6+oluzvuBe5GRhAislgSXcQAtHY53EzYgl3ovSCXuiideRsI4LGQ1dxEbkvAqNnlgM4juMZYgnjGEtcud7kaawjS2c6EM8oRW525isIjyMDh4MIJ4wFxpzVcHVCE4foMD50HhbFdyM4EjJlyYkd9+M/WZyDO8hHxS/wh6qKvAh7OmSb8ju2163Pxv2fVWBTth2dr9/4krYl1XBSTtj2hpAfBSfFJ96phdpIQhr+rto8DhyV+3ziDYV172ruP6XMsWvKU7fxeU68jiW7YxgB7dwCsdwHGdwNfiz+BncR5kNaeAuPtv9NO9d10viHRzOLZAwgtt4phi9H/heKpA+y3Mc6Vd8P5RP8cQAnecU2MKdvy2csKz40f8Mw/WUAr8BryZxzOuWYHcAAAAASUVORK5CYII='
            />
            <h5>{comments}</h5>
          </div>
        </div>
      </div>
    </li>
  );
};

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  likePost: (postId, userId) => dispatch(likePostAsync(postId, userId)),
  unlikePost: (postId, userId) => dispatch(unlikePostAsync(postId, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);
