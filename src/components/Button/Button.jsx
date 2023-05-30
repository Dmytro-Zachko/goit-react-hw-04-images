import PropTypes from 'prop-types';
import { LoadMore } from './Button.styled';

export const Button = ({ text, onClick }) => {
  return (
    <LoadMore type="button" onClick={onClick}>
      {text}
    </LoadMore>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};