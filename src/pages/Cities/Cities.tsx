import React, {useEffect, useState} from 'react';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {Card, Layout} from 'antd';
import Add from '../../assets/images/add.png';
import City from '../../assets/images/default_city_image.jpg';
import {getAllCities, getLogo} from '../../api/citiesApi';
import classes from './Cities.module.css';

interface CardProps {
    id: string;
    name: string;
    logo: string;
}

const Cities = () => {
    const history = useHistory();
    const {url} = useRouteMatch();

    const [cities, setCities] = useState([]);

    const getCities = async () => {
        const response = await getAllCities();
        for await (const city of response.data) {
            if (city.logo === null) {
                city.logo = City;
            } else {
                const logo = await getLogo(city.logo);
                if (logo) {
                    city.logo = logo.data;
                }
            }
        }
        setCities(response.data);
    };

    useEffect(() => {
        getCities();
    }, []);

    return (
        <Layout.Content>
            <h1 className={classes.mainTitle}>Станиці</h1>
            <div className={classes.wrapper}>
                <Card hoverable
                      className={classes.cardStyles}
                      cover={<img src={Add} alt="Add"/>}
                      onClick={() => history.push(`${url}/new`)}>
                    <Card.Meta className={classes.titleText} title="Створити нову станицю"/>
                </Card>

                {cities.map((city: CardProps) => (
                    <Card
                        key={city.id}
                        hoverable
                        className={classes.cardStyles}
                        cover={<img src={city.logo !== null ? city.logo : City} alt="City"
                                    style={{height: '154.45px'}}/>}
                        onClick={() => history.push(`${url}/${city.id}`)}
                    >
                        <Card.Meta title={city.name} className={classes.titleText}/>
                    </Card>
                ))}

            </div>
        </Layout.Content>
    );
};
export default Cities;
