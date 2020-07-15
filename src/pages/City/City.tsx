import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Avatar, Row, Col, Button, Spin, Layout} from 'antd';
import {UserOutlined, FileTextOutlined, EditOutlined} from '@ant-design/icons';
import moment from "moment";
import {getCityById, getLogo} from "../../api/citiesApi";
import classes from './City.module.css';

interface MemberProps {
    id: string;
    user: {
        firstName: string;
        lastName: string;
    }
}

interface DocumentProps {
    id: string,
    cityDocumentType: {
        name: string;
    }
}

const City = () => {
    const history = useHistory();
    const {id} = useParams();

    const [city, setCity] = useState();
    const [loading, setLoading] = useState(false);

    const getCity = async () => {
        setLoading(true);
        try {
            const response = await getCityById(+id);
            const logo = await getLogo(response.data.logo);
            if (logo) {
                response.data.logo = logo.data;
            }
            setCity(response.data);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getCity();
    }, []);
    return (
        loading ? (<Layout.Content className={classes.spiner}>
            <Spin size="large"/>
        </Layout.Content>) : city && !loading ? (
            <div>
                <Row justify="space-around" gutter={[0, 40]} style={{overflow: 'hidden'}}>
                    <Col flex="0 1 63%" style={{minHeight: '180px', marginLeft: '1.5%', marginRight: '1.5%'}}>
                        <section className={classes.list}>
                            <EditOutlined className={classes.listIcon}
                                          onClick={() => history.push(`/cities/edit/${city.id}`)}/>
                            <h1>{`Станиця ${city.name}`}</h1>
                            <Row gutter={16} justify="space-around" style={{marginTop: '20px', marginBottom: '10px'}}>
                                <Col flex="1" offset={1}>
                                    <div className={classes.mainInfo}>
                                        <img src={city.logo} alt="City"
                                             style={{width: '100%', height: 'auto', maxWidth: '100%'}}/>
                                        <p>
                                            <b>Станичний</b>: {city.head ? `${city.head.user.firstName} ${city.head.user.lastName}` : '-'}
                                        </p>
                                        <p>
                                            <b>{city.head ? `${moment(city.head.startDate).format('YYYY')}` : '-'} - </b>
                                        </p>
                                    </div>
                                </Col>
                                <Col flex="1" offset={1}>
                                    <iframe src={city.iframe} title="map" aria-hidden="false"
                                            className={classes.mainMap}/>
                                    <div className={classes.contactsInfo}>
                                        <b className={classes.contactsName}>Контакти:</b>
                                        <div className={classes.contactsContent}>
                                            <p>{city.email}</p>
                                            <p>{city.cityURL}</p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </section>
                    </Col>
                    <Col flex="0 1 30%" style={{minHeight: '180px', marginLeft: '1.5%', marginRight: '1.5%'}}>
                        <section className={classes.list}>
                            <h1>Члени станиці</h1>
                            <Row
                                justify="space-around"
                                gutter={[0, 16]}
                                style={{
                                    paddingRight: '5px',
                                    paddingLeft: '5px',
                                    overflow: 'hidden',
                                    maxHeight: '70%',
                                    marginTop: '20px',
                                }}
                            >
                                {city.members.length !== 0 ? (city.members.map((member: MemberProps) => (
                                    <Col key={member.id} className={classes.listItem} span={7}>
                                        <Avatar size={64} icon={<UserOutlined/>} className={classes.profileImg}/>
                                        <p>{`${member.user.firstName} ${member.user.lastName}`}</p>
                                    </Col>
                                ))) : (<h2>Ще немає членів станиці</h2>)}
                            </Row>
                            <Button type="primary" className={classes.listButton}
                                    onClick={() => history.push(`/cities/members/${city.id}`)}>
                                Більше
                            </Button>
                        </section>
                    </Col>
                </Row>

                <Row justify="space-around" gutter={[0, 40]} style={{overflow: 'hidden', marginTop: '20px'}}>
                    <Col flex="0 1 30%" style={{minHeight: '180px', marginLeft: '1.5%', marginRight: '1.5%'}}>
                        <section className={classes.list}>
                            <h1>Провід станиці</h1>
                            <Row
                                justify="space-around"
                                gutter={[0, 16]}
                                style={{
                                    paddingRight: '5px',
                                    paddingLeft: '5px',
                                    paddingTop: '20px',
                                    paddingBottom: '20px',
                                    overflow: 'hidden',
                                    maxHeight: '70%',
                                }}
                            >
                                {city.administration.length !== 0 ? (city.administration.map((member: MemberProps) => (
                                    <Col key={member.id} className={classes.listItem} span={7}>
                                        <Avatar size={64} icon={<UserOutlined/>} className={classes.profileImg}/>
                                        <p>{`${member.user.firstName} ${member.user.lastName}`}</p>
                                    </Col>
                                ))) : (<h2>Ще немає діловодів станиці</h2>)}
                            </Row>
                            <Button type="primary" className={classes.listButton}
                                    onClick={() => history.push(`/cities/administration/${city.id}`)}>
                                Деталі
                            </Button>
                        </section>
                    </Col>

                    <Col flex="0 1 30%" style={{minHeight: '180px', marginLeft: '1.5%', marginRight: '1.5%'}}>
                        <section className={classes.list}>
                            <h1>Документообіг станиці</h1>
                            <Row
                                justify="space-around"
                                gutter={[0, 16]}
                                style={{
                                    paddingRight: '5px',
                                    paddingLeft: '5px',
                                    paddingTop: '20px',
                                    paddingBottom: '20px',
                                    overflow: 'hidden',
                                    maxHeight: '70%',
                                }}
                            >
                                {city.documents.length !== 0 ? (city.documents.map((document: DocumentProps) => (
                                    <Col key={document.id} className={classes.listItem} span={7}>
                                        <FileTextOutlined style={{fontSize: '60px'}} className={classes.profileImg}/>
                                        <p>{document.cityDocumentType.name}</p>
                                    </Col>
                                ))) : (<h2>Ще немає документів станиці</h2>)}
                            </Row>
                            <Button type="primary" className={classes.listButton}
                                    onClick={() => history.push(`/cities/documents/${city.id}`)}>
                                Деталі
                            </Button>
                        </section>
                    </Col>

                    <Col flex="0 1 30%" style={{minHeight: '180px', marginLeft: '1.5%', marginRight: '1.5%'}}>
                        <section className={classes.list}>
                            <h1>Прихильники станиці</h1>
                            <Row
                                justify="space-around"
                                gutter={[0, 16]}
                                style={{
                                    paddingRight: '5px',
                                    paddingLeft: '5px',
                                    paddingTop: '20px',
                                    paddingBottom: '20px',
                                    overflow: 'hidden',
                                    maxHeight: '70%',
                                }}
                            >
                                {city.followers.length !== 0 ? (city.followers.map((member: MemberProps) => (
                                    <Col key={member.id} className={classes.listItem} span={7}>
                                        <Avatar size={64} icon={<UserOutlined/>} className={classes.profileImg}/>
                                        <p>{`${member.user.firstName} ${member.user.lastName}`}</p>
                                    </Col>
                                ))) : (<h2>Ще немає прихильників станиці</h2>)}
                            </Row>
                            <Button type="primary" className={classes.listButton}
                                    onClick={() => history.push(`/cities/followers/${city.id}`)}>
                                Більше
                            </Button>
                        </section>
                    </Col>
                </Row>
            </div>
        ) : (<h1>Місто не знайдено</h1>)
    );
};

export default City;
