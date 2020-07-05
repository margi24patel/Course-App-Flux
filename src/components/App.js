import React from "react";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import Header from "./common/Header";
import CoursesPage from "./CoursesPage";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import ManageCoursePage from "./ManageCoursePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="conatiner-fluid">
      <ToastContainer autoClose={3000} hideProgressBar />
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/courses" component={CoursesPage} />
        {/* In Switch, the more specific route should be listed first,ex: if "/course/:slug" after the "/course" then it won't work with any slug */}
        <Route path="/course/:slug" component={ManageCoursePage} />{" "}
        {/* More Specific Route */}
        <Route path="/course" component={ManageCoursePage} />{" "}
        {/* Less Specific Route */}
        <Route path="/about" component={AboutPage} />
        {/* Redirect used when you change URLs overtime */}
        <Redirect from="/about-page" to="about" />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
