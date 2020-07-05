import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import { toast } from "react-toastify";
import courseStore from "../stores/courseStore";
import * as courseActions from "../actions/courseActions";

const ManageCoursePage = (props) => {
  // debugger;
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses);
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    const slug = props.match.params.slug; //from the path `courses/:slug`
    if (courses.length === 0) {
      courseActions.loadCourses();
    }
    if (slug) {
      setCourse(courseStore.getCourseBySlug(slug));
      //console.log(slug);
    }
    return () => courseStore.removeChangeListener(onChange);
  }, [courses.length, props.match.params.slug]);
  //this says if the slug in url changes then we should rerun this effect
  //if any dependencies listed in array change, then the effect will re-run.

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  function handleChange(event) {
    const updatedCourse = {
      ...course,
      [event.target.name]: event.target.value,
    };
    setCourse(updatedCourse);
  }

  function formIsValid() {
    const _errors = {};

    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "Author is required";
    if (!course.category) _errors.category = "Category  is required";

    setErrors(_errors);
    //Form is valid if the errors object has no properties
    //Object.keys returns array(Array[title, authorId, category]) of object(_errors)
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    courseActions.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course Saved Succesfully");
    });
  }

  return (
    <>
      <h2>Manage Course</h2>
      {/* {props.match.params.slug} it used for print the slug on the page*/}
      <CourseForm
        errors={errors}
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
