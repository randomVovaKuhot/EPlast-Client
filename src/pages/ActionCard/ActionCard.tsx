import React from 'react';
import { Card } from 'antd';

import { useHistory } from "react-router-dom";

const classes = require('./ActionCard.module.css');

interface CardProps {
    eventTypeName: string;
    name: string;
    imgUrl?: string;
    userId?: string;
    id: string;
    eventCategoryName?: string;
    eventCategoryId?: string;
}

interface Props {
    item: CardProps;
}

const ActionCard = ({
    item: { eventTypeName, id , eventCategoryName, eventCategoryId},
}: Props) => {

    const { Meta } = Card;
    const history = useHistory();

    const historyPush = async () => {
        await eventTypeName;
        await eventCategoryName;

        if(await eventTypeName){
            onClick = history.push(`/categories/${id}`);
        }
        if(await eventCategoryName){
            onClick = history.push(`/categories/${eventCategoryId}/events/${eventCategoryId}`)
        }
    }
    

    return (
        <div>
            <Card
                hoverable
                className={classes.cardStyles}
                cover={<img alt="example" src="https://eplast.azurewebsites.net/images/Events/ActionLogo.png" />}
                onClick={() => historyPush()}  
            >
                <Meta title={eventTypeName||eventCategoryName} className={classes.titleText}/>
            </Card>
        </div>
    )
}
export default ActionCard;



