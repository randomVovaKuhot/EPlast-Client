import React, { useState, useEffect } from 'react';

import axios from 'axios';
import EventCard from './EventCard/EventCard';

const classes = require('./ActionEvent.module.css');

interface Props {
    categoryId?: string;
}

const SortedEvents = ({ categoryId = "" }: Props) => {

    const [actions, setActions] = useState([]);

    const updateActions = async () => {
        axios.get(`https://eplastwebapi.azurewebsites.net/api/types/${categoryId}/categories/${categoryId}/events`)
        .then(res => {
        const arrayActions = res.data;
        setActions(arrayActions);
    })
    };
    
    // const filterActions = (arr: any) => {
    //     if (categoryId && arr) {
    //        setActions(arr.data.filter((item: any) => item.postId === categoryId));   
    //     }
    // }

    useEffect(() => {
        updateActions();
    }, [categoryId]);

    const renderAction = (arr: any) => {
        if (arr) {
            return arr.map((item: any) => <EventCard item={item} key={item.id} />);
        }
        return null;
    };

    const actionCard = renderAction(actions);
    return (
        <div className={classes.background}>
            <div className={classes.actionsWrapper}>{actionCard}</div>
        </div>
    )
}
export default SortedEvents;