import React from 'react';

import {Header, Content, Total} from './components';
import {courseParts, CourseNormalPart, CourseProjectPart, CourseSubmissionPart, CourseSpecialPart} from './course-data'

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

// ** enter commit sha of your repository in here **
export const commitSHA = 'f386a77';

export const App = () => {
    const courseName = "Half Stack application development";
    const nrOfExercise: number = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)

    return (
        <div>
            <Header name={courseName}/>
            <Content courseParts={courseParts}/>
            <Total nrOfExercise={nrOfExercise}/>
        </div>
    )

};

