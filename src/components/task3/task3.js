import React, {Component} from 'react';
import './task3.css'
import '../../css/table.css'
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
import AreaGraph from "../areaGraph/areaGraph";
import IntegralTable from "../integralTable/integralTable";

class Task3 extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
            max: '3.14',
            min: '0',
            iterations: '10',
            solution: 0.64,
            log: [],
            dots: [],
            mode: 'rectangle'
        }
    }

    buttons = [
        {title: 'Метод Прямокутників', mode: 'rectangle', handler: () => {this.setState({mode: 'rectangle'})}},
        {title: 'Метод Трапецій', mode: 'trap', handler: () => {this.setState({mode: 'trap'})}},
        {title: 'Метод Монте-Карло', mode: 'monteCarlo', handler: () => {this.setState({mode: 'monteCarlo'})}},
        {title: 'Таблиця результатів', mode: 'table', handler: () => {this.setState({mode: 'table'})}},
    ]

    componentDidMount() {
        let data = generateGraph({min: 0, max: 3.14}, 0.01, equation)
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
        let {min, max, iterations} = this.state
        let num;
        try {
            switch(this.state.mode) {
                case 'rectangle':
                    num = rectangle({min: +min, max: +max}, +iterations)
                    this.setState({solution: num, dots: []})
                    break
                case 'trap':
                    num = trap({min: +min, max: +max}, +iterations)
                    this.setState({solution: num, dots: []})
                    break
                case 'monteCarlo':
                    num = monteCarlo({xMin: +min, xMax: +max}, +iterations)
                    this.setState({solution: num.area, dots: num.dots})
                    break
                default:
                    break
            }
        } catch(e) {
            toast.error(e.message)
        }
    }

    render() {
        let {min, max, maxY, minY} = this.state
        return (
            <div>
                <Wrapper>
                    <Menu buttons={this.buttons}
                          currentMode={this.state.mode}
                    />
                    {this.state.mode !== 'table' ?
                        (
                        <>
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

                            <AreaGraph data={this.state.data} dots={this.state.dots}/>
                        </>
                        ) : (
                            <div className={"tables"}>
                                <span className={"table-header"}><b>Метод прямокутників</b></span>
                                <IntegralTable title={'Метод прямокутників'}
                                             analiticValue={0.716}
                                             func={(iters) => rectangle({min: +min, max: +max}, iters)}
                                />
                                <span className={"table-header"}><b>Метод Трапецій</b></span>
                                <IntegralTable title={'Метод Трапецій'}
                                               analiticValue={0.716}
                                               func={(iters) => trap({min: +min, max: +max}, iters)}
                                />
                                <span className={"table-header"}><b>Метод Монте-Карло</b></span>
                                <IntegralTable title={'Метод Монте-Карло'}
                                               analiticValue={0.716}
                                               func={(iters) => monteCarlo({xMax: +max, xMin: +min}, iters)}
                                />
                            </div>
                        )
                    }
                </Wrapper>
            </div>
        );
    }
}

export default Task3;