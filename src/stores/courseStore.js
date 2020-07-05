import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _courses = [];
class CourseStore extends EventEmitter {
  //In this function, when change occurs in our store we will call the callback provided.
  //This will allow react components to subscribe to our store so they are notified when changes occur.
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  //In this function, it allows our react components to unsubscribe from the store.
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getCourses() {
    return _courses;
  }

  getCourseBySlug(slug) {
    return _courses.find((course) => course.slug === slug);
  }
}

const store = new CourseStore();

//we need to register store with dispatcher so that the store is notified when action occur
//this function will be called anytime an action is dispatched.
Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.CREATE_COURSE:
      _courses.push(action.course); //we changed store by pushing a course to the arrary
      store.emitChange(); // anytime the store changes we need to call emit Change
      //by emiting  a change, any react components that have registerd with the store will notified, so they will know that they need to update UI accordingly
      break;

    case actionTypes.UPDATE_COURSE:
      _courses = _courses.map((course) =>
        course.id === action.course.id ? action.course : course
      );
      store.emitChange();
      break;

    case actionTypes.DELETE_COURSE:
      _courses = _courses.filter((course) => course.id !== action.id);
      store.emitChange();
      break;

    case actionTypes.LOAD_COURSES:
      _courses = action.courses; //In this case, setting private array of courses to action.courses
      store.emitChange();
      break;
    default:
    //nothing to do
  }
});

export default store;
