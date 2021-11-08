import { Fragment } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./page/home";
import Notfound from "./page/notfound";
import Updates from "./page/updates";
import View from "./page/view";
import { useState, useEffect } from "react";
import fireDb from "./utils/firebase";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function App() {
  const [dataJson, setDataJson] = useState([]);
  const [data2, setData2] = useState({});
  const information = useSelector((state) => state.information);

  const url = "https://jsonplaceholder.typicode.com/users";

  const fetchData = async () => {
    await fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDataJson(data);
      });
  };

  const updateJson = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(information),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        const updatedUsers = dataJson.map((user) => {
          if (user.id === data.id) {
            user.name = data.name;
            user.email = data.email;
            user.phone = data.phone;
          }
          return user;
        });
        setDataJson(updatedUsers);
      });
  };
  const deleteJson = async (id) => {
    if (
      window.confirm("Are you sure that your wanted to delete that contact?")
    ) {
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) {
            toast.error("Fail to delete", res);
          } else {
            setDataJson(
              dataJson.filter((data) => {
                return data.id !== id;
              })
            );
            toast.success("delete success");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    fetchData();
    fireDb.child("users").on("value", (snap) => {
      if (snap.val() !== null) {
        setData2({ ...snap.val() });
      }
    });
  }, []);

  return (
    <Fragment>
      <Switch>
        <Route path="/" exact>
          <Home data={dataJson} data2={data2} onDeleteJson={deleteJson} />
        </Route>
        <Route path="/update/:id">
          <Updates
            data={dataJson}
            data2={data2}
            onDeleteJson={deleteJson}
            onUpdateJson={updateJson}
          />
        </Route>
        <Route path="/view/:id">
          <View data={dataJson} data2={data2} />
        </Route>
        <Route path="*">
          <Notfound />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
