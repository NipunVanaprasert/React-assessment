import React from "react";
import { Fragment } from "react";
import Inputform from "./inputForm";

const Form = (props) => {
  return (
    <Fragment>
      <Inputform
        data={props.data}
        data2={props.data2}
        buttonName={props.button}
        onUpdateJson={props.onUpdateJson}
      />
    </Fragment>
  );
};

export default Form;
