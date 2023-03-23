import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    date: '2000-01',
    free: 4000,
    paid: 2400,
  },
  {
    date: '2000-02',
    free: 3000,
    paid: 1398,
  },
  {
    date: '2000-03',
    free: 2000,
    paid: 9800,
  },
  {
    date: '2000-04',
    free: 2780,
    paid: 3908,
  },
  {
    date: '2000-05',
    free: 1890,
    paid: 4800,
  },
  {
    date: '2000-06',
    free: 2390,
    paid: 3800,
  },
  {
    date: '2000-07',
    free: 3490,
    paid: 4300,
  },
  {
    date: '2000-08',
    free: 4000,
    paid: 2400,
  },
];

const monthTickFormatter = (tick) => {
  const date = new Date(tick);

  return date.getMonth() + 1;
};

const renderQuarterTick = (tickProps) => {
  const { x, y, payload } = tickProps;
  const { value, offset } = payload;
  const date = new Date(value);
  const month = date.getMonth();
  const quarterNo = Math.floor(month / 3) + 1;
  // const isMidMonth = month % 3 === 1;

  if (month % 3 === 1) {
    return <text x={x} y={y - 4} textAnchor="middle">{`Q${quarterNo}`}</text>;
  }

  const isLast = month === 11;

  if (month % 3 === 0 || isLast) {
    const pathX = Math.floor(isLast ? x + offset : x - offset) + 0.5;

    return <path d={`M${pathX},${y - 4}v${-35}`} stroke="red" />;
  }
  return null;
};
export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/bar-chart-with-double-xaxis-dfug7';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={monthTickFormatter} />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            interval={0}
            tick={renderQuarterTick}
            height={1}
            scale="band"
            xAxisId="quarter"
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="paid" fill="#000000" />
          <Bar dataKey="free" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
