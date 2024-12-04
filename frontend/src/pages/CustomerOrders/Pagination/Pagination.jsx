import React from 'react'
import { Pagination as MUIPagination, Stack } from "@mui/material";

const Pagination = ({page,totalPages,onPageChange}) => {
    const handlePageChange = (event, newPage) => {
        onPageChange(newPage);
    }
  return (
        <Stack alignItems="center" mt={4}>
            <MUIPagination count={totalPages} page={page} onChange={handlePageChange} variant='outlined' shape='rounded'/>
        </Stack>
  )
}

export default Pagination