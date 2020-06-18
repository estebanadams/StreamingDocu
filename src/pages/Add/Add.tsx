import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { db, firestore } from "../../services/firebase";
import moment from "moment";

import "../../styles/add.scss";

const valuesCheck = (values: any) => {
  const errors: any = {};
  if (!values.title) {
    errors.title = "Required";
  }
  if (!values.poster) {
    errors.poster = "Required";
  }
  if (!values.src) {
    errors.src = "Required";
  }
  if (!values.desc) {
    errors.desc = "Required";
  }
  if (!values.time) {
    errors.time = "Required";
  }
  return errors;
};

const Add: React.FC = () => {
  return (
    <div className="add-container">
      <Formik
        initialValues={{
          title: "",
          poster: "",
          src: "",
          desc: "",
          time: "",
          timestamp: "",
          views: 0
        }}
        validate={values => valuesCheck(values)}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(values);
          values.timestamp = moment().format();
          values.views = 0;
          firestore.collection("videos").add(values);
          console.log("Value added");
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <Field type="text" name="title" placeholder="Titre" />
            <ErrorMessage name="title" component="div" />
            <Field type="text" name="poster" placeholder="Poster Url" />
            <ErrorMessage name="poster" component="div" />
            <Field type="text" name="src" placeholder="Video Url" />
            <ErrorMessage name="src" component="div" />
            <Field type="text" name="desc" placeholder="Description" />
            <ErrorMessage name="desc" component="div" />
            <Field type="text" name="time" placeholder="Time length" />
            <ErrorMessage name="time" component="div" />

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Add;
