import React, { useState, useEffect } from 'react';

import EventCard from './EventCard/EventCard';
import http from '../../../api/api';

const classes = require('./ActionEvent.module.css');

interface Props {
    userId?: string;
}

const SortedEvents = ({ userId = "" }: Props) => {

    const [actions, setActions] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);


    const updateActions = async (callback:Function) => {
        const actionsArray = await http.get('comments');
        setActions(actionsArray.data);
        callback(actionsArray);
        setLoading(false);
    };
    
    const filterActions = (arr: any) => {
        if (userId && arr) {
           setActions(arr.data.filter((item: any) => item.postId === 1));   
        }
        setLoading(false);
    }

    useEffect(() => {
        updateActions(filterActions);
    }, [userId]);

    const renderAction = (arr: any) => {
        if (arr) {
            return arr.map((item: any) => <EventCard item={item} key={item.id} />);
        }
        return null;
    };

    const actionCard = renderAction(actions);
    if (loading) return <h1 className="loading">Loading...</h1>;
    return (
        <div className={classes.background}>
            <h1 className={classes.mainTitle}>{userId}</h1>
            <div className={classes.actionsWrapper}>{actionCard}</div>
        </div>
    )
}
export default SortedEvents;