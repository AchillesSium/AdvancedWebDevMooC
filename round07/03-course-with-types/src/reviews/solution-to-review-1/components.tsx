import React from 'react';

import { CoursePart } from './course-data'

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const Part = ( { part } : { part: CoursePart }) => {
  switch (part.type) {
    case "normal":
      return  <div>
                <h2>{part.name} {part.exerciseCount}</h2>
                <p> {part.description} </p>
              </div>
    case "submission":
      return  <div>
                <h2>{part.name} {part.exerciseCount}</h2>
                <p> {part.description} </p>
                <p> submit to: {part.exerciseSubmissionLink} </p>
              </div>
    case "groupProject":
      return  <div>
                <h2>{part.name} {part.exerciseCount}</h2>
                <p> project exercises: {part.groupProjectCount} </p>
              </div>
    case "special":
      return   <div>
                <h2>{part.name} {part.exerciseCount}</h2>
                <p> required skills: {part.requirements.join(', ')} </p>
              </div>
    default:
      return assertNever(part);
  }
}

export const Header = ({ name } : {name : string}) => {

  return (
    <h1> {name} </h1>
  );

};


export const Content = ({ courseParts } : {courseParts : CoursePart[]}) => {
  return (
    <div>{courseParts.map(coursePart => <Part key={coursePart.name} part={coursePart}></Part>)}</div>
  );
};



export const Total = ({ courseParts } : {courseParts : CoursePart[]}) => {
  return (
    <p> Number of exercises: {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}</p>
  );
};
