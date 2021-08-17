
import Course from './components'
import courses from './courses-data'

// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = 'e9837b6';
// ------------------------------------------------------------ //



export const App = () => {

  return (
    <div>
      {courses.map(course => 
          <Course key={course.id} course={course}/>
      )}
    </div>
  )

}

