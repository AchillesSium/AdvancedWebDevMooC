import React from 'react'

const Header = props =>
  <h1>
    {props.course}
  </h1>


const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => 
          <Part key={part.name} name={part.name} exercises={part.exercises}/>
      )}
    </div>
  )
}

const Course = ({course}) => {

  const total = course.parts.reduce((s,p) => {
    return s+p.exercises
  }, 0)

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={total}/>
    </div>
  )
}

const Total = ({total}) => {
  return(
    <p>
      Total of {total} exercises
    </p>
  )
}

const Part = props =>
  <p>
    {props.name} {props.exercises}
  </p>

export default Course