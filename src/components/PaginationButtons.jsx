import React from "react";
import PropTypes from "prop-types";
import { Button, Grid } from "@mui/material";

function PaginationButtons({ page, setPage, dataLength }) {
  return (
    <Grid item container justifyContent="center">
      <Button
        style={{ margin: "0.625rem" }}
        variant="contained"
        color="primary"
        size="large"
        onClick={() => setPage(page - 1)}
        disabled={page === 0}
      >
        Previous
      </Button>
      <Button
        style={{ margin: "0.625rem" }}
        variant="contained"
        color="primary"
        size="large"
        onClick={() => setPage(page + 1)}
        disabled={(page + 1) * 12 >= dataLength}
      >
        Next
      </Button>
    </Grid>
  );
}

PaginationButtons.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  dataLength: PropTypes.number.isRequired,
};

export default PaginationButtons;
