import React, {Component} from 'react';
import './menu-button.css'

class MenuButton extends Component {
    render() {
        return (
            <button className={'menu-button'}
                    onClick={this.props.handler}
            >
                <span className={'title'}>
                    {this.props.title}
                </span>
            </button>
        );
    }
}

export default MenuButton;