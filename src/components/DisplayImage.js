import React, { useEffect } from 'react';
import { getImageUrl } from "../utils/componentUtils";

const DisplayImage = ({ directory, id, type, name, width, height }) => {
  useEffect(() => {
    const img = new Image();
    img.src = getImageUrl(directory, id);
  }, [directory, id]);

  return (
    <img
      src={id && directory ? getImageUrl(directory, id) : getImageUrl('placeholders', type === 'Dog' ? 'puppy' : 'kitten')}
      alt={id && directory ? `${name}'s picture` : `${name}'s placeholder picture`}
      style={{ borderRadius: '50%', width, height, objectFit: 'cover' }}
    />
  );
};

export default DisplayImage;