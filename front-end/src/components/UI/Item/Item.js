import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../Avatar/Avatar';

import './Item.scss';

const Item = ({ source, user, likes, comments }) => {
  return (
    <li className='item'>
      <div className='item__image-container'>
        <img
          className='item__image__like-icon '
          alt='like'
          src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACl0lEQVRoge2Zu2sUQQCHv4laqKggGIPGV2UwaCEh0UIUxNIXVtpaCQoW2mjjv2CroqCNpQStRLBQFB/4QBAbRYigCWhiExXNZ3GnXPZm73K7d7sp7msOZnZnvt/O3uzOLHTp0qVLmYS5HqiuBA4BB4ABoL96/jjwBrgH3AwhfG7STh9wFNgLDAK9gMAY8BYYBW6FEL61Giatw8XqeXXK5vxUL6mrIu30qperxzRjUj2nLs4r368+n0OHSSbU3TXt7KmWtcpTdW0jx9RbSO0HHgMNG2jAL+A40ANcARZlbGcM2BFC+BSrjAaoDt0DYHvGTv/xu/q7MGc7z4BdIYQfyYqelBPOkF8eKuJ55QGGgNOxiroRsDLbfACWt6HjdjIFbErOTrEROMz8kwdYARxMFsYC7O+8S2YOJAtiAQYLEMnKlmRBLEBfASJZqZvSYwHaMWt0ijrfWICJAkSyUucWC/CyAJGsvEgWxALc77xHZu4nC2IPsg3Ae9Kf0mXxB9gYQhirLayTDCF8BO4UZdUCo0l5SH+ZGwYeMX9GYQYYCSE8S1ZEBUMIT4DrnbZqgasxeWi8HlgNvKPyDlIm34HNaUvV1FskhPAFONEpqxY42Wyd3RD1WoalYLu43Myv6a6EuoTK0nJr5quQjVfAzhDCdO6W1LXqxwKv/Ji6Lv81mB1iUP1agPykuq2t8jUhdjq3/aE88iMdkS8gROfla0IMm22jKo1xdagQ+ZoQA7bnj/1JLXqG+x9ijfo6h/xbdX0p8jUhVqoPM8g/MbIJXArqUvV2C/J31WVle89CXWBl+7wZN9SsG72dRQ3qhQbyF9X5ssZIRz2l/qkRn1HPlu3VEuoRddrKF5ljZftkQt2n7ivbo0uXLvOYv+3BNNOGtd/WAAAAAElFTkSuQmCC'
        />
        <h3>Liked!</h3>
        <div
          className='item__image mc-item_image'
          style={{ backgroundImage: `url(${source})` }}
        ></div>

        <div className='item__image-caption'>
          <Link to='/post'>
            <h4>Open Post</h4>
            <img
              alt='arrow'
              className='hvr-wobble-horizontal'
              src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAA50lEQVRYhe2WzwpBURCHfyPZWHgEWVJ2LHgdZetVSF6AFdnbKylZ6q49g5LlZ3FTJ7lX3Hud0vlWp3Oamd/MnH9SIBD4B4AZsAJqvgRsiDkD3U9sSzlrqUvaAqOc/abjVMBlDlR9CgCIgFaabdlxUpbU1ndtSdp8TUl7YGBm61QPwDAhi7wYA5XnuG62RfdrJGkHNJIE/IKOpAPQ9iXgAb4EHCV1zez0SsC14OATSX0zO7uT9hhkPIZTSb2EtYuk98cwC1kuoiL3wEJxv6MCY8Q8VeCGx8fo4+c4LwEzYImvD0kgEMjCHVRnJIehqKFqAAAAAElFTkSuQmCC'
            />
          </Link>
        </div>
      </div>
      <div className='item__bar'>
        <div className='item__bar__user-info'>
          <Avatar size={15} source={user.img} />
          <Link to='/user'>
            <h3>{user.username}</h3>
          </Link>
        </div>

        <div className='item__bar__cta'>
          <div className='item__bar__cta__like-container'>
            <img
              alt='like'
              src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABmJLR0QA/wD/AP+gvaeTAAABoElEQVRIie2VvS8EURTFf2uTld0VhaCQIBQaYhFRrY5EIxv/BgUqrUpHI9EplEJoROKj8RcoVJtYCQnxtUR8NVjFnJd5u5mdHYxC4iQ3M3PvuefMvMy7D/7xTUQr1OuBBPASgBcHXr9i3gwsAVdAQXEOzAJJi5dU7sLiXQKLQFMlkzSQtxrvSp6zQIcia+Xz4prna2CgnEkjcCPiFtBp1YaBY9XOFAXlhixel3rN19V5Gc2JsANUedRrgAPrrfeVK0UVsCvOrJfRkYppr6JQC+xJKOHDG5TWoVfxSUU/gaBISuvRJOwlMvfxEIyMRsTLKKdrdwhGqRLNIqMNXSdCMBov0SxCA84E+ADGfmAyKo1nnInhiWncjZoqR/JBD3AvjUk/YgRYE/EW6P+CST/uFFnF+hHKIQZsquEJyAQwGQEe1LMNVAd9uxiwosY3YMqHOyVOQT2xoCY2ZoB3iSxQvBwRYF61d3F/hAzODi8AyzhnWFT3ZvcHWd5A6MM9d9YV5pzqDcvEoBU4wZ3eOaAlbBODduBU0fZbJgZxwhm8fxyfIB1wvohVA9cAAAAASUVORK5CYII='
            />
            <h5>{likes}</h5>
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

export default Item;
