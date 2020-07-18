import React, { useState, useEffect } from 'react';

import axios from 'axios';
import ActionCard from '../ActionCard/ActionCard';

const classes = require('./Actions.module.css');

interface Props {
    typeId?: string;
}

const SortedCategories = ({ typeId = ''}: Props) => {

    const [actions, setActions] = useState([]);

    const updateActions = async () => {
        axios.get(`https://eplastwebapi.azurewebsites.net/api/Events/types/${typeId}/categories`)
        .then(res => {
        const arrayActions = res.data;
        setActions(arrayActions);
    })
    };
    
    // const filterActions = (arr: any) => {
    //     if (typeId && arr) {
    //        setActions(arr.data.filter((item: any) => item.postId === typeId));   
    //     }
    // }

    useEffect(() => {
        updateActions();
    }, []);

    const renderAction = (arr: any) => {
        if (arr) {
            return arr.map((item: any) => <ActionCard item={item} key={item.id} />);
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
export default SortedCategories;