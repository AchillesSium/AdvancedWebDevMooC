
import 'semantic-ui-css/semantic.min.css';
import { Container, Header, Divider } from 'semantic-ui-react'
import { Course } from './components';
import courses from './courses-data';

// ** ENTER COMMIT SHA OF YOUR REPO IN HERE **
export const commitSHA = '2b0300314968417ac974be79665a0db5c00d0de1';

export const App = () => {

  return (
    <Container>
      <Header size='huge'>Web development curriculum</Header>
      <Divider fitted />
      {courses.map(course =>
        <Course key={course.id} course={course} />
      )}
    </Container>
  )
}
