import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TYPES } from '../../Commons/types';

function Print(props) {
  const { rows, classes } = props;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <HeaderTableCell>Data</HeaderTableCell>
          <HeaderTableCell>Quantità (ml)</HeaderTableCell>
          <HeaderTableCell>Tipo</HeaderTableCell>
          <HeaderTableCell>Ente trasfusionale</HeaderTableCell>
          <HeaderTableCell>Note</HeaderTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows
          .sort((a, b) => a.data.date - b.data.date)
          .map(({ data: { date, quantity, type, authority, note } }, i) => (
            <TableRow key={i}>
              <TableCell>
                {new Date(date).toLocaleDateString(navigator.language || navigator.userLanguage, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </TableCell>
              <TableCell>{`${quantity}`}</TableCell>
              <TableCell>
                {TYPES[type]}
              </TableCell>
              <TableCell>{authority}</TableCell>
              <TableCell>{note}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

export default Print;

const HeaderTableCell = withStyles(theme => ({
  head: {
    backgroundColor: `${theme.palette.primary.main} !important`,
    color: `${theme.palette.primary.contrastText} !important`,
    textAlign: 'center',
    fontWeight: 'bold',
  },
}))(TableCell);
