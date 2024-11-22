import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    deleteEmployeeAction,
    searchEmployeesAction,
    setEmployeeAction,
} from "app/redux/actions/employeesAction";
import SearchIcon from "@material-ui/icons/Search";
import AddEmployeeDialog from "./AddEmployeeDialog";
import moment from "moment";
import { GENDER, STATUS, STATUS_EMPLOYEE, TEAMS } from "app/const/statusEmployee";
import { useConfirm } from "app/component/useConfirm";
import { Visibility } from "@material-ui/icons";
import DialogApprovalWaiting from "../Leader/DialogApprovalWaiting";
import DialogNotifyRequest from "app/component/customDialog/DialogNotifyRequest";
import "../../../styles/views/_style.scss";

const AddEmployee = ({ t }) => {
    const [pagnition, setPagnition] = useState({
        page: 0,
        rowsPerPage: 10,
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogShowCV, setOpenDialogShowCV] = useState(false);
    const [openDialogNotifyRequest, setOpenDialogNotifyRequest] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [message, setMessage] = useState({ title: "", content: "" });
    const dispatch = useDispatch();
    const { employees, totalElements, isLoading } = useSelector(
        (state) => state.employees
    );
    const [ConfirmDialog, confirm] = useConfirm(
        "Xác nhận xóa",
        "Bạn có chắc chắn muốn xóa nhân viên này?"
    );

    const fetchEmployeesData = () => {
        const data = {
            keyword: keyword,
            pageIndex: pagnition.page + 1,
            pageSize: pagnition.rowsPerPage,
            listStatus: STATUS_EMPLOYEE.ADD,
        };
        dispatch(searchEmployeesAction(data))
    }

    useEffect(() => {
        fetchEmployeesData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagnition.page, pagnition.rowsPerPage, isLoading]);

    const handleSearchEmployee = () => {
        fetchEmployeesData();
    };

    const handleOpenDialog = (data) => {
        setOpenDialog(true);
        dispatch(setEmployeeAction(data))
    };

    const handleViewEmployee = (data) => {
        setOpenDialogShowCV(true);
        dispatch(setEmployeeAction(data))
    };
    const handleNotifyEmployee = (data) => {
        const additionalRequest = STATUS_EMPLOYEE.ADDITIONAL_REQUEST_NOTIFY.includes(data?.submitProfileStatus)
        setOpenDialogNotifyRequest(true);
        setMessage({
            title: additionalRequest ? "Nội dung yêu cầu bổ sung" : "Lý do từ chối",
            content: additionalRequest ? data?.additionalRequest : data?.reasonForRejection
        })
    };
    const handleRemoveEmployee = async (data) => {
        const ok = await confirm();
        if (!ok) return;
        dispatch(deleteEmployeeAction(data.id));
    };

    const columns = [
        {
            title: "Thao tác",
            field: "custom",
            align: "center",
            maxWidth: "120px",
            render: (rowData) => {
                return (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        {STATUS_EMPLOYEE.EDIT.includes(rowData.submitProfileStatus) &&
                            <IconButton size="small" onClick={() => handleOpenDialog(rowData)}>
                                <Icon fontSize="small" color="primary">
                                    edit
                                </Icon>
                            </IconButton>
                        }
                        {STATUS_EMPLOYEE.DELETE.includes(rowData.submitProfileStatus) &&
                            <IconButton
                                size="small"
                                onClick={() => handleRemoveEmployee(rowData)}
                            >
                                <Icon fontSize="small" color="error">
                                    delete
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
            render: (data) => <span className="text-wrapper-overflow">
                {data?.name}
            </span>
        },
        {
            title: "Ngày sinh",
            field: "dateOfBirth",
            align: "center",
            minWidth: "100px",
            maxWidth: "100px",
            render: (data) => (
                <span>{moment(data?.dateOfBirth).format("DD/MM/YYYY")}</span>
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
            render: (data) => <span className="text-wrapper-overflow">
                {data?.address}
            </span>
        },
        {
            title: "Trạng thái",
            field: "submitProfileStatus",
            align: "left",
            minWidth: "160px",
            render: (data) => (
                <span>{`${STATUS[data?.submitProfileStatus]?.name}`}</span>
            ),
        },
    ];

    return (
        <div className="analytics m-sm-30">
            <ConfirmDialog />
            <Grid container spacing={2} justify="space-between">
                <Grid item lg={5} md={5} sm={5} xs={12}>
                    <Button
                        className="my-6 align-bottom"
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={handleOpenDialog}
                    >
                        Thêm mới
                    </Button>
                </Grid>
                <Grid item lg={3} md={4} xs={12}>
                    <Input
                        name="keyword"
                        placeholder="Nhập từ cần tìm kiếm"
                        onChange={(e) => setKeyword(e.target.value.toLowerCase())}
                        onKeyDown={e => e.key === "Enter" && fetchEmployeesData()}
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
                        <AddEmployeeDialog
                            open={openDialog}
                            setOpen={setOpenDialog}
                        />
                    )}
                    {openDialogShowCV && (
                        <DialogApprovalWaiting
                            open={openDialogShowCV}
                            setOpen={setOpenDialogShowCV}
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

export default AddEmployee;
