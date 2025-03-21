// File: C:\Users\hanos\nextall\frontend\src\components\charts\sale.jsx
import { merge } from 'lodash';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box, Skeleton } from '@mui/material';
import BaseOptionChart from './BaseOptionChart';

export default function Income({ data, isLoading }) {
  // Ensure that the series data is an array (fallback if undefined)
  const seriesData = Array.isArray(data) ? data : [];

  // Configure stacking via the chart options instead of passing a "stack" prop
  const chartOptions = merge(BaseOptionChart(), {
    chart: { stacked: true },
    stroke: { show: true, width: 0 },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    tooltip: {
      y: { formatter: (val) => val }
    },
    yaxis: {
      opposite: false,
      labels: { formatter: (val) => val.toFixed(0) }
    }
  });

  return (
    <Card sx={{ pb: 1.5 }}>
      <CardHeader title="Sales Report" />
      {isLoading ? (
        <Box mx={3}>
          <Skeleton variant="rectangular" width="100%" height={219} sx={{ borderRadius: 2, mt: 3 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, mb: 3 }}>
            {Array.from({ length: 10 }).map((_, idx) => (
              <Skeleton key={idx} variant="text" sx={{ width: 40 }} />
            ))}
          </Box>
        </Box>
      ) : (
        <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
          <ReactApexChart
            type="bar"
            series={[
              {
                name: 'Sales',
                data: seriesData
              }
            ]}
            options={chartOptions}
            height={260}
          />
        </Box>
      )}
    </Card>
  );
}

Income.propTypes = {
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
};
