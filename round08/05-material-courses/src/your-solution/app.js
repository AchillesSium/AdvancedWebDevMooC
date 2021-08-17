
import { Course } from './components';
import courses from './courses-data';
import { Box, Container, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography} from '@material-ui/core'

// ** ENTER COMMIT SHA OF YOUR REPO IN HERE **
export const commitSHA = 'a662d06c5612a1fa9febec30af7083458d7ded2b';

export const App = () => {

  return (
    <Container>
      
      <Typography variant="h3" component="h3" align="center">
        Web development curriculum
      </Typography>
      <Divider />
      {courses.map(course =>
        <Course key={course.id} course={course} />
      )}
    </Container>
  )
}
