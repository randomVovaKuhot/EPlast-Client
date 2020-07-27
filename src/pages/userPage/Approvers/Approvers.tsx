import React, { useState, useEffect,useCallback } from 'react';
import { Card, Space, Spin, Empty, Button } from 'antd';
import classes from './Approvers.module.css';
import AvatarAndProgress from '../../../../src/pages/userPage/personalData/AvatarAndProgress';
//import UserPhoto1 from "../../../../assets/images/avatarUser.jpg"
//import UserPhoto2 from "../../../../assets/images/avatarUser(2).jpg"
import NoAvatar from "../../../assets/images/no-avatar.png";
import { Data, ApproversData, ConfirmedUser } from '../Interface/Interface';
import jwt from 'jwt-decode';
import AuthStore from '../../../stores/Auth';
import userApi from '../../../api/UserApi';
import { Link } from 'react-router-dom';

const Assignments = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ApproversData>();
  const fetchData = async () => {
    const token = AuthStore.getToken() as string;
    const user : any = jwt(token);
    await userApi.getApprovers("ed26f626-5d97-4ca7-9890-fe4caa7d9446",user.nameid).then(response =>{
      setData(response.data);
      setLoading(true);
    })
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleClick=async (event:number)=>{
    console.log(event);
    await userApi.deleteApprove(event);
  }
  const approveClick=async (userId:string, isClubAdmin:boolean=false, isCityAdmin:boolean=false)=>{
    console.log("userId:"+userId+"/isClubAdmin:"+isClubAdmin+"/isCityAdmin:"+isCityAdmin);
    await userApi.approveUser(userId,isClubAdmin,isCityAdmin);
  }

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
      <h1>{data?.user.firstName}{data?.user.lastName}</h1>
        <hr/>
        <h1>Поручення дійсних членів</h1>
        <div className={classes.displayFlex}>
          {console.log(data?.currentUserId)}
          
          {data?.confirmedUsers.map(p=>
          {if(p.approver.userID==data?.currentUserId){
                return (

                      <div key={p.id}>
                        {console.log(p.approver.userID)}
                        <Card
                          key={p.id}
                          hoverable
                          className={classes.cardStyles}
                          cover={<img alt="example"  src={p.approver.user.imagePath} className={classes.avatar}/>}
                        >
                          <Meta title={p.approver.user.firstName+" "+p.approver.user.lastName} className={classes.titleText}/>
                          <Meta title={p.confirmDate} className={classes.titleText}/>
                          <button onClick={()=>handleClick(p.id)} value={p.id}>
                            видалити
                          </button>
                        </Card>
                      </div>
                      )
                }
                else{
                  return (

                    <div key={p.id}>
                      {console.log(p.approver.userID)}
                      <Card
                        key={p.id}
                        hoverable
                        className={classes.cardStyles}
                        cover={<img alt="example"  src={p.approver.user.imagePath} className={classes.avatar}/>}
                      >
                        <Meta title={p.approver.user.firstName+" "+p.approver.user.lastName} className={classes.titleText}/>
                        <Meta title={p.confirmDate} className={classes.titleText}/>
                      </Card>
                    </div>
                    )
                }
          }
          )}
          <div>
              {data?.canApprove?(
                <div>
                  <Link to="#" onClick={()=>approveClick(data?.user.id)}>
                      <Card
                      hoverable
                      className={classes.cardStyles}
                      cover={<img alt="example" src={NoAvatar} className={classes.avatar}/>}
                    >
                      <Meta title="Поручитись"/>
                    </Card>
                  </Link>
                </div>
              ):(<div></div>)}
              {/* {data?.confirmedUsers.length==0?(
                <div>
                  <br />
                  <br />
                    На жаль поруки відсутні
                  <br />
                  <br />
                </div>
              ):(Empty)} */}
          </div>
          
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