
import { Course } from './components'
import { courses } from './courses-data'

// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = 'e24322764f6c578999e0771da8200b9b4b56edba';
// ------------------------------------------------------------ //


export const App = () => {
  
  return (
    <div>
      <h1>Web Development Curriculum</h1>
      {courses.map( course =>
        <Course key={course.id} course={course} />
      )}
    </div>
  )
}