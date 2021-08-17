import React from 'react';
import { courseParts } from  './course-data'

import { Header, Content, Total } from './components';


// ** enter commit sha of your repository in here **
export const commitSHA = '89d7f96';


export const App = () => {
  const courseName = "Half Stack application development";


  return (
    <div>
      <Header name={ courseName } />
      <Content courseParts={ courseParts }/>
      <Total courseParts={ courseParts }/>
     </div>
  )

};

