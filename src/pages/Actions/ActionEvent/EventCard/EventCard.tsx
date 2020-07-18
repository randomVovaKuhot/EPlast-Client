import React from 'react';
import { useHistory } from "react-router-dom";
import { Card} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const classes = require('./EventCard.module.css');

interface CardProps {
    eventName: string;
    imgUrl: string;
    userId: string;
    eventId: string;
}

interface Props {
    item: CardProps;
}

const EventCard = ({
    item: { eventName, eventId},
}: Props) => {
    const { Meta } = Card;
    const history = useHistory();

    return (
        <div className={classes.background}>
            <div className={classes.actionsWrapper}>
                <Card
                className={classes.cardStyles}
                onClick={()=> history.push(`/Events/${eventId}/details`)}
                    cover={
                        <img
                            alt="example"
                            src="https://www.nicepng.com/png/detail/75-750003_handshake-comments-shaking-hands-icon.png"
                        />
                    }
                    actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                    ]}
                >
                    <Meta
                        title={eventName}
                        className={classes.titleText}
                    />
                </Card>
            </div>
        </div>
    )
}
export default EventCard;