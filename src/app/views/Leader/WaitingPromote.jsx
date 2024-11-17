import {
    Grid,
    Icon,
    IconButton,
} from "@material-ui/core";
import CustomTable from "app/component/CustomTable";
import { getEmployeesAction } from "app/redux/actions/employeesAction";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
    POSITION,
    STATUS_EMPLOYEE,
} from "app/const/statusEmployee";
import { Visibility } from "@material-ui/icons";
import DialogApprovalWaiting from "./DialogApprovalWaiting";
import { getCertificateByEmployeeAction } from "app/redux/actions/certificatesAction";
import { getFamilyByEmployeeIdAction } from "app/redux/actions/familyAction";
import { getProcessByLeaderAction } from "app/redux/actions/processAction";
import FormProcess from "app/component/employeeForm/FormProcess";

const WaitingPromote = () => {
    const [pagnition, setPagnition] = useState({
        page: 0,
        rowsPerPage: 10,
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogApplication, setOpenDialogApplication] = useState(false);
    const [item, setItem] = useState({});
    const [dataTable, setDataTable] = useState([]);
    const dispatch = useDispatch();

    const { employees } = useSelector((state) => state.employees);
    const { process, totalElements, isLoading } = useSelector(
        (state) => state.process
    );

    const updateDataTable = useCallback(() => {
        const startOfPage = pagnition.page * pagnition.rowsPerPage;
        const endOfPage = (pagnition.page + 1) * pagnition.rowsPerPage;
        const pageData = process.slice(startOfPage, endOfPage);
        setDataTable(pageData);
    }, [pagnition.page, pagnition.rowsPerPage, process]);

    useEffect(() => {
        updateDataTable();
    }, [updateDataTable, pagnition, process]);

    useEffect(() => {
        dispatch(getProcessByLeaderAction());
    }, [dispatch, isLoading]);


    const handleApplicationForm = (data) => {
        dispatch(getEmployeesAction(data?.employeeId))
        setOpenDialogApplication(true);
    };

    const handleViewEmployee = async (data) => {
        dispatch(getEmployeesAction(data?.employeeId))
        dispatch(getCertificateByEmployeeAction(data?.employeeId))
        dispatch(getFamilyByEmployeeIdAction(data?.employeeId))
        setOpenDialog(true);
        setItem(data);
    };

    const columns = [
        {
            title: "Thao tác",
            field: "custom",
            align: "center",
            maxWidth: "100px",
            render: (rowData) => {
                return (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        {STATUS_EMPLOYEE.WAITING_APPROVAL.includes(rowData.processStatus) &&
                            <>
                                <IconButton size="small" onClick={() => handleApplicationForm(rowData)}>
                                    <Icon fontSize="small" color="primary">
                                        receipt
                                    </Icon>
                                </IconButton>
                                <IconButton size="small" onClick={() => handleViewEmployee(rowData)}>
                                    <Visibility fontSize="small" color="secondary"></Visibility>
                                </IconButton>
                            </>
                        }

                    </div>
                );
            },
        },
        {
            title: "STT",
            align: "center",
            maxWidth: "60px",
            render: (data) =>
                data.tableData.id + 1 + pagnition.page * pagnition.rowsPerPage,
        },
        {
            title: "Ngày thăng chức",
            field: "promotionDate",
            align: "center",
            minWidth: "160px",
            render: (data) => (
                <span>{moment(data?.promotionDate).format("DD/MM/YYYY")}</span>
            ),
        },
        {
            title: "Vị trí hiện tại",
            field: "currentPosition",
            align: "center",
            minWidth: "160px",
            render: (data) => <span>{data?.currentPosition ? POSITION[data?.currentPosition - 1]?.value : "Vị trí hiện tại trống"}</span>
        },
        {
            title: "Vị trí đề xuất",
            field: "newPosition",
            align: "center",
            minWidth: "160px",
            render: (data) => <span>{data?.newPosition ? POSITION[data?.newPosition - 1]?.value : "Vị trí đề xuất trống"}</span>
        },
        {
            title: "Ghi chú",
            field: "note",
            align: "center",
            minWidth: "160px",
        }
    ];

    return (
        <>
            <Grid container spacing={2} justify="space-between">
                <Grid item xs={12}>
                    {openDialog && (
                        <DialogApprovalWaiting
                            open={openDialog}
                            setOpen={setOpenDialog}
                            employeeData={employees}

                        />
                    )}
                    {openDialogApplication && (
                        <FormProcess
                            employeeData={employees}
                            processObj={item}
                            open={openDialogApplication}
                            setOpen={setOpenDialogApplication}
                            leader={true}
                        />
                    )}
                    <CustomTable
                        data={
                            dataTable
                                ? dataTable.map((data) => ({ ...data }))
                                : []
                        }
                        columns={columns}
                        totalElements={totalElements}
                        pagnition={pagnition}
                        setPagnition={setPagnition}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default WaitingPromote;
