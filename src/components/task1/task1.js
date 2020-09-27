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
            solution: 3.69,
            dichotomy: 8,
            newton: 0.001,
            mode: 'iteration'
        }
    }

    buttons = [
            {title: 'Метод итерацій', handler: () => {this.setState({mode: 'iteration'})}},
            {title: 'Метод дихотомії', handler: () => {this.setState({mode: 'dichotomy'})}},
            {title: 'Метод Ньютона', handler: () => {this.setState({mode: 'newton'})}}
        ]

    componentDidMount() {
        let data = findSolutionByIteration({min: 0, max: 5}, 0.01)
        this.setState({data: data})
        console.log(data)
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
        console.log(dot)
        this.setState({data: data, dot: dot.X + ''})
    }

    calculateDot = (e) => {
        e.preventDefault()
        let num;
        debugger;
        switch(this.state.mode) {
            case 'iteration':
                num = closestToZero(this.state.data)
                this.setState({solution: num})
                break
            case 'dichotomy':
                num = findSolutionByDichotomy({min: +this.state.min, max: +this.state.max}, +this.state.dichotomy)
                this.setState({solution: num})
                break
            case 'newton':
                findSolutionByNewton({min: +this.state.min, max: +this.state.max}, +this.state.newton)
                    .then((result) => {
                        this.setState({solution: result})
                    })
                break
        }
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
                        {this.state.mode === 'dichotomy' && (
                        <div className={'interval-wrapper'}>
                            <label htmlFor={'dichotomy'}>
                                Кількість ділень
                            </label>
                            <input className={'intervals-input'}
                                   name={'dichotomy'}
                                   value={this.state.dichotomy}
                                   placeholder={'8'}
                                   onChange={this.changeHandle}
                            />
                            <button onClick={this.calculateDot}>Розрахувати точку</button>
                        </div>)
                        }
                        {this.state.mode === 'newton' && (
                            <div className={'interval-wrapper'}>
                                <label htmlFor={'newton'}>
                                    Точність
                                </label>
                                <input className={'intervals-input'}
                                       name={'newton'}
                                       value={this.state.newton}
                                       placeholder={'0.001'}
                                       onChange={this.changeHandle}
                                />
                                <button onClick={this.calculateDot}>Розрахувати точку</button>
                            </div>)
                        }
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