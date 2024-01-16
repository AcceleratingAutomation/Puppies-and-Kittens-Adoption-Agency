import React from 'react';
import { getImageUrl } from "../utils";

export const RescueImage = ({ type, image, name, width, height }) => (
  <img
    src={getImageUrl(type, image)}
    alt={image ? `${name}'s picture` : `${name}'s placeholder picture`}
    style={{ borderRadius: '50%', width, height, objectFit: 'cover' }}
  />
);