{/*commitSHA ff48cfe*/}

const Header = (props) => { return ( <div> <h1>{props.course}</h1> </div>)};
                            //mapping new Parts for Content
const Content = (props) => {const result = props.parts.map(
                            (onePart) =>
                            <Part key={onePart.id}
                            part={onePart.name} exercise={onePart.exercises}/>);
                            return <div>{result}</div>;
                            };

const Total = (props) => { const total =  props.parts.reduce((a, b) => a + b.exercises, 0);
                          return ( <div> <p>Number of exercises {total}</p> </div>)};

const Part = (props) => { return (<div> <p> {props.part} {props.exercise} </p> </div>)};

const Course = ({course}) => {
   return <div>
   <Header course={course.name}/>
   <Content parts={course.parts}/>
   <Total parts={course.parts}/>
   </div>
}

export default Course
