import './App.css';
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import StudentDashboard from "./components/dashboard/StudentDashboard";
import AddQuizz from "./components/profile-forms/AddQuizz";
import PrivateRoute from "./components/routing/PrivateRoute";
import AddCourse from "./components/profile-forms/AddCourse";
import Quizzes from "./components/dashboard/Quizzes";
import StartQuiz from "./components/dashboard/StartQuiz";
import StartCourse from "./components/dashboard/StartCourse";
import Statistics from "./components/dashboard/Statistics";

//Redux

import { Provider } from "react-redux";
import store from "./store";
import { loadStudent } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import AddedCourses from "./components/dashboard/AddedCourses";
import EditedCourses from "./components/dashboard/EditedCourses";
import DescriptionOfCourse from "./components/dashboard/DescriptionOfCourse";
import AddAssignment from "./components/profile-forms/AddAssignment";
import Assignments from "./components/dashboard/Assignments";
import StartAssignment from "./components/dashboard/StartAssignment";
import MyCourses from "./components/dashboard/MyCourses";
import QuizResults from "./components/dashboard/QuizResults";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadStudent(null));
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/student/dashboard"
                component={StudentDashboard}
              />
              <PrivateRoute exact path="/add-courses" component={AddCourse} />
              <PrivateRoute exact path="/add-quizz" component={AddQuizz} />
              <PrivateRoute
                exact
                path="/add-assignment"
                component={AddAssignment}
              />
              <PrivateRoute
                exact
                path="/student/assignments-list"
                component={Assignments}
              />
              <PrivateRoute
                exact
                path="/get-statistics"
                component={Statistics}
              />
              <PrivateRoute
                exact
                path="/added-courses"
                component={AddedCourses}
              />
              <PrivateRoute exact path="/student/quizzes" component={Quizzes} />
              <PrivateRoute
                exact
                path="/student/start-quiz/:id"
                component={StartQuiz}
              />
              <PrivateRoute
                exact
                path="/student/describe-course/:id"
                component={DescriptionOfCourse}
              />
              <PrivateRoute
                exact
                path="/student/start-course/:id"
                component={StartCourse}
              />
              <PrivateRoute
                exact
                path="/student/start-assignment/:id"
                component={StartAssignment}
              />
              <PrivateRoute
                exact
                path="/add-courses/:id"
                component={EditedCourses}
              />
              <PrivateRoute
                exact
                path="/student/my-courses"
                component={MyCourses}
              />
              <PrivateRoute
                exact
                path="/student/quiz-result"
                component={QuizResults}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
