import { TablePagination } from "@material-ui/core";
import MaterialTable from "material-table";
import React from "react";

const CustomTable = ({
    data,
    columns,
    pagnition,
    setPagnition,
    totalElements
}) => {
    const handleChangePage = (e, page) => {
        setPagnition({ ...pagnition, page: page });
    }

    const handleChangeRowsPerPage = (e) => {
        setPagnition({
            ...pagnition,
            page: 0,
            rowsPerPage: e.target.value
        });
    }

    return (
        <>
            <MaterialTable
                title="Danh sách"
                columns={columns}
                data={data}
                options={{
                    paging: false,
                    showTitle: false,
                    selection: false,
                    sorting: false,
                    toolbar: false,
                    draggable: false,
                    actionsColumnIndex: -1,
                    padding: 'dense',
                    rowStyle: (rowData, index) => ({
                        backgroundColor: (index % 2 === 1) ? '#EEE' : '#FFF',
                    }),
                    minBodyHeight: '120px',
                    overflowY: "scroll",
                    headerStyle: {
                        backgroundColor: '#272e4a',
                        color: '#fff',
                        textAlign: "center",
                        border: "1px solid #e6e6e6",
                    },
                    cellStyle: {
                        border: "1px solid #e6e6e6",
                    },
                }}

                localization={{
                    body: {
                        emptyDataSourceMessage: "Không có dữ liệu!",
                    },
                }}
            />
            {pagnition &&
                <TablePagination
                    align="left"
                    className="px-16"
                    rowsPerPageOptions={[5, 10, 20, 30, 40, 50]}
                    component="div"
                    labelRowsPerPage={'Số bản ghi mỗi trang'}
                    labelDisplayedRows={({ from, to, count }) => `${from} - ${to} ${'trong'} ${count !== -1 ? count : `more than ${to}`}`}
                    count={totalElements}
                    rowsPerPage={pagnition.rowsPerPage}
                    page={pagnition.page}
                    backIconButtonProps={{
                        "aria-label": "Previous Page"
                    }}
                    nextIconButtonProps={{
                        "aria-label": "Next Page"
                    }}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    onChangePage={handleChangePage}
                />
            }
        </>
    )
}

export default CustomTable;