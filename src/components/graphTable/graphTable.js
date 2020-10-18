import React, {Component} from 'react';
import {generateGraph, findSolutionByIteration, calculateEquation} from "../../service/task1";
import '../../css/table.css'

class GraphTable extends Component {
    relError = [0.01, 0.001, 0.0001]
    render() {
        let {min, max} = this.props
        return (
            <table className={'graph-table'}>
                <thead>
                <tr>
                    <th className={'table-cell'}>Похибка</th>
                    <th className={'table-cell'}>Кількість ітерацій</th>
                    <th className={'table-cell'}>Корінь рівняння</th>
                    <th className={'table-cell'}>Значення Функції</th>
                </tr>
                </thead>
                <tbody>
                {this.relError.map((el) => {
                    let dots = generateGraph({min, max}, el, calculateEquation)
                    let x = findSolutionByIteration(dots)[0]
                    return (
                        <tr>
                            <td className={'table-cell'}>{el}</td>
                            <td className={'table-cell'}>{(max - min)/el}</td>
                            <td className={'table-cell'}>{x}</td>
                            <td className={'table-cell'}>{calculateEquation(x)}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        );
    }
}

export default GraphTable;