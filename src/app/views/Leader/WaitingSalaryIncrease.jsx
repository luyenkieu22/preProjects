
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
    STATUS_EMPLOYEE,
} from "app/const/statusEmployee";
import { Visibility } from "@material-ui/icons";
import DialogApprovalWaiting from "./DialogApprovalWaiting";
import FormEnd from "app/component/employeeForm/FormEnd";
import { getCertificateByEmployeeAction } from "app/redux/actions/certificatesAction";
import { getFamilyByEmployeeIdAction } from "app/redux/actions/familyAction";
import { getSalaryIncreaseByLeaderAction } from "app/redux/actions/salaryIncreaseAction";
import FormSalaryIncrease from "app/component/employeeForm/FormSalaryIncrease";

const Waiting = () => {
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
    const { salaryIncrease, totalElements, isLoading } = useSelector(
        (state) => state.salaryIncrease
    );

    const updateDataTable = useCallback(() => {
        const startOfPage = pagnition.page * pagnition.rowsPerPage;
        const endOfPage = (pagnition.page + 1) * pagnition.rowsPerPage;
        const pageData = salaryIncrease.slice(startOfPage, endOfPage);
        setDataTable(pageData);
    }, [pagnition.page, pagnition.rowsPerPage, salaryIncrease]);

    useEffect(() => {
        updateDataTable();
    }, [updateDataTable, pagnition, salaryIncrease]);

    useEffect(() => {
        dispatch(getSalaryIncreaseByLeaderAction())
    }, [dispatch, isLoading])


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
                        {STATUS_EMPLOYEE.WAITING_APPROVAL.includes(rowData.salaryIncreaseStatus) &&
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
            title: "Ngày bắt đầu",
            field: "startDate",
            align: "center",
            minWidth: "100px",
            maxWidth: "100px",
            render: (data) => (
                <span>{moment(new Date(data?.startDate)).format("DD/MM/YYYY")}</span>
            ),
        },
        {
            title: "Lương cũ",
            field: "oldSalary",
            align: "center",
            minWidth: "120px",
            render: (data) => <span>{data?.oldSalary}VNĐ</span>,
        },
        {
            title: "Lương mới",
            field: "newSalary",
            align: "center",
            minWidth: "120px",
            render: (data) => <span>{data?.newSalary}VNĐ</span>,
        },
        {
            title: "Lý do",
            field: "reason",
            align: "center",
            minWidth: "130px",
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
                        <FormSalaryIncrease
                            employeeData={employees}
                            salaryObj={item}
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

export default Waiting;
