import React, { useEffect, useState } from 'react';
import userApi from '../../../api/UserApi';
import AvatarAndProgress from '../personalData/AvatarAndProgress';
import { useParams, useHistory } from 'react-router-dom';
import { Data } from '../Interface/Interface';
import notificationLogic from '../../../components/Notifications/Notification';
import { Card, Form, Input } from 'antd';
import './Secretaries.less'
import {UserCitySecretaryTable} from './UserCitySecretaryTable';
import { UserRegionSecretaryTable } from './UserRegionSecretaryTable';
import { UserClubSecretaryTable } from './UserClubSecretaryTable';
import{ tryAgain } from "../../../components/Notifications/Messages";


const tabList = [
    {
        key: '1',
        tab: 'Діловодства округу',
    },
    {
        key: '2',
        tab: 'Діловодства станиці',
    },
    {
        key: '3',
        tab: 'Діловодства куреня',
    },
];



export const Secretaries = () => {
    const { userId } = useParams();
    
    const [noTitleKey, setKey] = useState<string>('1');
    const [data, setData] = useState<Data>();

    const fetchData = async () => {
        await userApi.getById(userId).then(response => {
            setData(response.data);
        }).catch(() => { notificationLogic('error', tryAgain) })
    };

    useEffect(() => {
        fetchData();
    }, [userId]);





    const onTabChange =  (key:string) => {
        console.log(noTitleKey)
        setKey(key);
       
       console.log(noTitleKey)
       
     };




     const contentListNoTitle: { [key: string]: any } = {
        1: <div key='1'><UserRegionSecretaryTable UserId={userId}/></div>,
        2: <div key='2'><UserCitySecretaryTable UserId={userId}/></div>,
        3: <div key='3'><UserClubSecretaryTable UserId={userId}/></div>
      };


    return (
        <>
            
            <p></p>
            <div className="container">
                <Form name="basic" className="formContainer">

                    <div className="avatarWrapper">
                        <AvatarAndProgress imageUrl={data?.user.imagePath} time={data?.timeToJoinPlast} firstName={data?.user.firstName} lastName={data?.user.lastName} isUserPlastun={data?.isUserPlastun} pseudo={data?.user.pseudo} city={data?.user.city} club={data?.user.club} />
                    </div>

                    <div className="allFields">
                        <div className="rowBlock">
                            <Card
                                style={{ width: '100%' }}
                                tabList={tabList}
                                activeTabKey={noTitleKey}

                                onTabChange={key => {
                                    onTabChange(key);

                                }}
                            >
                                {contentListNoTitle[noTitleKey]}
                            </Card>

                        </div>
                    </div>
                </Form>
            </div>
        </>
    )

}

export default Secretaries;