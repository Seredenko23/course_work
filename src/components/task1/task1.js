import React, {Component} from 'react';
import Menu from "../menu/Menu";
import Graph from "../graph/Graph";
import Wrapper from "../wrapper/wrapper";
import {closestToZero, findSolutionByIteration, findSolutionByNewton, findSolutionByDichotomy} from "../../service/task1";
import './task1.css'

class Task1 extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
            max: '5',
            min: '0',
            step: '0.01',
            dot: '3.69',
            solution: 3.69
        }
    }

    buttons = [
            {title: 'Метод итерацій', handler: () => {this.setState({solution: closestToZero(this.state.data)})}},
            {title: 'Метод дихотомії', handler: () => {this.setState({solution: findSolutionByDichotomy({min: +this.state.min, max: +this.state.max}, 0.01)})}},
            {title: 'Метод Ньютона', handler: () => {findSolutionByNewton({min: +this.state.min, max: +this.state.max}, +this.state.step)
                    .then((result) => {
                        console.log(result)
                        this.setState({solution: result})
                    })}}
        ]

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
                    <Menu buttons={this.buttons}/>

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
                                   placeholder={'5'}
                                   onChange={this.changeHandle}
                            />
                        </div>
                        <div className={'interval-wrapper'}>
                            <label htmlFor={'step'}>Step</label>
                            <input className={'intervals-input'}
                                   name={'step'}
                                   value={this.state.step}
                                   placeholder={'0.01'}
                                   onChange={this.changeHandle}
                            />
                        </div>
                        <button type={'submit'}>Створити</button>
                    </form >

                    <div className={'solution'}>
                        <span>X = </span>
                        <span>{this.state.solution}</span>
                    </div>

                    <Graph data={this.state.data} dot={this.state.dot}/>
                </Wrapper>
            </div>
        );
    }
}

export default Task1;