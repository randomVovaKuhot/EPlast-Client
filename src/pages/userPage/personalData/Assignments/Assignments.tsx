import React from 'react';
import { Card } from 'antd';
import classes from './Assignments.module.css';
import AvatarAndProgress from '../AvatarAndProgress';
import UserPhoto1 from "../../../../assets/images/avatarUser.jpg"
import UserPhoto2 from "../../../../assets/images/avatarUser(2).jpg"
import NoAvatar from "../../../../assets/images/no-avatar.png"


const Assignments = () => {
  const { Meta } = Card;

  return (
    <div className={classes.wrapper}>
      <div className={classes.displayFlex}>
      <AvatarAndProgress />
      <div className={classes.content}>
        <h1>Василь Хартманє</h1>
        <hr/>
        <h1>Поручення дійсних членів</h1>
        <div className={classes.displayFlex}>
        <Card
                hoverable
                className={classes.cardStyles}
                cover={<img alt="example" src={UserPhoto1} className={classes.avatar}/>}
            >
                <Meta title='Ira Zavushchak' className={classes.titleText}/>
                <Meta title='29-04-2020' className={classes.titleText}/>
            </Card>
            <Card
                hoverable
                className={classes.cardStyles}
                cover={<img alt="example" src={UserPhoto2} className={classes.avatar}/>}
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