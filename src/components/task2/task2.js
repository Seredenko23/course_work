import React, {PureComponent} from 'react';
import {
    calculateEquation,
    data
} from "../../service/task2";
import Wrapper from "../wrapper/wrapper";
import Menu from "../menu/Menu";
import Logger from "../Logger/logger";
import Graph from "../graph/Graph";
import {getAmountAfterDot} from "../../service/utilities";
import './task2.css'

class Task2 extends PureComponent {
    constructor() {
        super()
        this.state = {
            data: [],
            dataset: JSON.stringify(data[0]),
            max: '15',
            min: '0',
            precision: '0.1',
            solution: {X: 0, Y: 0},
            mode: 'task2'
        }
    }

    buttons = [
        {title: 'Task2', mode: 'task2', handler: () => {},}
    ]

    componentDidMount() {
        let data = calculateEquation({min: 0, max: 15}, JSON.parse(this.state.dataset), +this.state.precision)
        this.setState({data: data.data.filter(el => !isNaN(el.Y) && isFinite(el.Y)), solution: {X: data.correctX, Y: data.correctY}})
    }

    changeHandle = (event) => {
        event.preventDefault()
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        })
    };

    formHandler = (event) => {
        event.preventDefault()
        let data = calculateEquation({min: +this.state.min, max: +this.state.max}, JSON.parse(this.state.dataset), +this.state.precision)
        this.setState({data: data.data.filter(el => !isNaN(el.Y) && isFinite(el.Y)), solution: {X: data.correctX, Y: data.correctY}})
    }

    changeHandler = (event) => {
        event.preventDefault()
        this.setState({dataset: event.target.value})
    }

    render() {
        let dataset = JSON.parse(this.state.dataset)
        return (
            <div>
                <Wrapper>
                    <Menu buttons={this.buttons}
                          currentMode={this.state.mode}
                    />
                    <form className={'intervals'} onSubmit={this.formHandler}>
                        <div className={'interval-wrapper'}>
                            <label htmlFor={'min'}>Min</label>
                            <input className={'intervals-input'}
                                   name={'min'}
                                   value={this.state.min}
                                   placeholder={'0'}
                                   onChange={this.changeHandle}
                            />
                        </div>
                        <div className={'interval-wrapper'}>
                            <label htmlFor={'max'}>Max</label>
                            <input className={'intervals-input'}
                                   name={'max'}
                                   value={this.state.max}
                                   placeholder={'15'}
                                   onChange={this.changeHandle}
                            />
                        </div>
                        <div className={'interval-wrapper'}>
                            <label htmlFor={'precision'}>Precision</label>
                            <input className={'intervals-input'}
                                   name={'precision'}
                                   value={this.state.precision}
                                   placeholder={'0.01'}
                                   onChange={this.changeHandle}
                            />
                        </div>
                        <div className={'interval-wrapper'}>
                            <label htmlFor={'dataset'}>Dataset</label>
                            <select name={"dataset"} value={this.state.dataset} onChange={this.changeHandler}>
                                {data.map((dataset, ind) => {
                                    return (<option key={JSON.stringify(dataset)}
                                                    value={JSON.stringify(dataset)}
                                    >
                                        Set {ind + 1}
                                    </option>)
                                })}
                            </select>
                        </div>
                        <button className={'intervals-button'} type={'submit'}>Створити</button>
                    </form >

                    <div className={'solution'}>
                        <div>
                            <span>Y = </span>
                            <span>{this.state.solution.X}</span>
                        </div>
                        <div className={'solution-box'}>
                            <span>Значення</span>
                            {
                                <>
                                    <span>D = {dataset.d}</span>
                                    <span>B = {dataset.b}</span>
                                    <span>T = {dataset.t}</span>
                                </>
                            }
                        </div>
                    </div>

                    {/*<Logger log={this.state.log}/>*/}

                    <Graph data={this.state.data}
                           dotX={+this.state.solution.X.toFixed(getAmountAfterDot(this.state.precision))}
                           dotY={this.state.solution.Y}
                    />
                </Wrapper>
            </div>
        );
    }
}

export default Task2;