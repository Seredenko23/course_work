import React, {Component} from 'react';
import { calculateEquation, calculateDifferential } from "../../service/task4"
import '../../css/table.css'

class DifferentialTable extends Component {
    relError = [0.5, 0.2, 0.1, 0.01, 0.001]
    render() {
        return (
            <table className={'graph-table'}>
                <thead>
                <tr>
                    <th className={'table-cell'}>Δx</th>
                    <th className={'table-cell'}>y(x)</th>
                    <th className={'table-cell'}>y'(x)</th>
                    <th className={'table-cell'}>y(x+Δx)-y(x)/Δx</th>
                    <th className={'table-cell'}>y(x)-y(x-Δx)/Δx</th>
                    <th className={'table-cell'}>y(x+Δx)-y(x-Δx)/2Δx</th>
                </tr>
                </thead>
                <tbody>
                {this.relError.map((delta) => {
                    let x = calculateEquation(1)
                    let diffX = calculateDifferential(x)
                    let xPlusDiff = calculateEquation(x + delta)
                    let xMinusDiff = calculateEquation(x - delta)
                    return (
                        <tr>
                            <th className={'table-cell'}>{delta}</th>
                            <th className={'table-cell'}>{x}</th>
                            <th className={'table-cell'}>{diffX}</th>
                            <th className={'table-cell'}>{(xPlusDiff - x)/delta}</th>
                            <th className={'table-cell'}>{(x - xMinusDiff)/delta}</th>
                            <th className={'table-cell'}>{(xPlusDiff - xMinusDiff)/delta}</th>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        );
    }
}

export default DifferentialTable;