import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Tooltip } from 'antd';
import { UserDeleteOutlined, TeamOutlined, UserSwitchOutlined, CameraOutlined, IdcardOutlined } from '@ant-design/icons';
import axios from 'axios';

const classes = require('./EventInfo.module.css');

interface Props {
    eventId: string;
}

const SortedEventInfo = ({ eventId = "" }: Props) => {
    const [, setEvent] = useState([]);

    const updateEvents = async () => {
        axios.get(`https://eplastwebapi.azurewebsites.net/api/Events/${eventId}/details`)
            .then(res => {
                const arrayEvents = res.data.event;
                console.log(arrayEvents);
                setEvent(arrayEvents);
            })
    };

    useEffect(() => {
        updateEvents();
    }, []);

    // const getTableData = (event: any) => {
    //     for (const key in event) {
    //         return (
    //              event[key]
                
    //             // eventId: event[eventId],
    //             // eventType: event[eventType],
    //             // eventCategory: event[eventCategory],
    //             // startDate: event[eventDateStart],
    //             // endDate: event[eventDateEnd],
    //             // location: event[eventLocation],
    //             // forWhom: event[forWhom],
    //             // formOfHolding: event[formOfHolding],
    //             // status: event[eventStatus],
    //             // desc: event[description],
    //         )
    //       }
        
    // }
    // getTableData(event)
    const data = [
        {
            key: 'eventType',
            name: 'Тип:',
            desc: 'eventType',
        },
        {
            key: 'eventCategory',
            name: 'Категорія:',
            desc: 'eventCategory',

        },
        {
            key: 'eventDateStart',
            name: 'Дата початку:',
            desc: 'eventDateStart',

        },
        {
            key: 'eventDateEnd',
            name: 'Дата завершення:',
            desc: 'eventDateEnd',

        },
        {
            key: 'eventLocation',
            name: 'Локація:',
            desc: 'eventLocation',

        },
        {
            key: 'forWhom',
            name: 'Призначений для:',
            desc: 'forWhom',

        },
        {
            key: 'formOfHolding',
            name: 'Форма проведення:',
            desc: 'formOfHolding',

        },
        {
            key: 'eventStatus',
            name: 'Статус:',
            desc: 'eventStatus',

        },
        {
            key: 'description',
            name: 'Опис:',
            desc: 'description',
        }
    ];
    const columns = [
        {
            title: 'Назва',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: `111`,
            dataIndex: 'desc',
            key: 'desc',
        }
    ];

    



    return (
        <div className={classes.background}>
            <div className={classes.actionsWrapper}>
                <Row>
                    <Col span={10} push={14}>
                        <img
                            className={classes.imgEvent}
                            alt="example"
                            src="https://www.kindpng.com/picc/m/150-1504140_shaking-hands-png-download-transparent-background-hand-shake.png"
                        />
                        <div className={classes.iconsFlex}>
                            <Tooltip placement="bottom" title="Ваша кандидатура розглядається">
                                <UserSwitchOutlined className={classes.icon} />
                            </Tooltip>
                            <Tooltip placement="bottom" title="Натисніть, щоб відписатись від події">
                                <UserDeleteOutlined className={classes.icon} />
                            </Tooltip>
                            <Tooltip placement="bottom" title="Учасники">
                                <TeamOutlined className={classes.icon} />
                            </Tooltip>
                            <Tooltip placement="bottom" title="Галерея">
                                <CameraOutlined className={classes.icon} />
                            </Tooltip>
                            <Tooltip placement="bottom" title="Адміністратор(-и) події">
                                <IdcardOutlined className={classes.icon} />
                            </Tooltip>
                        </div>
                    </Col>
                    <Col span={14} pull={10}>
                        <Table dataSource = {data} columns={columns}  pagination={false} />
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default SortedEventInfo;