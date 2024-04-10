import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "../styles.css";
import { getImageUrl } from "../utils/componentUtils";

const getPlaceholderImage = (type) => {
  switch (type.toLowerCase()) {
    case "dog":
      return "puppy";
    case "cat":
      return "kitten";
    default:
      return "users";
  }
};

function DisplayImage({ directory, image, type, name, width, height }) {
  useEffect(() => {
    const img = new Image();
    img.src = getImageUrl(directory, image);
  }, [directory, image]);

  return (
    <img
      className="responsive-image"
      src={
        image && directory
          ? getImageUrl(directory, image)
          : getImageUrl(directory, `placeholder-${getPlaceholderImage(type)}`)
      }
      alt={
        image && directory
          ? `${name}'s picture`
          : `${name}'s placeholder picture`
      }
      style={{
        borderRadius: "25%",
        width,
        height,
        objectFit: "cover",
      }}
      data-testid="display-image"
    />
  );
}

DisplayImage.defaultProps = {
  type: "users",
};

DisplayImage.propTypes = {
  directory: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

export default DisplayImage;
