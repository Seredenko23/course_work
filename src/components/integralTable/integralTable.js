import React, {Component} from 'react';
import {rectangle, trap, monteCarlo, simpson} from "../../service/task3";

class IntegralTable extends Component {
    values = [10, 20, 50, 100, 1000]
    render() {
        console.log(this.props)
        let {min, max, minY, maxY} = this.props
        console.log(this.props)
        return (
            <table>
                <tr>
                    <th>Аналітичне Значення</th>
                    <th>Метод Прямокутників</th>
                    <th>Метод Трапецій</th>
                    <th>Метод Сімпсона</th>
                    <th>Метод Монте-Карло</th>
                </tr>
                {this.values.map(value => {
                    return (
                        <tr>
                            <td>0.716</td>
                            <td>{rectangle({min, max}, value)}</td>
                            <td>{trap({min, max}, value)}</td>
                            <td>{simpson({min, max}, value)}</td>
                            <td>{monteCarlo({xMin: +min, xMax: +max}, {yMin: minY, yMax: maxY}, value)}</td>
                        </tr>
                    )
                })}
            </table>
        );
    }
}

export default IntegralTable;