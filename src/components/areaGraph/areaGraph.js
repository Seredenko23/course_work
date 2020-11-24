import React, { PureComponent } from 'react';
import {CartesianGrid, Area, AreaChart, Tooltip, XAxis, YAxis, ReferenceDot} from "recharts";

class AreaGraph extends PureComponent {
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
                {this.props.dots.map(dot => {
                    return <ReferenceDot x={+dot.x.toFixed(2)} y={dot.y} r={4} fill={dot.valid ? '#fab905' : '"#8884d8"'} stroke="white"/>
                })}
            </AreaChart>
        );
    }
}

export default AreaGraph;