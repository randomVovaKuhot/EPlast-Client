import React, { useState, useEffect } from 'react';
import { Card, Space, Spin } from 'antd';
import classes from './Approvers.module.css';
import AvatarAndProgress from '../../../../src/pages/userPage/personalData/AvatarAndProgress';
//import UserPhoto1 from "../../../../assets/images/avatarUser.jpg"
//import UserPhoto2 from "../../../../assets/images/avatarUser(2).jpg"
import NoAvatar from "../../../assets/images/no-avatar.png";
import { Data, ApproversData } from '../Interface/Interface';
import jwt from 'jwt-decode';
import AuthStore from '../../../stores/Auth';
import userApi from '../../../api/UserApi';

const Assignments = () => {
 const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ApproversData>();
  const fetchData = async () => {
    const token = AuthStore.getToken() as string;
    const user : any = jwt(token);
    await userApi.getById(user.nameid).then(response =>{
      setData(response.data);
      setLoading(true);
      
    })
  };
      
      useEffect(() => {
        fetchData();
      }, []);
  const { Meta } = Card;

  

  return loading === false ? (
    <div className={classes.spaceWrapper}>
      <Space className={classes.loader} size="large">
        <Spin size="large" />
      </Space>
    </div>
    
  ) : (
    <div className={classes.wrapper}>
        {console.log(data)}
      <div className={classes.displayFlex}>
      <AvatarAndProgress imageUrl={data?.user.imagePath} time={data?.timeToJoinPlast}/>
      <div className={classes.content}>
        <h1>Василь Хартманє</h1>
        <hr/>
        <h1>Поручення дійсних членів</h1>
        <div className={classes.displayFlex}>
        <Card
                hoverable
                className={classes.cardStyles}
                cover={<img alt="example" src={NoAvatar} className={classes.avatar}/>}
            >
                <Meta title='Ira Zavushchak' className={classes.titleText}/>
                <Meta title='29-04-2020' className={classes.titleText}/>
            </Card>
            <Card
                hoverable
                className={classes.cardStyles}
                cover={<img alt="example" src={NoAvatar} className={classes.avatar}/>}
            >
                <Meta title='Vova Vern' className={classes.titleText}/>
                <Meta title='06-05-2020' className={classes.titleText}/>
            </Card>
        </div>
        <h1>Поручення куреня УСП/УПС</h1>
        <div className={classes.displayFlex}>
        <Card
                hoverable
                className={classes.cardStyles}
                cover={<img alt="example" src={NoAvatar} className={classes.avatar}/>}
            >
                <Meta title='Відсутня' className={classes.titleText}/>
            </Card>
            
        </div>
        <h1>Поручення Голови осередку/<br/>Осередкового УСП/УПС</h1>
        <div className={classes.displayFlex}>
        <Card
                hoverable
                className={classes.cardStyles}
                cover={<img alt="example" src={NoAvatar} className={classes.avatar}/>}
            >
                <Meta title='Відсутня' className={classes.titleText}/>
            </Card>
            
        </div>
      </div>
      </div>
    </div>
  );
}
export default Assignments;