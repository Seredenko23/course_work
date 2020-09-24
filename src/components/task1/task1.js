import React, {Component} from 'react';
import Menu from "../menu/Menu";
import Graph from "../graph/Graph";
import Wrapper from "../wrapper/wrapper";
import {closestToZero, findSolutionByIteration} from "../../service/task1";
import './task1.css'

class Task1 extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
            max: '0',
            min: '5',
            step: '0.01',
            dot: '3.69'
        }
    }

    componentDidMount() {
        let data = findSolutionByIteration({min: 0, max: 5}, 0.01)
        this.setState({data: data})
        console.log(data)
        // findSolutionByNewton({min: 0, max: 2}, 0.0001).then(r => console.log(r))
    }

    changeHandle = (event) => {
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        })
    };

    formHandler = (e) => {
        let {min, max, step} = this.state
        e.preventDefault()
        let data = findSolutionByIteration({min: +min, max: +max}, +step)
        let dot = closestToZero(data)
        this.setState({data: data, dot: dot.X})
    }

    render() {
        return (
            <div>
                <Wrapper>
                    <Menu />

                    <form className={'intervals'} onSubmit={this.formHandler}>
                        <div className={'interval-wrapper'}>
                            <label htmlFor={'min'}>Min</label>
                            <input className={'intervals-input'}
                                   name={'min'}
                                   placeholder={'0'}
                                   onChange={this.changeHandle}
                            />
                        </div>
                        <div className={'interval-wrapper'}>
                            <label htmlFor={'max'}>Max</label>
                            <input className={'intervals-input'}
                                   name={'max'}
                                   placeholder={'5'}
                                   onChange={this.changeHandle}
                            />
                        </div>
                        <div className={'interval-wrapper'}>
                            <label htmlFor={'step'}>Step</label>
                            <input className={'intervals-input'}
                                   name={'step'}
                                   placeholder={'0.01'}
                                   onChange={this.changeHandle}
                            />
                        </div>
                        <button type={'submit'}>Створити</button>
                    </form >

                    <Graph data={this.state.data} dot={this.state.dot}/>
                </Wrapper>
            </div>
        );
    }
}

export default Task1;