import React from "react";
import { render, screen } from "@testing-library/react";
import { Formik } from "formik";
import AddOrEditForm from "../../components/AddOrEditForm";

function renderAddOrEditForm(props) {
  return render(
    <Formik initialValues={{ type: "" }} onSubmit={jest.fn()}>
      <AddOrEditForm
        errors={props.errors}
        touched={props.touched}
        formFields={props.formFields}
        endpoint={props.endpoint}
        id={props.id}
      />
    </Formik>,
  );
}

describe("Add Or Edit Form", () => {
  const formProps = {
    errors: {},
    touched: {},
    formFields: [
      {
        id: "1",
        name: "name",
        type: "text",
        label: "Name",
      },
      {
        id: "2",
        name: "type",
        type: "select",
        label: "Type",
        options: ["Option 1", "Option 2"],
      },
    ],
    endpoint: "/test-endpoint",
    id: "1",
  };

  beforeEach(() => {
    renderAddOrEditForm(formProps);
  });

  test("matches snapshot comparison", () => {
    const { asFragment } = renderAddOrEditForm(formProps);
    expect(asFragment()).toMatchSnapshot();
  });

  test("displays form buttons", () => {
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  test("displays error message when field is touched and there is an error", () => {
    const errorProps = {
      ...formProps,
      errors: { type: "Type error" },
      touched: { type: true },
    };
    renderAddOrEditForm(errorProps);
    expect(screen.getByText("Type error")).toBeInTheDocument();
  });
});
