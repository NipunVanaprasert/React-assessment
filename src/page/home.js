import React, { Fragment } from "react";
import Form from "../components/Form/form";
import Tables from "../components/Table/table";
// import classes from "./styles/home.module.css";
import Header from "../components/Header/header";
import { Container } from "react-bootstrap";
const Home = (props) => {
  const { data, data2 } = props;
  return (
    <Fragment>
      <Header />
      <Container>
        <Form button="Add" />
        <Tables data={data} data2={data2} onDeleteJson={props.onDeleteJson} />
      </Container>
    </Fragment>
  );
};

export default Home;
