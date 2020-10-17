import React,  {PureComponent} from 'react';
import Menu from "../menu/Menu";
import Graph from "../graph/Graph";
import Wrapper from "../wrapper/wrapper";
import {
    calculateEquation,
    findSolutionByIteration,
    findSolutionByNewton,
    findSolutionByDichotomy, generateGraph,
} from "../../service/task1";
import {getAmountAfterDot} from '../../service/utilities'
import './task1.css'
import Logger from "../Logger/logger";
import {toast} from "react-toastify";

class Task1 extends PureComponent {
    constructor() {
        super()
        this.state = {
            data: [],
            max: '5',
            min: '0',
            step: '0.01',
            solution: 3.69,
            amount: 1,
            dichotomy: 8,
            log: [],
            newton: 0.001,
            mode: 'iteration'
        }
    }

    buttons = [
            {title: 'Метод итерацій', mode: 'iteration', handler: () => {this.setState({mode: 'iteration'})}},
            {title: 'Метод дихотомії', mode: 'dichotomy', handler: () => {this.setState({mode: 'dichotomy'})}},
            {title: 'Метод Ньютона', mode: 'newton', handler: () => {this.setState({mode: 'newton'})}}
        ]

    componentDidMount() {
        let data = generateGraph({min: 0, max: 5}, 0.01, calculateEquation)
        this.setState({data: data.filter(el => !isNaN(el.Y) && isFinite(el.Y))})
    }

    changeHandle = (event) => {
        event.preventDefault()
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        })
    };

    formHandler = (e) => {
        try {
            let {min, max, step} = this.state
            e.preventDefault()
            let data = generateGraph({min: +min, max: +max}, +step, calculateEquation)
            this.setState({data: data.filter(el => !isNaN(el.Y) && isFinite(el.Y))})
        } catch (e) {
            toast.error(e.message)
        }
    }

    calculateDot = (e) => {
        e.preventDefault()
        let num;
        try {
            switch(this.state.mode) {
                case 'iteration':
                    num = findSolutionByIteration(this.state.data)
                    this.setState({solution: num[0], amount: num[0]})
                    break
                case 'dichotomy':
                    let log = findSolutionByDichotomy({
                        min: +this.state.min,
                        max: +this.state.max
                    }, +this.state.dichotomy)
                    if (log === null) {
                        this.setState({solution: 0, log: [], amount: 0})
                    } else {
                        num = log[log.length - 1]['Центр']
                        this.setState({solution: num, log: log, amount: 1})
                    }
                    break
                case 'newton':
                    findSolutionByNewton({min: +this.state.min, max: +this.state.max}, +this.state.newton)
                        .then((result) => {
                            if (result === null) {
                                this.setState({solution: 0, log: [], amount: 0})
                            } else {
                                this.setState({solution: result[result.length - 1]['Точка перетину Оси X'], log: result, amount: 1})
                            }
                        }).catch(e => {
                            toast.error(e.message)
                        })
                    break
                default:
                    break
            }
        } catch(e) {
            toast.error(e.message)
        }
    }

    render() {
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
                        <button className={'intervals-button'} type={'submit'}>Створити</button>
                        {this.state.mode === 'iteration' && (
                            <div className={'interval-wrapper'}>
                                <button className={'intervals-button'}
                                        onClick={this.calculateDot}>Розрахувати точку</button>
                            </div>)
                        }
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
                            <button className={'intervals-button'}
                                    onClick={this.calculateDot}>Розрахувати точку</button>
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
                                <button className={'intervals-button'}
                                        onClick={this.calculateDot}>Розрахувати точку</button>
                            </div>)
                        }
                    </form >

                    <div className={'solution'}>
                        <div>
                            <span>X = </span>
                            <span>{this.state.solution}</span>
                        </div>
                        <div>
                            <span>Знайдено коренів </span>
                            <span>{this.state.amount}</span>
                        </div>
                    </div>

                    <Logger log={this.state.log}/>

                    <Graph data={this.state.data}
                           dotX={+this.state.solution.toFixed(getAmountAfterDot(this.state.step))}
                           dotY={0}
                    />
                </Wrapper>
            </div>
        );
    }
}

export default Task1;