import React from "react";
import { Grid, Button } from "@mui/material";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { saveLabel, cancelLabel } from "../accessibility/accessibilityText";

function FormButtons({ id, endpoint }) {
  const history = useHistory();

  return (
    <Grid item container justifyContent="center">
      <Button
        type="submit"
        style={{ margin: "0.625rem" }}
        variant="contained"
        color="primary"
        size="large"
      >
        {saveLabel}
      </Button>
      <Button
        style={{ margin: "0.625rem" }}
        variant="contained"
        color="primary"
        size="large"
        onClick={() => history.push(id ? `${endpoint}/${id}` : endpoint)}
      >
        {cancelLabel}
      </Button>
    </Grid>
  );
}

FormButtons.defaultProps = {
  id: "",
};

FormButtons.propTypes = {
  id: PropTypes.string,
  endpoint: PropTypes.string.isRequired,
};

export default FormButtons;
