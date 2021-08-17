
import { Header, Table, Icon } from "semantic-ui-react";

const CourseHeader = ({ course }) => {
  
  if (course === "Half Stack application development") {
    return (
      <Header as="h2" className="ui center aligned header">
        <Icon className="code icon" />
        {course}
      </Header>
    )
  }
  else {
    return (
      <Header as="h2" className="ui center aligned header">
        <Icon className="file code icon" />
        {course}
      </Header>
    )
  }
}


const Content = ({ parts }) => {
  return (
    <Table compact celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            Part
          </Table.HeaderCell>
          <Table.HeaderCell>
            Exercises
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {parts.map(part =>
        <Part key={part.id} part={part} />)
      }
      <Total parts={parts} />
      </Table.Body>
    </Table>
  )
}


const Part = ({ part }) =>

    <Table.Row>
      <Table.Cell>
        {part.name}
      </Table.Cell>
      <Table.Cell>
        {part.exercises}
      </Table.Cell>
    </Table.Row>


const Total = ({ parts }) => {
  const total = parts.reduce((acc, cur) => acc + cur.exercises, 0)
  return (
    <Table.Row>
      <Table.Cell>
        Exercises total
      </Table.Cell>
      <Table.Cell>
        {total}
      </Table.Cell>
    </Table.Row>
    // <p>
    //   total of {total} exercises
    // </p>
  )
}

export const Course = ({ course }) => {
  return (
    <>
      <CourseHeader course={course.name} />
      <Content parts={course.parts} />
    </>
  )
}

