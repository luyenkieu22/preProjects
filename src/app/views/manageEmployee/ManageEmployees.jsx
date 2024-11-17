import React, { useCallback, useEffect, useState } from "react";
import {
    Button,
    Grid,
    Icon,
    IconButton,
    Input,
    InputAdornment,
} from "@material-ui/core";
import CustomTable from "app/component/CustomTable";
import {
    searchEmployeesAction,
} from "app/redux/actions/employeesAction";
import { Breadcrumb } from "egret";
import SearchIcon from "@material-ui/icons/Search";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { GENDER, STATUS, STATUS_EMPLOYEE, TEAMS } from "app/const/statusEmployee";
import { Visibility } from "@material-ui/icons";
import DialogApprovalWaiting from "../Leader/DialogApprovalWaiting";
import DialogNotifyRequest from "app/component/customDialog/DialogNotifyRequest";
import ManageEmployeesDialog from "./ManageEmployeesDialog";

const ManageEmployee = ({ t }) => {
    const title = t('Dashboard.category');
    const [pagnition, setPagnition] = useState({
        page: 0,
        rowsPerPage: 10,
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogShowCV, setOpenDialogShowCV] = useState(false);
    const [openDialogNotifyRequest, setOpenDialogNotifyRequest] = useState(false);
    const [employeeData, setEmployeeData] = useState({});
    const [keyword, setKeyword] = useState("");
    const [message, setMessage] = useState({ title: "", content: "" });
    const dispatch = useDispatch();
    const { employees, totalElements, isLoading } = useSelector(
        (state) => state.employees
    );

    const fetchEmployeesData = useCallback(() => {
        const data = {
            keyword: keyword,
            pageIndex: pagnition.page + 1,
            pageSize: pagnition.rowsPerPage,
            listStatus: STATUS_EMPLOYEE.MANAGE,
        };
        dispatch(searchEmployeesAction(data));
    }, [dispatch, pagnition.page, pagnition.rowsPerPage, keyword]);

    useEffect(() => {
        fetchEmployeesData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchEmployeesData, isLoading]);

    const handleSearchEmployee = () => {
        fetchEmployeesData();
    };

    const handleOpenDialog = (data) => {
        setOpenDialog(true);
        setEmployeeData(data);
    };

    const handleViewEmployee = (data) => {
        setOpenDialogShowCV(true);
        setEmployeeData(data);
    };
    const handleNotifyEmployee = (data) => {
        const additionalRequest = STATUS_EMPLOYEE.ADDITIONAL_REQUEST_NOTIFY.includes(data?.submitProfileStatus)
        setOpenDialogNotifyRequest(true);
        setMessage({
            title: additionalRequest ? "Nội dung yêu cầu bổ sung" : "Lý do từ chối",
            content: additionalRequest ? data?.additionalRequest : data?.reasonForRejection
        })
    };

    const columns = [
        {
            title: "Thao tác",
            field: "custom",
            align: "center",
            maxWidth: "120px",
            render: (rowData) => {
                return (
                    <div className="">
                        {STATUS_EMPLOYEE.EDIT.includes(rowData.submitProfileStatus) &&
                            <IconButton size="small" onClick={() => handleOpenDialog(rowData)}>
                                <Icon fontSize="small" color="primary">
                                    edit
                                </Icon>
                            </IconButton>
                        }
                        {STATUS_EMPLOYEE.VIEW.includes(rowData.submitProfileStatus) &&
                            <IconButton
                                size="small"
                                onClick={() => handleViewEmployee(rowData)}
                            >
                                <Visibility fontSize="small" color="secondary"></Visibility>
                            </IconButton>
                        }
                        {STATUS_EMPLOYEE.NOTIFY.includes(rowData.submitProfileStatus) &&
                            <IconButton
                                size="small"
                                onClick={() => handleNotifyEmployee(rowData)}
                            >
                                <Icon fontSize="small" color="secondary">
                                    notifications
                                </Icon>
                            </IconButton>
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
            render: (data) => <span>{`${GENDER[data?.gender].name}`}</span>,
        },
        {
            title: "Nhóm",
            field: "team",
            align: "left",
            minWidth: "160px",
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
            render: (data) => <span style={{
                display: "inline-block",
                minWidth: "200px",
                maxWidth: "260px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
            }}>
                {data?.address}
            </span>
        },
        {
            title: "Trạng thái",
            field: "submitProfileStatus",
            align: "left",
            minWidth: "140px",
            render: (data) => (
                <span>{`${STATUS[data?.submitProfileStatus].name}`}</span>
            ),
        },
    ];

    return (
        <div className="analytics m-sm-30">
            <Grid container spacing={2} justify="space-between">
                <Grid item lg={5} md={5} sm={5} xs={12}>
                </Grid>
                <Grid item lg={3} md={4} xs={12}>
                    <Input
                        name="keyword"
                        placeholder="Nhập từ cần tìm kiếm"
                        onChange={(e) => setKeyword(e.target.value.toLowerCase())}
                        className="w-100 my-6"
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
                        <ManageEmployeesDialog
                            open={openDialog}
                            setOpen={setOpenDialog}
                            employeeData={employeeData}
                            setEmployeeData={setEmployeeData}
                        />
                    )}
                    {openDialogShowCV && (
                        <DialogApprovalWaiting
                            open={openDialogShowCV}
                            setOpen={setOpenDialogShowCV}
                            employeeData={employeeData}
                            setEmployeeData={setEmployeeData}
                        />
                    )}
                    {openDialogNotifyRequest && (
                        <DialogNotifyRequest
                            open={openDialogNotifyRequest}
                            setOpen={setOpenDialogNotifyRequest}
                            message={message}
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
                        t={t}
                    />
                </Grid>
            </Grid>

        </div>
    );
};

export default ManageEmployee;


