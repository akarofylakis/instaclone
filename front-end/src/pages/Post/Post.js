import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../components/UI/Avatar/Avatar';
import Button from '../../components/UI/Button/Button';

import './Post.scss';

const Post = () => {
  return (
    <div className='post-container'>
      <div className='cta-goback'>
        <Link to='/'>
          <Button secondary text='Go Back'></Button>
        </Link>
      </div>

      <div className='post__post-top-bar'>
        <div className='post__user-info'>
          <Avatar
            size={20}
            source='https://images.unsplash.com/photo-1518157542428-1be9739022f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
          />
          <h6>amanjonae_</h6>
        </div>
        <h6 className='date'>13 June 2020</h6>
      </div>

      <div
        className='post__image'
        style={{
          backgroundImage: `url(${'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'})`,
        }}
      ></div>

      <div className='post__post-details'>
        <div className='post__post-cta'>
          <img
            alt='like'
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAGpUlEQVR4nO2daYwURRTHf+PKrrLLCsIKifEIciiHJAajIYZAVBQVT4jBEJWQeCfqJ69g9gPxjlHjFY0S4AMiKofRiAfIEhENijFiPFfwICiuuoLuLtmd8cPrMbOboevVTHX39Ez9kgpkeue9/3vdXV1X14DH4/F4PB6Px+PxeDwej6dWyERsvwmYHpSJwFjgmODzDLAf6ADagZ3Ah8Am4PeI9LQAM4EzAz2jgeHAECAHHAB+Bb4N9LQBW4LPU0MGmA28DHQjgdmUXuB9YD4wyIGeQYGtzYFtWz1dwCrgfKK/YMtmHvA59kEeqvwM3AU0lqClEbgH+MWhns+Ay0vQEjnjgPdwF+jAshu4wkLPXODHCPW8DYyx0BMpC5C6PKpgC8taYFiIlqOBdTFp+Rup2hIjA9xPPMEWlh+A04romQrsSkDPEhJ4NmSAZ8oUXu7Vd3aBnnOJ7y4sVp4m5pOQxJU/sHQBM5BmZSmtrSjuBGtKOWsLgBWW3/kUqZvbgL3AT4joFuBYpF0+E7mSGyzsdgb/HmXxnR7gHaS/sQ1pJe1DcnEcMArpt1xC8aoujPnAS5bfsWIc+ls9C6wGxlvYbwHuAH5T+rAp+4A7Ax9axgOvBLFofHQCJ1nYt0bb1GxHrupSGQo8hj5w04XwRGCzVKYhD3+Nvw1l+AllnlLAZmCEI5+zkKGKUpPfAZznSEsLEpvG72WOfP5PBl0PdzNQ79j3ycAehe+BZU/wXZfUozsJO3DcKrpA4bQdd1f+QCYidbhNfT8xIi0tSKwmDa7uPEAG1kz1bDl1voapyEPOFHhn8LdRMg3z82mlK2dDMLezV7tyZmAG0v4/lI583yAOXg3RkQP+BQa7cDTb4CiLXVOzXOYAB4voOBgci4tTimgYWGa5cPSAwcknLpxYchXQV6ChL/gsbnYQnpv7XDh53eBksQsnJbAQufuywA0JaWglPDdrTQYOVzgZZzi+RWEjCpYCI4P/P5uQhjbDcSdVs6kjNNaFk5QyHnNzuGx6DE6aXDhJKU2E56bbZOAwhZM+w/Gswka1kjMcN+VOdQL+MBwfrrBRrZh6/h0mAy5OwAkKG9WKKfY/TQY0J2C34fgZChvViin2XSYDmhOw3XD8LIWNasUUuyl3Ki4k/EnfBTS7cJQymgkfl8ohq+nKZhjFx14KywIXjlLGNYTnpIfyZuH6scHg7GNXjlLER4Tn5E2Xzq4zOMtRW8+C6ZjzscilwxHI+HaYw3ddOqxwNhGei3+QZZJOed7gNIfMHVQ7czDnIZLBwcmYp+F24n5SvpJoAL4iPAdZopuP5g2D8xzJzQ/EQSvm+NdHKWAK/WeiipVuYFKUIhLiVMxz473EEPsKg4gc8DUymV8tNAJfYo77hTjEHI9ufejSOMTExHLM8XYiC41j4XaFoBxwdVyCImQhulhvjlNUHTLQZBJ1AJgQpzDHTEJiMMW5Dd3AplMmYO6c5ZBVxSMPYaOSGYXulacupImeCLcoBOaQu6WUV02TYjByVWtiuz4hjYCsADatG8qXdUjVVenUoY9pTUIa+zEM+A6d4CcT0qglgwwjaGL5BofDzeUyGd3DKgc8mpBGDaZlmIWNi4rrbM7F3EvOl9ZkJIayBJ32PiTWiuRGdEHkgLsT0liMxeh135aQRjWPkK6TYJP8hxLSaEUGWIY+qMdJZhuYDPCwhc6VJNDZKpVByI4i2uCWoVup7Yo64DkLfRuxe4G8ImgGtqIPchXxTObUY37nrbB8QIpHdhvRv1ubQ+aVo1xtPRhZrWCT/NSvebK9E9qIpoMzNLBdU8nPY3snfIHbsfVRmN/nKixbqaLk52lGNuPTJuF73GwLNiawpfW7iRTX+SYakHeKtcnYi/2WMYVMxm7TvvXAkWX4SwV16NYY5ct+Snvfdga6N+vzZTnxNoUTJQM8iD45PcCVFvYvxbxyubAk1RlMnFvR7wmUReaiTdyEflAwS2UODMbKIux2tG0NsdVqYacXxwto08zF6OaX8+VF+tfXddjt4tiNbEDlKWA68Bf6JK4BjkCGFlZZfG8/cE5MMaWOKdjtjrUxKNq/3xP48IRwIrK0UZtUbXHVsasJhiO/JeAq+duR3y3wWNAEvEX5yd9IFY7rxEU9shNtqcl/DXlQe8oggyxlsU3+U6RoCjEN3Is++dX8lk6iXEv4S+O9JLxWsxaYhfx+wMDkHwAuSlBXTXE68nNT+eR3IJupemJkNLJAtp149y31FDCSdL784fF4PB6Px+PxeDweT43yHwspVaMxw+O/AAAAAElFTkSuQmCC'
          />{' '}
        </div>
        <div className='post__post-caption'>
          <h5>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac
            luctus nulla.
          </h5>
        </div>
        <div className='post__post-info'>
          <div className='likes'>
            <img
              alt='like'
              src='data:image/png;base64,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'
            />{' '}
            <h6>194 likes</h6>
          </div>
          <div className='comments'>
            <img
              alt='comment'
              src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABlElEQVRIidXUP2tUURAF8F/CKqKSJRCSD+AqaiNJEQS1MUUaO6sVC7WwtRfxIxjBwiZJKTZWVmHbGLBRlJhGSAorLfwThaBF1uLNJS/xbd7djRYeuAx35syZue/NvfzvGKqJN9HGLM5hPPwf8QZLeIpv/RZu4D6+oluzvuBe5GRhAislgSXcQAtHY53EzYgl3ovSCXuiideRsI4LGQ1dxEbkvAqNnlgM4juMZYgnjGEtcud7kaawjS2c6EM8oRW525isIjyMDh4MIJ4wFxpzVcHVCE4foMD50HhbFdyM4EjJlyYkd9+M/WZyDO8hHxS/wh6qKvAh7OmSb8ju2163Pxv2fVWBTth2dr9/4krYl1XBSTtj2hpAfBSfFJ96phdpIQhr+rto8DhyV+3ziDYV172ruP6XMsWvKU7fxeU68jiW7YxgB7dwCsdwHGdwNfiz+BncR5kNaeAuPtv9NO9d10viHRzOLZAwgtt4phi9H/heKpA+y3Mc6Vd8P5RP8cQAnecU2MKdvy2csKz40f8Mw/WUAr8BryZxzOuWYHcAAAAASUVORK5CYII='
            />
            <h6>3 Comments</h6>
          </div>
        </div>
      </div>

      <div className='post__post-comments'>
        <ul className='post__post-comments-list'>
          <li>
            <h6 className='comment-user'>amanjonae_</h6>
            <h6 className='comment-body'>Great!!</h6>
          </li>
          <li>
            <h6 className='comment-user'>amanjonae_</h6>
            <h6 className='comment-body'>Great!!</h6>
          </li>
          <li>
            <h6 className='comment-user'>amanjonae_</h6>
            <h6 className='comment-body'>Great!!</h6>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Post;
