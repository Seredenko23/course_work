import React, { PureComponent} from 'react';
import './wrapper.css'

class Wrapper extends PureComponent {
    render() {
        return (
            <div className={'wrapper'}>
                {this.props.children}
            </div>
        );
    }
}

export default Wrapper;