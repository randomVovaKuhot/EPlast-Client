import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Avatar, Card, Layout} from 'antd';
import {UserOutlined, SettingOutlined, CloseOutlined} from '@ant-design/icons';
import {getAllMembers} from "../../api/citiesApi";
import classes from './City.module.css';

interface MemberProps {
    id: string;
    user: {
        firstName: string;
        lastName: string;
    }
}

const CityMembers = () => {
    const {id} = useParams();

    const [members, setMembers] = useState([]);

    const getMembers = async () => {
        const response = await getAllMembers(id);
        setMembers(response.data);
    };

    useEffect(() => {
        getMembers();
    }, []);

    return (
        <Layout.Content>
            <h1 className={classes.mainTitle}>Члени станиці</h1>
            <div className={classes.wrapper}>
                {members.map((member: MemberProps) => (
                    <Card
                        key={member.id}
                        className={classes.detailsCard}
                        actions={[
                            <SettingOutlined key="setting"/>,
                            <CloseOutlined key="close"/>,
                        ]}
                    >
                        <Avatar size={86} icon={<UserOutlined/>} className={classes.detailsIcon}/>
                        <Card.Meta className={classes.detailsMeta}
                                   title={`${member.user.firstName} ${member.user.lastName}`}/>
                    </Card>
                ))}
            </div>
        </Layout.Content>
    );
};
export default CityMembers;
