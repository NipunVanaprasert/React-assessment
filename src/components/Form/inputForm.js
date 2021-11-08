import React, { useRef, useEffect, useState } from "react";
import { Fragment } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import classes from "./formInput.module.css";
import { informationSliceAction } from "../../store/informationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import fireDb from "../../utils/firebase";
import { ToastContainer, toast, Zoom } from "react-toastify";

const Inputform = (props) => {
  const dispatch = useDispatch();
  const inputName = useRef();
  const inputEmail = useRef();
  const inputContact = useRef();
  const information = useSelector((state) => state.information);
  const { id } = useParams();
  const history = useHistory();
  const [data, setData] = useState({});

  const [valid, setValid] = useState({
    name: true,
    email: true,
    phone: true,
  });

  const onChanged = (event) => {
    if (event.target.value.trim() === "") {
      setValid({ ...valid, name: false });
    } else {
      setValid({ ...valid, name: true });
    }
  };

  const onChangedEmail = (event) => {
    if (event.target.value.trim() === "") {
      setValid({ ...valid, email: false });
    } else {
      setValid({ ...valid, email: true });
    }
  };

  const onChangedContact = (event) => {
    if (event.target.value.trim() === "") {
      setValid({ ...valid, phone: false });
    } else {
      setValid({ ...valid, phone: true });
    }
  };

  const addInformation = () => {
    dispatch(
      informationSliceAction.addInformation({
        name: inputName.current.value,
        phone: inputContact.current.value,
        email: inputEmail.current.value,
      })
    );
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (
      inputName.current.value === "" ||
      inputEmail.current.value === "" ||
      inputContact.current.value === ""
    ) {
      setValid({ name: false, email: false, phone: false });
    } else {
      if (id) {
        let re = new RegExp("[^0-9]");
        if (id.match(re)) {
          fireDb.child(`/users/${id}`).set(information);
        } else {
          props.onUpdateJson(id);
        }
        setTimeout(() => {
          history.push("/");
        }, 500);
        setTimeout(() => {
          toast.success("Update success");
        }, 550);
      } else {
        dispatch(informationSliceAction.createUser());
        toast.success("Add success");
      }
      inputName.current.value = "";
      inputEmail.current.value = "";
      inputContact.current.value = "";
    }
  };

  useEffect(() => {
    let reg = new RegExp("[^0-9]");
    if (id) {
      if (id.match(reg)) {
        fireDb
          .child(`users/${id}`)
          .get()
          .then((snap) => {
            if (snap.exists()) {
              setData(snap.val());
            }
          });
      } else {
        Object.keys(props.data).map((ids, index) => {
          if (props.data[ids].id === Number(id)) {
            setData({
              name: props.data[ids].name,
              email: props.data[ids].email,
              phone: props.data[ids].phone,
            });
          }
        });
      }
    }
  }, [id]);

  return (
    <Fragment>
      <ToastContainer draggable={false} transition={Zoom} autoClose={1000} />
      <form onSubmit={submitHandler} className="mt-2">
        <Row>
          <Col xs={12} sm={5} md={4} lg={3}>
            <label htmlFor="name">Name</label>

            <input
              id="name"
              type="text"
              className={`${classes.input} ${
                valid.name ? "" : classes.invalidInput
              }`}
              placeholder="Text Input"
              ref={inputName}
              defaultValue={data.name || ""}
              onChange={onChanged}
              onBlur={onChanged}
            />
            {valid.name ? (
              ""
            ) : (
              <p className={classes.invalid}>please input your name</p>
            )}

            <label htmlFor="email">E-mail</label>

            <input
              id="email"
              type="email"
              className={`${classes.input} ${
                valid.email ? "" : classes.invalidInput
              }`}
              placeholder="Email Input"
              ref={inputEmail}
              defaultValue={data.email || ""}
              onChange={onChangedEmail}
              onBlur={onChangedEmail}
            />
            {valid.email ? (
              ""
            ) : (
              <p className={classes.invalid}>please input your email</p>
            )}
            <label htmlFor="phone">Contact</label>

            <input
              id="phone"
              type="text"
              className={`${classes.input} ${
                valid.phone ? "" : classes.invalidInput
              }`}
              placeholder="Text Input"
              ref={inputContact}
              defaultValue={data.phone || ""}
              onChange={onChangedContact}
              onBlur={onChangedContact}
            />
            {valid.phone ? (
              ""
            ) : (
              <p className={classes.invalid}>please input your phone</p>
            )}

            {props.buttonName === "Add" ? (
              <Button
                className="mt-2"
                type="submit"
                disabled={!valid.name || !valid.email || !valid.phone}
                onClick={addInformation}
              >
                {props.buttonName}
              </Button>
            ) : (
              ""
            )}
            {props.buttonName === "Update" ? (
              <Fragment>
                <Button
                  className="mt-2"
                  type="submit"
                  onClick={addInformation}
                  disabled={!valid.name || !valid.email || !valid.phone}
                >
                  {props.buttonName}
                </Button>
                <Link to="/">
                  <Button
                    className="mt-2 ms-2"
                    type="button"
                    variant="secondary"
                  >
                    Back
                  </Button>
                </Link>
              </Fragment>
            ) : (
              ""
            )}
          </Col>
        </Row>
      </form>
    </Fragment>
  );
};

export default Inputform;
