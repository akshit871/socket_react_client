import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const columns = [
  { id: "srno", label: "SR No", minWidth: 4 },
  { id: "mcd", label: "M/C Date", minWidth: 20 },
  {
    id: "mcn",
    label: "M/C No",
    minWidth: 3,
    align: "center",
  },
  {
    id: "psno",
    label: "Part Sr No",
    minWidth: 8,
    align: "center",
  },
  {
    id: "laser",
    label: "Laser Marker Data",
    minWidth: 40,
    align: "center",
  },
  {
    id: "scanner",
    label: "Scanner Maker Data",
    minWidth: 40,
    align: "center",
  },
  {
    id: "dot",
    label: "Dot Matrix Data",
    minWidth: 30,
    align: "center",
  },
  {
    id: "result",
    label: "Result",
    minWidth: 4,
    align: "center",
  },
  {
    id: "operator",
    label: "Operator",
    minWidth: 15,
    align: "center",
  },
  {
    id: "time",
    label: "Time",
    minWidth: 20,
    align: "center",
  },
  {
    id: "date",
    label: "Date",
    minWidth: 20,
    align: "center",
  },
  {
    id: "model",
    label: "Model",
    minWidth: 30,
    align: "center",
  },
  {
    id: "bino",
    label: "BI No",
    minWidth: 10,
    align: "center",
  },
  {
    id: "bid",
    label: "BI Date",
    minWidth: 15,
    align: "center",
  },
];

function createData(
  srno,
  mcd,
  mcn,
  psno,
  laser,
  scanner,
  dot,
  result,
  operator,
  time,
  date,
  model,
  bino,
  bid
) {
  return {
    srno,
    mcd,
    mcn,
    psno,
    laser,
    scanner,
    dot,
    result,
    operator,
    time,
    date,
    model,
    bino,
    bid,
  };
}

const rowsFormatter = (rows = []) => {
  let formtedrows = [];

  rows.forEach((x, i) => {
    let y = createData(
      x["SNo"],
      x["M/C Date"],
      x["M/C No"],
      x["Part Sno"],
      x["Laser Data"],
      x["Scanner Data"],
      x["DOT Matrix Data"],
      x["Result"] == true ? "OK" : "NG",
      x["Operator"],
      x["Time"],
      x["Date"],
      x["Model"],
      x["BI No"],
      x["BI Date"]
    );
    formtedrows.push(y);
  });

  return formtedrows;
};

const useStyles = makeStyles({
  root: {
    width: "99vw",
    padding: "10px",
  },
  container: {
    width: "99%",
    maxHeight: 440,
    borderRadius: "20px",
    border: `1px solid black`,
  },
});

function StickyHeadTable({ rows = [] }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rowsUpadted = rowsFormatter(rows);
  console.log({ rows }, { rowsUpadted });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsUpadted.length &&
              rowsUpadted
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={`uiu${index}`}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
const mapStateToProps = (state) => ({
  rows: state.rowRd.rows,
});
const mapDispatchToProps = (dispatch) => {
  return {
    bushDone: (data) => dispatch({ type: "BUSH_D", payload: data }),
    fillStore: (data) => dispatch({ type: "UPDATE_STORE", payload: data }),
    fillRows: (data) => dispatch({ type: "UPDATE_ROW", payload: data }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StickyHeadTable);
