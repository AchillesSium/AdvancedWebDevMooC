import { Header, Container, Table, Icon } from 'semantic-ui-react'

const CourseHeader = ({ course }) =>
<Header as='h3'>
  <Icon name='student'/>
  {course}
</Header>


const Content = ({ parts }) => {
  return (
    <Table.Body>
      {parts.map(part =>
        <Part key={part.id} part={part} />)
      }
    </Table.Body>
  )
}


const Part = ({ part }) =>
  <Table.Row>
    <Table.Cell>{part.name}</Table.Cell>
    <Table.Cell>{part.exercises}</Table.Cell>
  </Table.Row>

const Total = ({ parts }) => {
  const total = parts.reduce((acc, cur) => acc + cur.exercises, 0)
  return (
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell>Exercises total</Table.HeaderCell>
        <Table.HeaderCell>{total}</Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  )
}

export const Course = ({ course }) => {
  return (
    <Container>
      <CourseHeader course={course.name} />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Part</Table.HeaderCell>
            <Table.HeaderCell>Exercises</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </Table>
      <br></br>
    </Container>
  )
}

