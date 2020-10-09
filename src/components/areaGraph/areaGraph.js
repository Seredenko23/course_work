import React, {Component} from 'react';
import {CartesianGrid, Area, AreaChart, ReferenceDot, Tooltip, XAxis, YAxis, Line} from "recharts";

class AreaGraph extends Component {
    render() {
        return (
            <AreaChart width={1400}
                       height={700}
                       data={this.props.data}
                       margin={{top: 15, right: 5, left: 20, bottom: 15}}
            >
                <CartesianGrid strokeDasharray={'3 3'}/>
                <XAxis dataKey={'X'}/>
                <YAxis dataKey={'Y'}/>
                <Tooltip/>
                <Area type={'monotone'}
                      dataKey={'Y'}
                      stroke="#8884d8"
                      fill="#8884d8"
                      activeDot={{r: 8}}
                />
            </AreaChart>
        );
    }
}

export default AreaGraph;