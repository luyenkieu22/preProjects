import {
    Grid,
    Icon,
    IconButton,
    Input,
    InputAdornment,
} from "@material-ui/core";
import CustomTable from "app/component/CustomTable";
import { searchEmployeesAction } from "app/redux/actions/employeesAction";
import SearchIcon from "@material-ui/icons/Search";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
    GENDER,
    STATUS,
    STATUS_EMPLOYEE,
    TEAMS,
} from "app/const/statusEmployee";
import { Visibility } from "@material-ui/icons";
import DialogApprovalWaiting from "./DialogApprovalWaiting";
import FormEnd from "app/component/employeeForm/FormEnd";

const Waiting = () => {
    const [pagnition, setPagnition] = useState({
        page: 0,
        rowsPerPage: 10,
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogApplication, setOpenDialogApplication] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [employeeData, setEmployeeData] = useState({});
    const dispatch = useDispatch();
    const { employees, totalElements, isLoading } = useSelector(
        (state) => state.employees
    );

    const fetchEmployeesData = useCallback(() => {
        const data = {
            keyword: keyword,
            pageIndex: pagnition.page + 1,
            pageSize: pagnition.rowsPerPage,
            listStatus: STATUS_EMPLOYEE.WAITING_APPROVAL,
        };
        dispatch(searchEmployeesAction(data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, pagnition.page, pagnition.rowsPerPage]);

    useEffect(() => {
        fetchEmployeesData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchEmployeesData, isLoading]);

    const handleSearchEmployee = () => {
        fetchEmployeesData();
    };

    const handleApplicationForm = (data) => {
        setOpenDialogApplication(true);
    };

    const handleViewEmployee = async (data) => {
        setOpenDialog(true);
        setEmployeeData(data);
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
                        {STATUS_EMPLOYEE.WAITING_END_PROCESS.includes(
                            rowData.submitProfileStatus
                        ) && (
                                <IconButton
                                    size="small"
                                    onClick={() => handleApplicationForm(rowData)}
                                >
                                    <Icon fontSize="small" color="primary">
                                        receipt
                                    </Icon>
                                </IconButton>
                            )}
                        {STATUS_EMPLOYEE.WAITING_APPROVAL.includes(
                            rowData.submitProfileStatus
                        ) && (
                                <IconButton
                                    size="small"
                                    onClick={() => handleViewEmployee(rowData)}
                                >
                                    <Visibility fontSize="small" color="secondary"></Visibility>
                                </IconButton>
                            )}
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
            title: "Mã nhân viên",
            field: "code",
            align: "center",
            minWidth: "120px",
            maxWidth: "120px",
        },
        {
            title: "Tên nhân viên",
            field: "name",
            align: "left",
            minWidth: "200px",
            maxWidth: "200px",
        },
        {
            title: "Ngày sinh",
            field: "dateOfBirth",
            align: "center",
            minWidth: "100px",
            maxWidth: "100px",
            render: (data) => (
                <span>{moment(new Date(data?.dateOfBirth)).format("DD/MM/YYYY")}</span>
            ),
        },
        {
            title: "Giới tính",
            field: "gender",
            align: "center",
            minWidth: "60px",
            maxWidth: "100px",
            render: (data) => <span>{`${GENDER[data?.gender]?.name}`}</span>,
        },
        {
            title: "Nhóm",
            field: "team",
            align: "left",
            minWidth: "140px",
            render: (data) => <span>{`${TEAMS[data?.team]?.name}`}</span>,
        },
        {
            title: "SĐT",
            field: "phone",
            align: "center",
            minWidth: "130px",
            maxWidth: "140px",
        },
        {
            title: "Địa chỉ",
            field: "address",
            align: "left",
            render: (data) => (
                <span
                    style={{
                        display: "inline-block",
                        minWidth: "200px",
                        maxWidth: "240px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {data?.address}
                </span>
            ),
        },
        {
            title: "Trạng thái",
            field: "submitProfileStatus",
            align: "left",
            minWidth: "140px",
            render: (data) => (
                <span>{`${STATUS[data?.submitProfileStatus]?.name}`}</span>
            ),
        },
    ];

    return (
        <>
            <Grid container spacing={2} justify="space-between">
                <Grid item lg={5} md={5} sm={5} xs={12}></Grid>
                <Grid item lg={3} md={4} xs={12}>
                    <Input
                        name="keyword"
                        placeholder="Nhập từ cần tìm kiếm"
                        onChange={(e) => setKeyword(e.target.value.toLowerCase())}
                        className="w-100 my-8"
                        endAdornment={
                            <InputAdornment>
                                <SearchIcon
                                    style={{ cursor: "pointer" }}
                                    onClick={handleSearchEmployee}
                                />
                            </InputAdornment>
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    {openDialog && (
                        <DialogApprovalWaiting
                            open={openDialog}
                            setOpen={setOpenDialog}
                            employeeData={employeeData}
                        />
                    )}
                    {openDialogApplication && (
                        <FormEnd
                            employeeData={employeeData}
                            open={openDialogApplication}
                            setOpen={setOpenDialogApplication}
                            leader={true}
                        />
                    )}
                    <CustomTable
                        data={
                            employees.data
                                ? employees.data.map((employee) => ({ ...employee }))
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
