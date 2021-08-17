const Header = (courseObj) => {
    return (
      <div>
        <h2>
          {courseObj.course.name}
        </h2>
      </div>
    )
  }
  
  const Content = (content) => {
    const contents = content.course.parts
    
    return (
      <div>
        {contents.map( part =>
          <Part key={part.id} part={part.name} exrcises={part.exercises} />
        )}
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
    const number = total.course.parts.reduce((total,currentvalue) => total = total+currentvalue.exercises,0);
    return (
      <div>
        <p>
          <b>total of {number} exercises</b>
        </p>
      </div>
    )
  }
  
  export const Course = ({ course }) => { 
      
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }