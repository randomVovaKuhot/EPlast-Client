import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Avatar, Card, Layout} from 'antd';
import {UserOutlined, SettingOutlined, CloseOutlined} from '@ant-design/icons';
import {getAllFollowers} from "../../api/citiesApi";
import classes from './City.module.css';

interface MemberProps {
    id: string;
    user: {
        firstName: string;
        lastName: string;
    }
}

const CityFollowers = () => {
    const {id} = useParams();

    const [followers, setFollowers] = useState([]);

    const getFollowers = async () => {
        const response = await getAllFollowers(id);
        setFollowers(response.data);
    };

    useEffect(() => {
        getFollowers();
    }, []);

    return (
        <Layout.Content>
            <h1 className={classes.mainTitle}>Прихильники станиці</h1>
            <div className={classes.wrapper}>
                {followers.map((follower: MemberProps) => (
                    <Card
                        key={follower.id}
                        className={classes.detailsCard}
                        actions={[
                            <SettingOutlined key="setting"/>,
                            <CloseOutlined key="close"/>,
                        ]}
                    >
                        <Avatar size={86} icon={<UserOutlined/>} className={classes.detailsIcon}/>
                        <Card.Meta className={classes.detailsMeta}
                                   title={`${follower.user.firstName} ${follower.user.lastName}`}/>
                    </Card>
                ))}
            </div>
        </Layout.Content>
    );
};
export default CityFollowers;
