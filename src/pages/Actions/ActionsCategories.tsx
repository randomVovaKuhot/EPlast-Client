import React from 'react';
import { useParams } from 'react-router-dom';
import SortedCategories from './SortedCategories';


const classes = require('./Actions.module.css');

const ActionsCategories = () => {
    const { id } = useParams();

    return (
        <div className={classes.background}>
            <div className={classes.actionsWrapper}>
                <SortedCategories typeId={id} />
            </div>
        </div>
    )
}
export default ActionsCategories;