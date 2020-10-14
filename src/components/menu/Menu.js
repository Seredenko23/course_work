import React, {PureComponent} from 'react';
import './Menu.css'
import MenuButton from "./part/menu-button/menu-button";

class Menu extends PureComponent {
    render() {
        return (
            <div className={'main-menu'}>
                {this.props.buttons.map((button) => {
                    return (<MenuButton key={button.title}
                                        title={button.title}
                                        handler={button.handler}
                                        mode={button.mode}
                                        currentMode={this.props.currentMode}
                    />)
                })}
            </div>
        );
    }
}

export default Menu;