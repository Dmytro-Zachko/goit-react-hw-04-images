import React from "react";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import PropTypes from 'prop-types';
import { ImageGalleryd } from "./ImageGallery.styled";

export const ImageGallery = ({ loadedImages, onClick }) => {
  return (
    <ImageGalleryd>
      {loadedImages.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            image={image}
            onClick={onClick}
          ></ImageGalleryItem>
        );
      })}
    </ImageGalleryd>
  );
};


ImageGallery.propTypes = {
  loadedImages: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onClick: PropTypes.func,
};