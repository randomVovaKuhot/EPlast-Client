import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ActionCard from '../ActionCard/ActionCard';

const classes = require('./Actions.module.css');

interface Props {
    onClick: Function;
}

const Actions = () => {

    const [actions, setActions] = useState([]);

    const updateActions = async () => {
        axios.get(`http://eplastwebapi.azurewebsites.net/api/Events/types`)
        .then(res => {
        const arrayActions = res.data;
        setActions(arrayActions);
      })
    }

    useEffect(() => {
        updateActions();
    }, []);

    const renderActions = (arr: any) => {
        if (arr) {            
            return arr.map((item: any) => (
                <ActionCard item={item} key={item.id} />
            ));
        } return null;
    };

    const plastActions = renderActions(actions);

    return (
        <div className={classes.background}>
            <div className={classes.actionsWrapper}>{plastActions}</div>
        </div>
    )
}
export default Actions;
