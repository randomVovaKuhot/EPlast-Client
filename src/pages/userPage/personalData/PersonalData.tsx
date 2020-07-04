import React from 'react';
import Menu from '../Menu/Menu';
import styles from './PersonalData.module.css';
import AvatarAndProgress from './AvatarAndProgress';
import UserFields from './UserFields';
import EditUserPage from '../EditUserPage/EditUserPage';
import EditEvent from './EditEvent/EditEvent';
import Assignments from './Assignments/Assignments';

export default function ({
  match: {
    params: { specify },
  },
}: any) {
  return (
    <div className={styles.mainContainer}>
      <Menu url={specify}/>
      {specify === 'main' ? (
        <div className={styles.content}>
          <AvatarAndProgress />
          <UserFields />
        </div>
      ) : specify === 'edit-event' ?(
        <div className={styles.content}>
          <EditEvent />
        </div>
      ) : specify === 'assignments' ?(
        <div className={styles.content}>
          <Assignments />
        </div>
      ) : (
            <div className={styles.content}>
              <EditUserPage />
            </div>
          )}
    </div>
  );
}
