import React, {Component} from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceDot} from "recharts";

class Graph extends Component {
    componentDidMount() {
        console.log(this.props)
    }

    render() {
        console.log(this.props)
        return (
            <LineChart width={1400}
                       height={700}
                       data={this.props.data.slice(1)}
                       margin={{top: 15, right: 5, left: 20, bottom: 15}}
            >
                <CartesianGrid strokeDasharray={'3 3'}/>
                <XAxis dataKey={'X'}/>
                <YAxis dataKey={'Y'}/>
                <Tooltip/>
                <ReferenceDot x={this.props.dot} y={0} r={8} fill="#8884d8" stroke="white" />
                <Line type={'monotone'}
                      dataKey={'Y'}
                      stroke="#8884d8"
                      activeDot={{r: 8}}
                      dot={false}
                />
            </LineChart>
        );
    }
}

export default Graph;