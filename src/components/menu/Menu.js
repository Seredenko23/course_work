import React, {Component} from 'react';
import './Menu.css'
import MenuButton from "./part/menu-button/menu-button";

class Menu extends Component {
    render() {
        return (
            <div className={'main-menu'}>
                <MenuButton title={'Метод итерацій'}/>
                <MenuButton title={'Метод дихотомії'}/>
                <MenuButton title={'Метод Ньютона'}/>
            </div>
        );
    }
}

export default Menu;