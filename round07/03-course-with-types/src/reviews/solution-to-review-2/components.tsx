import React from 'react';
import {CoursePart} from "./course-data";


export const Header = ({name}: { name: string }) => {

    return (
        <div><h1>{name}</h1></div>
    );

};

interface CoursePartsInterface {
    courseParts: CoursePart[];
}

interface CoursePartInterface {
    coursePart: CoursePart;
}

const Part = ({coursePart}: CoursePartInterface) => {
    const elements = [
        <strong key={coursePart.name}><p>{coursePart.name} {coursePart.exerciseCount}</p></strong>
    ]
    switch (coursePart.type) {
        case "normal":
            elements.push(<i key={coursePart.name + "1"}>{coursePart.description}</i>)
            break;
        case "groupProject":
            elements.push(<p key={coursePart.name + "1"}>project exercises {coursePart.groupProjectCount}</p>)
            break;
        case "submission":
            elements.push(<i key={coursePart.name + "1"}>{coursePart.description}</i>)
            elements.push(<p key={coursePart.name + "2"}>submit to {coursePart.exerciseSubmissionLink}</p>)
            break;
        case "special":
            elements.push(<i key={coursePart.name + "1"}>{coursePart.description}</i>)
            elements.push(<p key={coursePart.name + "2"}>required skills: {coursePart.requirements.join(", ")}</p>)
            break;
        default:
            break;
    }

    return <div>{elements}</div>
}

export const Content = ({courseParts}: CoursePartsInterface) => {
    return (
        <div>
            {courseParts.map(coursePart => {
                return (
                    <div key={coursePart.name}>
                        <Part key={coursePart.name} coursePart={coursePart}/>
                    </div>
                )
            })}
        </div>
    );
}

export const Total = ({nrOfExercise}: { nrOfExercise: number }) => {

    return (
        <p>
            Number of exercises{" "}
            {nrOfExercise}
        </p>
    );

};
