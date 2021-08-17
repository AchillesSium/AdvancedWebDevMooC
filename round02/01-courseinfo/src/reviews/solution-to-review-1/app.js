import Course from './components.js'
import courses from './courses-data.js'
// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = 'ff48cfe';
// ------------------------------------------------------------ //


export const App = () => {
  return courses.map(course =>  <Course key = {course.id} course={course} />)
}
