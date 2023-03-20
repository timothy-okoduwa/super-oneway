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
  const isMidMonth = month % 3 === 1;

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
          <Bar dataKey="paid" fill="#8884d8" />
          <Bar dataKey="free" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
// import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import { VictoryChart, VictoryScatter } from 'victory';
// import { range, random } from 'lodash';

// const Chats = () => {
//   const [scatterData, setScatterData] = useState(getScatterData());

//   useEffect(() => {
//     const setStateInterval = setInterval(() => {
//       setScatterData(getScatterData());
//     }, 3000);

//     return () => clearInterval(setStateInterval);
//   }, []);

//   function getScatterData() {
//     const colors = [
//       'violet',
//       'cornflowerblue',
//       'gold',
//       'orange',
//       'turquoise',
//       'tomato',
//       'greenyellow',
//     ];
//     const symbols = [
//       'circle',
//       'star',
//       'square',
//       'triangleUp',
//       'triangleDown',
//       'diamond',
//       'plus',
//     ];
//     return range(25).map((index) => {
//       const scaledIndex = Math.floor(index % 7);
//       return {
//         x: random(10, 50),
//         y: random(2, 100),
//         size: random(8) + 3,
//         symbol: symbols[scaledIndex],
//         fill: colors[random(0, 6)],
//         opacity: 0.6,
//       };
//     });
//   }

//   return (
//     <VictoryChart animate={{ duration: 2000, easing: 'bounce' }}>
//       <VictoryScatter
//         data={scatterData}
//         style={{
//           data: {
//             fill: ({ datum }) => datum.fill,
//             opacity: ({ datum }) => datum.opacity,
//           },
//         }}
//       />
//     </VictoryChart>
//   );
// };

// export default Chats;

// import { useState, useEffect } from 'react';
// import { collection, getDocs, onSnapshot, doc } from 'firebase/firestore';
// import { db } from '../../firebase';

// function Downloads() {
//   const [downloads, setDownloads] = useState([]);

//   useEffect(() => {
//     const fetchDownloads = async () => {
//       const downloadsCollectionRef = collection(db, 'free');
//       const snapshot = await getDocs(downloadsCollectionRef);
//       const downloads = snapshot.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//       }));
//       setDownloads(downloads);
//     };

//     fetchDownloads();
//   }, []);

//   const currentYear = new Date().getFullYear();

//   return (
//     <div>
//       {downloads?.[0]?.totalDownloads?.[currentYear]?.map((download) => (
//         <div key={download.name}>
//           <p>Name: {download.name}</p>
//           <p>Count: {download.count}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Downloads;
