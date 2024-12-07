import React, { useEffect, useState } from "react";
import {
    Grid,
    Icon,
    IconButton,
    Input,
    InputAdornment,
} from "@material-ui/core";
import CustomTable from "app/component/CustomTable";
import {
    searchEmployeesAction,
    setEmployeeAction,
} from "app/redux/actions/employeesAction";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { GENDER, STATUS, STATUS_EMPLOYEE, TEAMS } from "app/const/statusEmployee";
import { Visibility } from "@material-ui/icons";
import DialogApprovalWaiting from "../Leader/DialogApprovalWaiting";
import "../../../styles/views/_style.scss";
import DialogSaveEmployee from "app/component/customDialog/DialogSaveEmployee";

const EndEmployee = ({ t }) => {
    const { employees, totalElements, isLoading } = useSelector(
        (state) => state.employees
    );
    const [pagnition, setPagnition] = useState({
        page: 0,
        rowsPerPage: 10,
    });
    const [openDialogShowCV, setOpenDialogShowCV] = useState(false);
    const [openDialogSave, setOpenDialogSave] = useState(false);
    const [keyword, setKeyword] = useState("");
    const dispatch = useDispatch();

    const fetchEmployeesData = () => {
        const data = {
            keyword: keyword,
            pageIndex: pagnition.page + 1,
            pageSize: pagnition.rowsPerPage,
            listStatus: STATUS_EMPLOYEE.END,
        };
        dispatch(searchEmployeesAction(data));
    }

    useEffect(() => {
        fetchEmployeesData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagnition.page, pagnition.rowsPerPage, isLoading]);

    const handleSearchEmployee = () => {
        fetchEmployeesData();
    };

    const handleViewEmployee = (data) => {
        setOpenDialogShowCV(true);
        dispatch(setEmployeeAction(data))
    };

    const handleSaveForm = (data) => {
        setOpenDialogSave(true);
        dispatch(setEmployeeAction(data))
    };

    const columns = [
        {
            title: "Thao tác",
            field: "custom",
            align: "center",
            maxWidth: "120px",
            render: (rowData) => {
                return (
                    <div style={{ display: "flex", justifyContent: "center", gap: "6px" }}>
                        {rowData.submitProfileStatus === "7" && (
                            <IconButton
                                size="small"
                                onClick={() => handleSaveForm(rowData)}
                            >
                                <Icon fontSize="small" color="primary">
                                    receipt
                                </Icon>
                            </IconButton>
                        )}
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <IconButton
                                size="small"
                                onClick={() => handleViewEmployee(rowData)}
                            >
                                <Visibility fontSize="small" color="secondary"></Visibility>
                            </IconButton>
                        </div>
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
                    {openDialogShowCV && (
                        <DialogApprovalWaiting
                            open={openDialogShowCV}
                            setOpen={setOpenDialogShowCV}
                            showEmployeeEnd={true}
                        />
                    )}
                    {openDialogSave && (
                        <DialogSaveEmployee
                            open={openDialogSave}
                            setOpen={setOpenDialogSave}
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

export default EndEmployee;


