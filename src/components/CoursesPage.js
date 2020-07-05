import React, { useState, useEffect } from "react";
import courseStore from "../stores/courseStore";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import { loadCourses, deleteCourse } from "../actions/courseActions";

const CoursesPage = () => {
  const [courses, setCourses] = useState(courseStore.getCourses());

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    if (courseStore.getCourses().length === 0) {
      //So, if there are no courses in the courseStore then let's call loadCourses from courseActions.
      loadCourses();
    }
    return () => courseStore.removeChangeListener(onChange); //cleanup on unmount
  }, []);

  function onChange() {
    setCourses(courseStore.getCourses()); //Since our component is connected to Fux Store, when courses are added to the store. onChange will be called.
  }

  return (
    <>
      <h2>Courses</h2>
      <Link to="/course" className="btn btn-primary">
        Add Course
      </Link>
      <CourseList courses={courses} deleteCourse={deleteCourse} />
    </>
  );
};

/* Class Component */
// class CoursesPage extends React.Component {
//   state = {
//     courses: [],
//   };

//   componentDidMount() {
//     getCourses().then((courses) => this.setState({ courses: courses }));
//   }

//   render() {
//     return (
//       <>
//         <h2>Courses</h2>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Author ID</th>
//               <th>Category</th>
//             </tr>
//           </thead>
//           <tbody>
//             {this.state.courses.map((course, key) => {
//               return (
//                 <tr key={course.id}>
//                   <td>{course.title}</td>
//                   <td>{course.authorId}</td>
//                   <td>{course.category}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </>
//     );
//   }
// }

export default CoursesPage;
