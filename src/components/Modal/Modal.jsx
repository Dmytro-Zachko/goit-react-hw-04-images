import React, { useEffect} from "react";
import { Modall, Overlay } from "./Modal.styled";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root')

export const Modal = ({onLoad,image,onClose}) => {
 
const {link, alt} = image
  useEffect((() => {
     const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };
    
    window.addEventListener('keydown', handleKeyDown);

     return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
  }),[])


  const handleBackdropClick = event => {
    const { target, currentTarget } = event;

    if (target.value  === currentTarget.value) {
     onClose();
    }
  };

  return createPortal(
      <Overlay onClick={handleBackdropClick}>
        <Modall>
          <img src={link} alt={alt} onLoad={() => onLoad()} />
        </Modall>
      </Overlay>,
      modalRoot
    );
  }

   Modal.propTypes = {
    onLoad: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    image: PropTypes.shape({
        link: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      }).isRequired,}