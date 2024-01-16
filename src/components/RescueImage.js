import React from 'react';
import { getImageUrl } from "../utils";

export const RescueImage = ({ type, image, name, width, height }) => (
  <img
    src={getImageUrl(type, image)}
    alt={image ? `${name}'s image` : `${name}'s placeholder image`}
    style={{ borderRadius: '50%', width, height, objectFit: 'cover' }}
  />
);