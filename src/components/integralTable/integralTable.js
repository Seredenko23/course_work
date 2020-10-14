import React, {Component} from 'react';
import {rectangle, trap, monteCarlo, simpson} from "../../service/task3";
import './integralTable.css'

class IntegralTable extends Component {
    values = [10, 20, 50, 100, 1000]
    render() {
        let {min, max, minY, maxY} = this.props
        return (
            <table className={'integral-table'}>
                <thead>
                    <tr>
                        <th>Кількість ітерацій</th>
                        <th>Аналітичне Значення</th>
                        <th>Метод Прямокутників</th>
                        <th>Метод Трапецій</th>
                        <th>Метод Сімпсона</th>
                        <th>Метод Монте-Карло</th>
                    </tr>
                </thead>
                <tbody>
                    {this.values.map(value => {
                        return (
                            <tr key={value}>
                                <td className={'table-cell'}>{value}</td>
                                <td className={'table-cell'}>0.716</td>
                                <td className={'table-cell'}>{rectangle({min, max}, value)}</td>
                                <td className={'table-cell'}>{trap({min, max}, value)}</td>
                                <td className={'table-cell'}>{simpson({min, max}, value)}</td>
                                <td className={'table-cell'}>{monteCarlo({xMin: +min, xMax: +max}, {yMin: minY, yMax: maxY}, value)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        );
    }
}

export default IntegralTable;