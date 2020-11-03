import React, {Component} from 'react';
import './Home.css'

class Home extends Component {
    render() {
        return (
            <div className={'home-wrapper'}>
                <p className={'home-title'}>Курсова робота студента 3-В курса</p>
                <p className={'home-title'}>Середенка Владислава Віталійовича</p>
                <p className={'home-title'}>srvladyk555@gmail.com</p>
                <p className={'home-title'}><a href={'cdu.edu.ua'}>cdu.edu.ua</a></p>
            </div>
        );
    }
}

export default Home;