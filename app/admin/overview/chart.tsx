'use client'

import { FC } from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { systemPalette } from 'design'
import { useTheme } from 'next-themes'
import { formatCurrency, KEY } from 'lib'

interface ChartProps {
  data: { salesData: SalesData }
}
const Chart: FC<ChartProps> = ({ data: { salesData } }) => {
  const { theme, systemTheme } = useTheme()
  const mode = theme === KEY.LIGHT ?  'light': theme === KEY.DARK ? 'dark' : systemTheme === KEY.LIGHT ? 'light': 'dark'
  return (
    <ResponsiveContainer width={'100%'} height={350}>
      <BarChart data={salesData}>
        <XAxis dataKey={'month'} stroke={systemPalette[mode].chart.stroke} fontSize={10} tickLine axisLine />
        <YAxis stroke={systemPalette[mode].chart.stroke} fontSize={10} tickLine axisLine={false} tickFormatter={(value) => `${formatCurrency(value)}`} />
        <Bar dataKey={'totalSales'} fill={'currentColor'} radius={[4,4,0,0]} className={'fill-primary'} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default Chart
