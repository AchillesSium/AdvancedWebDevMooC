
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import CodeIcon from '@material-ui/icons/Code';
import { Box, Container, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography} from '@material-ui/core'


const CourseHeader = ({ course, type }) => {
  let isDevIcon = false;
  if(type === 'code'){
    isDevIcon = false;
  }else{
    isDevIcon = true
  }
  return (
    
  <>
  <br />
    <Typography variant="h5" component="h5"> 
      {isDevIcon ? <DeveloperModeIcon /> : <CodeIcon />}{course}
    </Typography>
  </>
  )
}


const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part =>
        <Part key={part.id} part={part} />)
      }
    </>
  )
}


const Part = ({ part }) =>
  <TableBody>
    <TableRow>
      <TableCell>
        {part.name}
      </TableCell>
      <TableCell align="right">
        {part.exercises}
      </TableCell>
    </TableRow>
  </TableBody>


const Total = ({ parts }) => {
  const total = parts.reduce((acc, cur) => acc + cur.exercises, 0)
  return (
    
      <TableFooter>
        <TableRow>
          <TableCell>Exercises Total</TableCell>
          <TableCell align="right">{total}</TableCell>
        </TableRow>
      </TableFooter>
   
    
  )
}

export const Course = ({ course }) => {
  return (
    <>
      <CourseHeader course={course.name} type={course.type}/>
      {/* <Content parts={course.parts} />
      <Total parts={course.parts}
      /> */}
      <TableContainer component={Paper} >
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>Part</TableCell>
              <TableCell align="right"> Exercises</TableCell>
            </TableRow>
          </TableHead>
          <Content parts={course.parts} />
          <Total parts={course.parts}/>
        </Table>
      </TableContainer>
    </>
  )
}

