import React from 'react'
import { Card } from '@material-ui/core'

import './Question.css'
import QuestionProfileDetails from './QuestionProfileDetails';

const QuestionPreview =()=>{
    return(
        <div>
            <Card className="card">
                <div className="question">
                    <div className="content votes">
                        <div >
                            <p>0</p>
                            <p>votes</p>
                        </div>
                        <div>
                            <p>0</p>
                            <p>answers</p>
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

export default QuestionPreview;