// File: C:\Users\hanos\nextall\frontend\src\components\table\table.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams, usePathname } from 'next/navigation';
import PropTypes from 'prop-types';

// MUI components
import {
  Divider,
  Card,
  Table,
  TableBody,
  TableContainer,
  Stack,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@mui/material';

// Components
import NotFound from 'src/illustrations/dataNotFound';
import Pagination from 'src/components/pagination';
import Search from 'src/components/search';
import TableHead from './tableHead';

CustomTable.propTypes = {
  headData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      alignRight: PropTypes.bool
    })
  ).isRequired,
  data: PropTypes.shape({
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  mobileRow: PropTypes.elementType,
  row: PropTypes.elementType.isRequired,
  filters: PropTypes.array,
  isSearch: PropTypes.bool,
  heading: PropTypes.string
};

export default function CustomTable({ filters = [], ...props }) {
  const { headData, data, isLoading, heading, isSearch, row, ...rest } = props;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [state, setState] = useState({});
  const queryString = searchParams.toString();

  const handleChange = (param, val) => {
    const newState = { ...state, [param]: val };
    setState(newState);
    router.push(`${pathname}?${createQueryString(param, val)}`);
  };

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const params = new URLSearchParams(queryString);
    const paramsObject = {};
    for (const [key, value] of params.entries()) {
      paramsObject[key] = value;
    }
    setState((prev) => ({ ...prev, ...paramsObject }));
  }, [queryString]);

  // Use an empty array as a fallback for data.data
  const tableRows = isLoading ? Array.from({ length: 6 }) : (data?.data || []);

  return (
    <Card>
      {(!filters.length && !heading) && (
        <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
          {heading && (
            <Typography variant="h4" color="text.primary" px={2} py={2}>
              {heading}
            </Typography>
          )}
          {isSearch && <Search />}
          <Stack spacing={2} direction="row">
            {filters.map((item) => (
              <FormControl
                fullWidth
                key={item.param}
                sx={{ maxWidth: 200, minWidth: 140, width: '100%' }}
              >
                <InputLabel id={`select-${item.name}`}>{item.name}</InputLabel>
                <Select
                  labelId={`select-${item.name}`}
                  id={`select-${item.name}`}
                  value={state[item.param] ?? ''}
                  label={item.name}
                  onChange={(e) => handleChange(item.param, e.target.value)}
                >
                  <MenuItem value="">None</MenuItem>
                  {item.data.map((v) => (
                    <MenuItem value={v.slug} key={v.slug || v.name}>
                      {v.name || v.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}
          </Stack>
        </Stack>
      )}

      {(!isLoading && tableRows.length === 0) ? (
        <>
          <Divider />
          <NotFound title="No Order Found" />
        </>
      ) : (
        <>
          <TableContainer>
            <Table size="small" sx={{ minWidth: 650 }}>
              <TableHead headData={headData} />
              <TableBody>
                {tableRows.map((item, idx) => (
                  <props.row key={item?.id || idx} row={item} isLoading={isLoading} {...rest} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider />
          {!isLoading && (
            <Stack alignItems="flex-end" mt={2} pr={2}>
              <Pagination data={data} />
            </Stack>
          )}
        </>
      )}
    </Card>
  );
}
