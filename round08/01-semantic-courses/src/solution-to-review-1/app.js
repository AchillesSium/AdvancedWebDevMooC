
import { Course } from './components';
import courses from './courses-data';
import 'semantic-ui-css/semantic.min.css';
import { Header, Container, Divider } from 'semantic-ui-react'

// ** ENTER COMMIT SHA OF YOUR REPO IN HERE **
export const commitSHA = '-9256480-';

export const App = () => {

  return (
    <Container>
      <br></br>
      <Header as='h1' disabled>Web development curriculum</Header>
      <Divider />
      {courses.map(course =>
        <Course key={course.id} course={course} />
      )}
    </Container >
  )
}
