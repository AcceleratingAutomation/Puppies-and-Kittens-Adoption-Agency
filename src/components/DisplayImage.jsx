import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { getImageUrl } from "../utils/componentUtils";

const getPlaceholderImage = (type) => {
  switch (type) {
    case "Dog":
      return "puppy";
    case "Cat":
      return "kitten";
    default:
      return "users";
  }
};

const useStyles = makeStyles({
  responsiveImage: {
    maxWidth: "100%",
    height: "auto",
  },
});

function DisplayImage({ directory, image, type, name, width, height }) {
  const classes = useStyles();

  useEffect(() => {
    const img = new Image();
    img.src = getImageUrl(directory, image);
  }, [directory, image]);

  return (
    <img
      className={classes.responsiveImage}
      src={
        image && directory
          ? getImageUrl(directory, image)
          : getImageUrl("placeholders", getPlaceholderImage(type))
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
    />
  );
}

DisplayImage.defaultProps = {
  type: "users",
};

DisplayImage.propTypes = {
  directory: PropTypes.string.isRequired,
  image: PropTypes.number.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

export default DisplayImage;
