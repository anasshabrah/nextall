// File: C:\Users\hanos\nextall\frontend\src\components\charts\income.jsx
import { merge } from 'lodash';
import { useState } from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box, Tabs, Tab, Skeleton, useMediaQuery, useTheme } from '@mui/material';
import BaseOptionChart from './BaseOptionChart';
import { fCurrency } from 'src/utils/formatNumber';

export default function IncomeChart({ income, commission, isVendor, isLoading }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [seriesData, setSeriesData] = useState('week');

  // Create an array of weekday labels
  const pastWeek = [...Array(7).keys()].map((days) =>
    new Date(Date.now() - 86400000 * days).toLocaleString('en-us', {
      weekday: 'short'
    })
  );
  
  const handleChange = (event, newValue) => {
    setSeriesData(newValue);
  };

  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Merge stacking configuration into the chart options instead of passing a boolean prop
  const chartOptions = merge(BaseOptionChart(), {
    chart: { stacked: true },
    legend: { position: 'top', horizontalAlign: 'right' },
    xaxis: {
      categories:
        seriesData === 'week'
          ? pastWeek.slice().reverse()
          : seriesData === 'year'
            ? month
            : Array.from({ length: 31 }, (_, i) => i + 1)
    },
    yaxis: [
      {
        labels: {
          formatter: (val) => fCurrency(val)
        }
      }
    ]
  });

  // Fallback to empty arrays if data is missing
  const incomeData = income && income[seriesData] ? income[seriesData] : [];
  const commissionData = commission && commission[seriesData] ? commission[seriesData] : [];

  return (
    <Card>
      <CardHeader
        title="Income Report"
        action={
          <Tabs
            value={seriesData}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="income chart tabs"
            sx={{ '& .MuiButtonBase-root:not(:last-of-type)': { marginRight: '1rem' } }}
          >
            <Tab value="week" label="Week" />
            <Tab value="month" label="Month" />
            <Tab value="year" label="Year" />
          </Tabs>
        }
        sx={{ flexWrap: 'wrap' }}
      />
      <Box sx={{ mt: 3, mx: 3 }}>
        {isLoading ? (
          <>
            <Skeleton variant="rectangular" width="100%" height={isMobile ? 260 : 360} sx={{ borderRadius: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, mb: 3 }}>
              {Array.from({ length: 6 }).map((_, idx) => (
                <Skeleton key={idx} variant="text" sx={{ width: 40 }} />
              ))}
            </Box>
          </>
        ) : (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              '.apexcharts-canvas': {
                width: '100% !important',
                overflow: 'hidden',
                position: 'relative'
              }
            }}
          >
            <ReactApexChart
              type="bar"
              series={
                isVendor
                  ? [{ name: 'Income', data: incomeData }]
                  : [
                      { name: 'Income', data: incomeData },
                      { name: 'Commission', data: commissionData }
                    ]
              }
              options={chartOptions}
              height={isMobile ? 260 : 400}
            />
          </Box>
        )}
      </Box>
    </Card>
  );
}

IncomeChart.propTypes = {
  income: PropTypes.shape({
    week: PropTypes.array,
    month: PropTypes.array,
    year: PropTypes.array
  }),
  commission: PropTypes.shape({
    week: PropTypes.array,
    month: PropTypes.array,
    year: PropTypes.array
  }),
  isVendor: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired
};
