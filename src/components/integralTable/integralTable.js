import React, {Component} from 'react';
import './integralTable.css'

class IntegralTable extends Component {
    values = [10, 20, 50, 100, 1000]
    render() {
        return (
            <table className={'integral-table'}>
                <thead>
                    <tr>
                        <th>Кількість ітерацій</th>
                        <th>Аналітичне Значення</th>
                        <th>{this.props.title}</th>
                        <th>Абсолютна похибка</th>
                        <th>Відносна похибка</th>
                    </tr>
                </thead>
                <tbody>
                    {this.values.map(value => {
                        let num = this.props.func(value)
                        return (
                            <tr key={value}>
                                <td className={'table-cell'}>{value}</td>
                                <td className={'table-cell'}>{this.props.analiticValue}</td>
                                <td className={'table-cell'}>{num}</td>
                                <td className={'table-cell'}>{Math.abs(this.props.analiticValue - num)}</td>
                                <td className={'table-cell'}>{Math.abs(this.props.analiticValue - num)/this.props.analiticValue * 100} %</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        );
    }
}

export default IntegralTable;