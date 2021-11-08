import React, { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import Header from "../components/Header/header";

const View = () => {
  const { id } = useParams();
  const user = localStorage.getItem("users");
  const users = JSON.parse(user);

  return (
    <Fragment>
      <Header />
      <Container>
        <div style={{ margin: "1rem" }}>
          <h5>Id: {id}</h5>
          <h5>Name: {users.name}</h5>
          <h5>E-mail: {users.email}</h5>
          <h5>Contact: {users.phone}</h5>

          <Link to="/">
            <Button type="button">Back</Button>
          </Link>
        </div>
      </Container>
    </Fragment>
  );
};

export default View;
