import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Container, Spinner } from "react-bootstrap";
import Header from "../components/Header/header";
import axios from "axios";

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
  console.log(data.name);
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
          <div style={{ margin: "1rem" }}>
            <h5>Id: {id}</h5>
            <h5>Name: {data.name}</h5>
            <h5>E-mail: {data.email}</h5>
            <h5>Contact: {data.phone}</h5>
            <Link to="/">
              <Button
                type="button"
                onClick={() => {
                  localStorage.removeItem("users");
                }}
              >
                Back
              </Button>
            </Link>
          </div>
        </Container>
      )}
    </Fragment>
  );
};

export default View;
