import React from 'react'
import { Card, IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import QuestionProfileDetails from '../QuestionProfileDetails';

import '../Question.css'

const OneQuestion =()=>{
    return(
        <div>
            <Card className="questionCard">
                <div className="question">
                    <div className="content votes">
                        <div >
                            <IconButton>
                                <ThumbUpIcon></ThumbUpIcon>
                            </IconButton>
                            <p>0</p>
                            <IconButton>
                                <ThumbDownIcon></ThumbDownIcon>
                            </IconButton>
                        </div>
                    </div>
                    <div className="content">
                        <h2>sfsfsfsfs sfsfsfsfs ssfsfsfsfsf</h2>
                        <p>sfsf ssgllllllll sflsjslojsojso jsojfjsojf sojsojso jfsojfsofjsofjs o</p>
                        <QuestionProfileDetails/>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default OneQuestion;