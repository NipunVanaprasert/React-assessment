import React, { Fragment } from "react";
import Header from "../components/Header/header";
import { Container } from "react-bootstrap";
import Form from "../components/Form/form";

import Tables from "../components/Table/table";

const Updates = (props) => {
  return (
    <Fragment>
      <Header />
      <Container>
        <Form
          data={props.data}
          data2={props.data2}
          button="Update"
          onUpdateJson={props.onUpdateJson}
        />
        <Tables
          data={props.data}
          data2={props.data2}
          onDeleteJson={props.onDeleteJson}
        />
      </Container>
    </Fragment>
  );
};

export default Updates;
