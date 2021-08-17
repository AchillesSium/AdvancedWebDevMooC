
// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = 'bdffbc4db392ae7d5b964986469cb260094ad051';
// ------------------------------------------------------------ //



const Header = (coursename) => {
  return (
    <div>
      <h1>
        {coursename.course}
      </h1>
    </div>
  )
}

const Content = (content) => {
  const part1 = content.parts[0]
  const part2 = content.parts[1]
  const part3 = content.parts[2]
  return (
    <div>
      <p>
        <Part part={part1.name} exrcises={part1.exercises} />
      </p>
      <p>
        <Part part={part2.name} exrcises={part2.exercises} />
      </p>
      <p>
        <Part part={part3.name} exrcises={part3.exercises} />
      </p>
    </div>
  )
}

const Part = (content_part) => {
  return (
    <div>
      <p>
        {content_part.part} {content_part.exrcises}
      </p>
    </div>
  )
}

const Total = (total) => {
  const number = total.parts.reduce((total,currentvalue) => total = total+currentvalue.exercises,0);
  return (
    <div>
      <p>
        Number of exercises = {number}
      </p>
    </div>
  )
}

export const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

