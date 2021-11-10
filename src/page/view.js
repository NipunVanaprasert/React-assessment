import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Container, Spinner } from "react-bootstrap";
import Header from "../components/Header/header";
import axios from "axios";
import classes from "./styles/view.module.css";

const View = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const users = JSON.parse(localStorage.getItem("users"));
  let re = new RegExp("[^0-9]");
  const Db = axios.create({
    baseURL: `https://login-auth-5e306-default-rtdb.asia-southeast1.firebasedatabase.app/`,
  });
  useEffect(() => {
    setLoading(true);
    if (id.match(re)) {
      Db.get(`/users.json`).then((res) => {
        console.log(res.data);
        Object.keys(res.data).map((ids) => {
          if (ids === id) {
            console.log(res.data[ids]);
            setData(res.data[ids]);
            setLoading(false);
          }
        });
      });
    } else {
      setLoading(true);
      setData(users);
      setLoading(false);
    }
  }, []);

  return (
    <Fragment>
      <Header />
      {loading ? (
        <div style={{ height: "100vh", width: "100%" }}>
          <div
            style={{
              height: " 100%",
              display: " flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </div>
      ) : (
        <Container>
          <Card className="mt-5">
            <Card.Header bsPrefix={classes.bg}>
              <h5>Information</h5>
            </Card.Header>
            <Card.Body>
              <div style={{ margin: "1rem" }}>
                <p>ID: {id}</p>
                <p>Name: {data.name}</p>
                <p>E-mail: {data.email}</p>
                <p>Contact: {data.phone}</p>
                <Link to="/">
                  <Button
                    type="button"
                    variant="dark"
                    onClick={() => {
                      localStorage.removeItem("users");
                    }}
                  >
                    Back
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Container>
      )}
    </Fragment>
  );
};

export default View;
