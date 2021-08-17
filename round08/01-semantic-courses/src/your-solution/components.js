
import { Header, Table, Icon } from "semantic-ui-react"

const CourseHeader = ({ course, type }) =>
<Header size="medium">
<Icon name={type} size="large"/>
{course}
</Header>


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
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell>
          <b>Exercises Total</b>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <b>{total}</b>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  )
}

export const Course = ({ course }) => {
  return (
    <>
      <CourseHeader course={course.name} type={course.type}/>
      <Table celled fixed singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Part</Table.HeaderCell>
            <Table.HeaderCell>Exercises</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </Table>
    </>
  )
}

