import React, {Component} from 'react';
import './wrapper.css'

class Wrapper extends Component {
    render() {
        return (
            <div className={'wrapper'}>
                {this.props.children}
            </div>
        );
    }
}

export default Wrapper;