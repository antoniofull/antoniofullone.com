import React from 'react';

/*  

import WorkNavigation from './WorkNavigation';
import Project from './Project';
import Icons from './Icons';
import Code from './Code';
import Design from './Design';
<WorkNavigation />
        <Project />
        <Code />
        <Design />
        <Icons />
*/

import { workTmp } from '../../data/index';
import Temp from './Temp';

const Work = () => (
  <React.Fragment>
    <Temp companies={workTmp} />
  </React.Fragment>
);

export default Work;
