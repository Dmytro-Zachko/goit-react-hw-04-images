import React, { useState,useEffect} from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "./Button/Button";
import {FidgetSpinner } from 'react-loader-spinner';
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { fetchPixabay } from "services/pixabay-api";
import { Modal } from "./Modal/Modal";
import { Container } from "./App.styled";

export const AppH = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [loadedImages, setLoadedImages] = useState([])
    const [page, setPage] = useState(1)
    const [isLoading, setisLoading] = useState(false)
    const [isModalOpen, setisModalOpen] = useState(false)
    const [totalPages, settotalPages] = useState(0)
    const [imageInModal, setImageInModal] = useState({ link: '', alt: '' });

   useEffect(() => {
    const showNotification = data => {
      if (page === 1) {
        data.hits.length > 0
          ? toast.success(`Wow! We found ${data.total} results`)
          : toast.warn(`Sorry, but there are no results for your query`);
      }
    };

    if (searchQuery !== '') {
      try {
        setisLoading(true);

        fetchPixabay(searchQuery, page).then(data => {
          setLoadedImages(prev => [...prev, ...data.hits]);
          showNotification(data);
          settotalPages(Math.floor(data.totalHits / 12));
          setisLoading(false);
        });
      } catch (error) {
        toast.error('Ooops, something went wrong :(');
        console.log(error);
      }
    }
  }, [page, searchQuery]);

const  handleFormSubmit = inputValue => {
    if (inputValue!== searchQuery) {
        setLoadedImages([]);
        setSearchQuery(inputValue);
      setPage(1);
    }
    };
    
const  handleLoadMoreClick = () => {
    setPage(State =>  State + 1 );
    };
    
const handleImageClick = image => {
    const { largeImageURL, tags } = image;
    setisLoading(true)
    setisModalOpen(true)
    setImageInModal({
    link: largeImageURL,
    alt: tags,})
  };    

    const handleModalImageLoaded = () => {
    setisLoading(false)
    };
    
    const handleModalClose = () => {
    setisModalOpen(false);
    };
    
     return (
      <Container>
        <Searchbar onSubmit={handleFormSubmit} />

        <ImageGallery
          loadedImages={loadedImages}
          onClick={handleImageClick}
        ></ImageGallery>

        {isLoading && (
          <FidgetSpinner
  visible={true}
  height="80"
  width="80"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
  ballColors={['#ff0000', '#00ff00', '#0000ff']}
  backgroundColor="#F4442E"
/>
        )}


        {loadedImages.length > 0 &&
        !isLoading &&
          page <= totalPages && (
            <Button
              text="Load more"
              onClick={handleLoadMoreClick}
            ></Button>
          )}

        {isModalOpen && (
          <Modal
            image={imageInModal}
            onClose={handleModalClose}
            onLoad={handleModalImageLoaded}
          ></Modal>
        )}

        <ToastContainer />
      </Container>
    );
}