import React, { useEffect } from 'react';
import { getImageUrl } from "../../utils/utils";

const RescueImage = ({ type, image, name, width, height }) => {
  useEffect(() => {
    const img = new Image();
    img.src = getImageUrl(type, image);
  }, [type, image]);

  return (
    <img
      src={getImageUrl(type, image)}
      alt={image ? `${name}'s picture` : `${name}'s placeholder picture`}
      style={{ borderRadius: '50%', width, height, objectFit: 'cover' }}
    />
  );
};

export default RescueImage;