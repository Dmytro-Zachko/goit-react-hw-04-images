import React from "react";
import PropTypes from 'prop-types';
import { ImageGalleryItemLi,ImageGalleryImg } from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({ image, onClick }) => {
  const { webformatURL, tags } = image;
  return (
    <ImageGalleryItemLi>
      <ImageGalleryImg
        src={webformatURL}
        alt={tags}
        onClick={() => onClick(image)}
      />
    </ImageGalleryItemLi>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  onclick: PropTypes.func,
}