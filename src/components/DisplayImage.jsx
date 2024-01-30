import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { getImageUrl } from '../utils/componentUtils';

const getPlaceholderImage = (type) => {
  switch (type) {
    case 'Dog':
      return 'puppy';
    case 'Cat':
      return 'kitten';
    default:
      return 'users';
  }
};

const useStyles = makeStyles({
  responsiveImage: {
    maxWidth: '100%',
    height: 'auto',
  },
});

function DisplayImage({
  directory, id, type, name, width, height,
}) {
  const classes = useStyles();

  useEffect(() => {
    const img = new Image();
    img.src = getImageUrl(directory, id);
  }, [directory, id]);

  return (
    <img
      className={classes.responsiveImage}
      src={
        id && directory
          ? getImageUrl(directory, id)
          : getImageUrl('placeholders', getPlaceholderImage(type))
      }
      alt={
        id && directory ? `${name}'s picture` : `${name}'s placeholder picture`
      }
      style={{
        borderRadius: '25%', width, height, objectFit: 'cover',
      }}
    />
  );
}

DisplayImage.defaultProps = {
  type: 'users',
};

DisplayImage.propTypes = {
  directory: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

export default DisplayImage;
