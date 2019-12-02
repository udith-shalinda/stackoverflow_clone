import React from 'react'
import { Card } from '@material-ui/core'

export const CommentPreview=(props)=>{

    return(
        <div>
            <Card>
                <p>{props.comment+" - "+props.userName}</p>
            </Card>
        </div>
    )    
}