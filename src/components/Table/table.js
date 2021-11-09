import React from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./table.module.css";
import fireDb from "../../utils/firebase";
import { toast } from "react-toastify";

const Tables = (props) => {
  const { data, data2 } = props;
  const view = (id) => {
    localStorage.setItem("users", JSON.stringify(data[id - 1]));
  };
  const view2 = (id) => {
    localStorage.setItem("users", JSON.stringify(data2[id]));
  };
  const deleteData = (id) => {
    if (
      window.confirm("Are you sure that your wanted to delete that contact?")
    ) {
      fireDb.child(`users/${id}`).remove();
      toast.success("Delete Success");
    }
  };
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>E-mail</th>
          <th>Contact</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((data, index) => {
          return (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.phone}</td>
              <td className={classes["group-button"]}>
                <Link to={`/view/${data.id}`}>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      view(data.id);
                    }}
                  >
                    view
                  </Button>
                </Link>
                <Link to={`/update/${data.id}`}>
                  <Button>update</Button>
                </Link>
                <Button
                  variant="danger"
                  onClick={() => {
                    props.onDeleteJson(data.id);
                  }}
                >
                  delete
                </Button>
              </td>
            </tr>
          );
        })}
        {Object.keys(data2).map((id, index) => {
          return (
            <tr key={id}>
              <td>
                <div className={classes.overflow}>{id}</div>
              </td>
              <td>{data2[id].name}</td>
              <td>{data2[id].email}</td>
              <td>{data2[id].phone}</td>
              <td className={classes["group-button"]}>
                <Link to={`/view/${id}`}>
                  <Button variant="secondary">view</Button>
                </Link>
                <Link to={`/update/${id}`}>
                  <Button>update</Button>
                </Link>
                <Button
                  variant="danger"
                  onClick={() => {
                    deleteData(id);
                  }}
                >
                  delete
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default Tables;
