import { Settings } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BatteryTemp {
  date: string;
  min: number;
  max: number;
  mean: number;
}

interface BatteryTempChartProps {
  initialData: BatteryTemp[];
}

const BatteryTempChartSettings = {
  TEMPOCAMPIONEMENTO: 250,
  NVALORIMAX: 30,
}

const BatteryTempChart: React.FC<BatteryTempChartProps> = ({ initialData }) => {
  const [data, setData] = useState<BatteryTemp[]>(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimestamp = new Date();
      const newDataPoint = {
        date: newTimestamp.toISOString(),
        min: Math.random() * 10 + 15,
        max: Math.random() * 20 + 15,
        mean: Math.random() * 30 + 15,
      };

      // Aggiorna i dati mantenendo solo gli ultimi 30 punti
      setData((prevData) => {
        const newData = [...prevData, newDataPoint];
        if (newData.length > BatteryTempChartSettings.NVALORIMAX) {
          newData.shift(); // Rimuovi i dati più vecchi se sono più di 30 punti
        }
        return newData;
      });
    }, BatteryTempChartSettings.TEMPOCAMPIONEMENTO);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <ResponsiveContainer width="95%" height="80%">
      <LineChart data={data}>
        <XAxis domain={[30,0]} ticks={[30, 25, 20, 15, 10, 5, 0]}/>
        <YAxis domain={[15, 70]} ticks={[10, 15, 25, 35, 45, 55, 65, 70]} />
        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="min" isAnimationActive={false} name="Min Temp" stroke="#50e991" strokeWidth={3} />
        <Line type="monotone" dataKey="max" isAnimationActive={false} name="Max Temp" stroke="#e60049" strokeWidth={3} />
        <Line type="monotone" dataKey="mean" isAnimationActive={false} name="Mean Temp" stroke="#0bb4ff" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
};


export default BatteryTempChart;
