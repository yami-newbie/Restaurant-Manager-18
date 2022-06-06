import { Grid } from '@mui/material';
import React from 'react'
import TableListItem from './TableListItem';

function ListTable({
  list = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
}) {
  return (
    <Grid container spacing={2} sx={{m: 1, width: "95%"}}>
      {list.map((table, index) => {
        return (
          <Grid sx={{ alignItems: "center", display: "flex", flexDirection: "column" }} item xs={2} key={index}>
            <TableListItem />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ListTable