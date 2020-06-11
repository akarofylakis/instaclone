import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { useForm } from "../../../utils/hooks/useForm";

import { createPostAsync } from "../../../redux/posts/post-actions";
import { selectCurrentUser } from "../../../redux/users/user-selectors";

import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import AddIcon from "../../../img/icons/Add";

import "./AddModal.scss";

const AddModal = ({
  onModalClose,
  forceCloseModal,
  createPost,
  currentUser,
}) => {
  const [post, changeHandler] = useForm({
    caption: "",
  });
  const { caption } = post;

  const [fileUrl, setFileUrl] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);

  const chooseFile = (e) => {
    if (e.target.files[0]) {
      setFileUrl(URL.createObjectURL(e.target.files[0]));
    }
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "akarofylakis");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/akarofylakis/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const imageFile = await res.json();
    const imageUrl = imageFile.secure_url;
    setLoading(false);

    const postToBeCreated = { ...post, userId: currentUser.userId, imageUrl };
    createPost(postToBeCreated);

    window.location.reload();
  };

  return (
    <div className="add-modal">
      <div className="modal-close" onClick={onModalClose}>
        <img
          className="modal-close--img"
          alt="close"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAiklEQVRIie2UQQqAMAwER/9g0SfqcxUU9DH10oKC1qSt4qF7bTIDIQ2U/DU9YBT1xvWIMgAWmIQS42qt631MA4yuYQE6RW0rEUgl0XCJJBkekmSDX0lWYM4JP0o82AKbFF4nSKuE3lNCIwqtsBruZ675J2r43ZtaIlnFaIlmz6Mkrx87ePlcl3ybHZOAR4UrnAAtAAAAAElFTkSuQmCC"
        />
      </div>

      <form className="add-form" onSubmit={handleSubmit}>
        <div className="image-upload-container">
          <div
            className="image-preview"
            style={{ backgroundImage: `url(${fileUrl})` }}
          >
            {!fileUrl && <h6>Image Preview</h6>}
          </div>

          <div className="image-upload-field">
            <Button secondary text="Choose a file">
              <input
                onChange={chooseFile}
                accept="image/x-png,image/gif,image/jpeg, image/jpg"
                type="file"
                name="file"
              ></input>
            </Button>
          </div>
        </div>

        <Input
          onChange={changeHandler}
          type="textarea"
          name="caption"
          value={caption}
          placeholder="Add your caption here..."
        />

        <Button onClick={forceCloseModal} primary type="submit" text="Upload">
          <AddIcon />
        </Button>
        {loading && <LoadingSpinner />}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddModal));
