import React, { useState } from 'react';
import { connect } from 'react-redux';

import { createPostAsync } from '../../../redux/posts/post-actions';
import { selectCurrentUser } from '../../../redux/users/user-selectors';

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import AddIcon from '../../../img/icons/Add';

import './AddModal.scss';

const AddModal = ({
  onModalClose,
  forceCloseModal,
  createPost,
  currentUser,
}) => {
  const [post, setPost] = useState({
    imageUrl: '',
    caption: '',
  });

  const { imageUrl, caption } = post;

  const handleSubmit = (e) => {
    e.preventDefault();
    const postToBeCreated = { ...post, userId: currentUser.userId };
    createPost(postToBeCreated);
  };

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setPost({ ...post, [name]: value });
  };

  return (
    <div className='add-modal'>
      <div className='modal-close' onClick={onModalClose}>
        <img
          className='modal-close--img'
          alt='close'
          src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAiklEQVRIie2UQQqAMAwER/9g0SfqcxUU9DH10oKC1qSt4qF7bTIDIQ2U/DU9YBT1xvWIMgAWmIQS42qt631MA4yuYQE6RW0rEUgl0XCJJBkekmSDX0lWYM4JP0o82AKbFF4nSKuE3lNCIwqtsBruZ675J2r43ZtaIlnFaIlmz6Mkrx87ePlcl3ybHZOAR4UrnAAtAAAAAElFTkSuQmCC'
        />
      </div>

      <form className='add-form' onSubmit={handleSubmit}>
        <div className='image-upload-container'>
          <div className='image-preview'>
            <h6>Image Preview</h6>
          </div>
          <Input
            onChange={changeHandler}
            type='text'
            name='imageUrl'
            value={imageUrl}
            placeholder='Image URL'
          />
        </div>
        <Input
          onChange={changeHandler}
          type='textarea'
          name='caption'
          value={caption}
          placeholder='Add your caption here...'
        />
        <Button onClick={forceCloseModal} primary type='submit' text='Upload'>
          <AddIcon />
        </Button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  createPost: (post) => dispatch(createPostAsync(post)),
});

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddModal);
