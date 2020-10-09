import React, {PureComponent} from 'react';
import './logger.css'

class Logger extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {isOpened: false}
    }

    clickHandler = () => {
        this.setState({isOpened: !this.state.isOpened})
    }

    render() {
        console.log(this.props.log, 'rerender')
        return (
            <div className={'logger'}>
                <div className={'logger-title'} onClick={this.clickHandler}>
                    <span>Log</span>
                    <span className={`arrow ${this.state.isOpened ? 'rotated' : ''}`}> ▼ </span>
                </div>
                {this.state.isOpened && this.props.log.map(el => {
                        return <div className={'logger-element'}>
                            {Object.entries(el).map((param) => {
                                return <span className={'logger-info'}>{`${param[0]}: ${param[1]}`} </span>
                            })}
                        </div>
                    })
                }
            </div>
        );
    }
}

export default Logger;