import React, { useEffect } from 'react';
import { getImageUrl } from "../utils/componentUtils";

const getPlaceholderImage = (type) => {
  switch(type) {
    case 'Dog':
      return 'puppy';
    case 'Cat':
      return 'kitten';
    default:
      return 'users';
  }
}

const DisplayImage = ({ directory, id, type, name, width, height }) => {
  useEffect(() => {
    const img = new Image();
    img.src = getImageUrl(directory, id);
  }, [directory, id]);

  return (
    <img
      src={id && directory ? getImageUrl(directory, id) : getImageUrl('placeholders', getPlaceholderImage(type))}
      alt={id && directory ? `${name}'s picture` : `${name}'s placeholder picture`}
      style={{ borderRadius: '25%', width, height, objectFit: 'cover' }}
    />
  );
};

export default DisplayImage;