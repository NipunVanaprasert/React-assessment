import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import Header from "../components/Header/header";

import { Spinner } from "react-bootstrap";
const View = (props) => {
  const { data, data2 } = props;
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [state, setstate] = useState({});
  useEffect(() => {
    Object.keys(data).map((ids, index) => {
      if (data[ids].id === Number(id)) {
        setLoading(true);
        setstate({
          name: data[ids].name,
          email: data[ids].email,
          contact: data[ids].phone,
        });
        setLoading(false);
      }
    });
    Object.keys(data2).map((ids, index) => {
      if (ids === id) {
        setLoading(true);
        setstate({
          name: data2[ids].name,
          email: data2[ids].email,
          contact: data2[ids].phone,
        });
        setLoading(false);
      }
    });
  }, []);

  console.log(state);

  return (
    <Fragment>
      <Header />
      <Container>
        {loading ? (
          <div style={{ height: "100vh", width: "100%" }}>
            <div
              style={{ height: "90%", position: "sticky" }}
              className="d-flex justify-content-center align-items-center"
            >
              <Spinner animation="border" variant="secondary" />
            </div>
          </div>
        ) : (
          <div style={{ margin: "1rem" }}>
            <h5>Id: {id}</h5>
            <h5>Name: {state.name}</h5>
            <h5>E-mail: {state.email}</h5>
            <h5>Contact: {state.contact}</h5>

            <Link to="/">
              <Button type="button">Back</Button>
            </Link>
          </div>
        )}
      </Container>
    </Fragment>
  );
};

export default View;
