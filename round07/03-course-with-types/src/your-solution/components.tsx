
import React from 'react';
import {CoursePart} from './course-data';


export const Header = ({description}: {description: string}) => {

  return (
    <div><h1>{description}</h1></div>
  );

};


export const Content = ({courseParts}: {courseParts: CoursePart[]}) => {
  //console.log(courseParts[0])
  return (
  <div>
    {courseParts.map((coursepart) => <Course coursePart={coursepart} key={coursepart.name}/>)}
  </div>
  );

};

const Course = ({coursePart}:{coursePart: CoursePart}) => {
  console.log(coursePart)
  if(coursePart.type === 'normal'){
    return(
        <p>
          <b>{coursePart.name} {coursePart.exerciseCount}</b><br/>
          <i>{coursePart.description}</i>
        </p>
    );
  }else if(coursePart.type === 'groupProject'){
    return(
      <p>
        <b>{coursePart.name} {coursePart.exerciseCount}</b><br/>
        <i>project excercises {coursePart.groupProjectCount}</i>
      </p>
    )
  }else if(coursePart.type === 'submission'){
    return(
      <p>
        <b>{coursePart.name} {coursePart.exerciseCount}</b><br/>
        <i>{coursePart.description}</i><br/>
        submit to {coursePart.exerciseSubmissionLink}
      </p>
    );
  }else if(coursePart.type === 'special'){
    return( 
      <p>
        <b>{coursePart.name} {coursePart.exerciseCount}</b><br/>
        <i>{coursePart.description}</i><br/>
        required skills: {coursePart.requirements.join(', ')}
      </p>
    );
  }else{
    return( 
      <p>
        <b>{coursePart.name} {coursePart.exerciseCount}</b>
      </p>
    );
  }
};



export const Total = ({courseParts}: {courseParts:  Array<{name: string, exerciseCount: number}>}) => {

  return (
    <div>      
      <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );

};
