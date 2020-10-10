import React, {Component} from 'react';
import './task3.css'
import {
    generateGraph,
} from "../../service/task1";
import {
    equation,
    trap,
    rectangle,
    simpson,
    monteCarlo
} from "../../service/task3";
import {toast} from "react-toastify";
import Wrapper from "../wrapper/wrapper";
import Menu from "../menu/Menu";
import Logger from "../Logger/logger";
import AreaGraph from "../areaGraph/areaGraph";

class Task3 extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
            max: '5',
            min: '0',
            maxY: '1',
            minY: '0',
            iterations: '10',
            solution: 0.64,
            log: [],
            mode: 'rectangle'
        }
    }

    buttons = [
        {title: 'Метод Прямокутників', mode: 'rectangle', handler: () => {this.setState({mode: 'rectangle'})}},
        {title: 'Метод Трапецій', mode: 'trap', handler: () => {this.setState({mode: 'trap'})}},
        {title: 'Метод Сімпсона', mode: 'simpson', handler: () => {this.setState({mode: 'simpson'})}},
        {title: 'Метод Монте-Карло', mode: 'monteCarlo', handler: () => {this.setState({mode: 'monteCarlo'})}},

    ]

    componentDidMount() {
        let data = generateGraph({min: 0, max: 5}, 0.01, equation)
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
            let {min, max} = this.state
            e.preventDefault()
            let data = generateGraph({min: +min, max: +max}, 0.01, equation)
            this.setState({data: data.filter(el => !isNaN(el.Y) && isFinite(el.Y))})
        } catch (e) {
            toast.error(e.message)
        }
    }

    calculateArea = (e) => {
        e.preventDefault()
        let {min, max, minY, maxY, iterations} = this.state
        let num;
        try {
            switch(this.state.mode) {
                case 'rectangle':
                    num = rectangle({min: +min, max: +max}, +iterations)
                    this.setState({solution: num})
                    break
                case 'trap':
                    num = trap({min: +min, max: +max}, +iterations)
                    this.setState({solution: num})
                    break
                case 'simpson':
                    num = simpson({min: +min, max: +max}, +iterations)
                    this.setState({solution: num})
                    break
                case 'monteCarlo':
                    num = monteCarlo({xMin: +min, xMax: +max}, {yMin: +minY, yMax: +maxY}, +iterations)
                    console.log(num)
                    this.setState({solution: num})
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
                            <label htmlFor={'step'}>Iterations</label>
                            <input className={'intervals-input'}
                                   name={'iterations'}
                                   value={this.state.iterations}
                                   placeholder={'10'}
                                   onChange={this.changeHandle}
                            />
                        </div>
                        <button className={'intervals-button'} type={'submit'}>Створити</button>
                        {this.state.mode === 'monteCarlo' && (
                            <>
                                <div className={'interval-wrapper'}>
                                    <label htmlFor={'maxY'}>
                                        Максимальне значення Y
                                    </label>
                                    <input className={'intervals-input'}
                                           name={'maxY'}
                                           value={this.state.minY}
                                           placeholder={'1'}
                                           onChange={this.changeHandle}
                                    />
                                </div>
                                <div className={'interval-wrapper'}>
                                    <label htmlFor={'minY'}>
                                        Мінімальне значення Y
                                    </label>
                                    <input className={'intervals-input'}
                                           name={'minY'}
                                           value={this.state.maxY}
                                           placeholder={'0'}
                                           onChange={this.changeHandle}
                                    />
                                </div>
                            </>)}
                        <button className={'intervals-button'}
                                type={'button'}
                                onClick={this.calculateArea}
                        >
                            Розрахувати
                        </button>
                    </form >

                    <div className={'solution'}>
                        <span>X = </span>
                        <span>{this.state.solution}</span>
                    </div>

                    <AreaGraph data={this.state.data}/>
                </Wrapper>
            </div>
        );
    }
}

export default Task3;