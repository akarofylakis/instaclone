import React from 'react';

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import AddIcon from '../../../img/icons/Add';

import './AddModal.scss';

const AddModal = () => {
  return (
    <div className='add-modal'>
      <form className='add-form'>
        <div className='image-upload-container'>
          <div className='image-preview'>
            <h6>Please pick an image</h6>
          </div>
          <Button secondary text='Add Image'></Button>
        </div>
        <Input
          type='textarea'
          name='add-textarea'
          placeholder='Add your caption here...'
        />
        <Button primary type='submit' text='Upload'>
          <AddIcon />
        </Button>
      </form>
    </div>
  );
};

export default AddModal;
