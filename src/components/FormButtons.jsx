import React from "react";
import { Grid, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

function FormButtons({ id, endpoint }) {
  const history = useHistory();

  return (
    <Grid item container justify="center">
      <Button
        type="submit"
        style={{ margin: "0.625rem" }}
        variant="contained"
        color="primary"
        size="large"
      >
        Save
      </Button>
      <Button
        style={{ margin: "0.625rem" }}
        variant="contained"
        color="primary"
        size="large"
        onClick={() => history.push(`${endpoint}/${id}`)}
      >
        Cancel
      </Button>
    </Grid>
  );
}

FormButtons.propTypes = {
  id: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
};

export default FormButtons;