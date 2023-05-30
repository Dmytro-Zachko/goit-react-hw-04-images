import React, { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "./Button/Button";
import {FidgetSpinner } from 'react-loader-spinner';
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { fetchPixabay } from "services/pixabay-api";
import { Modal } from "./Modal/Modal";
import { Container } from "./App.styled";


export class App extends Component {
  state = {
    searchQuery: '',
    loadedImages: [],
    page: 1,
    error: null,
    status: 'idle',
    isModalOpen: false,
    imageInModal: {
      link: '',
      alt: '',
    },
    totalPages: 0,
  };

  componentDidUpdate = (_, prevState) => {
    const { page, loadedImages, searchQuery } = this.state;
    const prevQueryValue = prevState.searchQuery;
    const currentQueryValue = searchQuery;

    if (prevQueryValue !== currentQueryValue || prevState.page !== page) {
      try {
        this.setState({ status: 'pending' });

        fetchPixabay(searchQuery, page).then(data => {
          this.showNotification(data);

          this.setState({
            loadedImages: [...loadedImages, ...data.hits],
            status: 'resolved',
            totalPages: Math.floor(data.totalHits / 12),
          });
        });
      } catch (error) {
        this.setState({ error: true });

        toast.error('Oops, something went wrong :(');

        console.log(error);
      }
    }
  };

  showNotification = data => {
    if (this.state.page === 1) {
      data.hits.length > 0
        ? toast.success(`Wow! We found ${data.total} results!`)
        : toast.warn(`Sorry, but there are no results for your query`);
    }
  };

  handleFormSubmit = inputValue => {
    this.setState({ searchQuery: inputValue, loadedImages: [], page: 1 });
  };

  handleLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleImageClick = image => {
    const { largeImageURL, tags } = image;

    this.setState({
      status: 'pending',
      isModalOpen: true,
      imageInModal: {
        link: largeImageURL,
        alt: tags,
      },
    });
  };

  handleModalImageLoaded = () => {
    this.setState({ status: 'resolved' });
  };

  handleModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const {
      loadedImages,
      status,
      searchQuery,
      isModalOpen,
      imageInModal,
      totalPages,
      page,
    } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {status === 'idle' && (
          <div style={{ textAlign: 'center' }}>
            Введіть текст для пошуку зображення
          </div>
        )}

        <ImageGallery
          loadedImages={loadedImages}
          onClick={this.handleImageClick}
        ></ImageGallery>

        {status === 'pending' && (
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

        {status === 'rejected' && (
          <div>
            <p>Пошук за значенням {searchQuery} не дав результату</p>
          </div>
        )}

        {loadedImages.length > 0 &&
          status !== 'pending' &&
          page <= totalPages && (
            <Button
              text="Load more"
              onClick={this.handleLoadMoreClick}
            ></Button>
          )}

        {isModalOpen && (
          <Modal
            image={imageInModal}
            onClose={this.handleModalClose}
            onLoad={this.handleModalImageLoaded}
          ></Modal>
        )}

        <ToastContainer />
      </Container>
    );
  }
}
