
import { Course } from './components';
import courses from './courses-data';
import { Header, Divider } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'

// ** ENTER COMMIT SHA OF YOUR REPO IN HERE **
export const commitSHA = '17d0441d';

export const App = () => {

  return (
    <div style={{margin: "auto", width: "50%", padding: "10px"}}>
      <Header as="h1" className="ui center aligned dividing header" >Web development curriculum</Header>
      {courses.map(course =>
        <Course key={course.id} course={course} />
      )}
    </div>
  )
}
