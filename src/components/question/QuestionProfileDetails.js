import React from 'react'
import { Avatar } from '@material-ui/core';

import './Question.css'

const QuestionProfileDetails =()=>{
    return(
        <div className="profilePart">
            <div className="avatar">
                <Avatar  alt="Remy Sharp" src="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"  />
            </div>
            <div className="profileDetails">
                <p>udith shalinda</p>
                <p>3</p>
            </div>
        </div>
    );
}

export default QuestionProfileDetails;