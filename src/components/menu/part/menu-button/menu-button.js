import React, {Component} from 'react';
import './menu-button.css'

class MenuButton extends Component {
    render() {
        let {currentMode, mode} = this.props
        return (
            <button className={`menu-button ${currentMode === mode ? 'active' : ''}`}
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