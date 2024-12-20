import {
    Button,
    Grid,
    Icon,
    IconButton,
    InputAdornment,
} from "@material-ui/core";
import { Visibility } from "@material-ui/icons";
import DialogNotifyRequest from "app/component/customDialog/DialogNotifyRequest";
import CustomTable from "app/component/CustomTable";
import FormSalaryIncrease from "app/component/employeeForm/FormSalaryIncrease";
import { useConfirm } from "app/component/useConfirm";
import { STATUS, STATUS_EMPLOYEE } from "app/const/statusEmployee";
import {
    addSalaryIncreaseAction,
    deleteSalaryIncreaseAction,
    editSalaryIncreaseAction,
    getSalaryIncreaseByEmployeeAction,
} from "app/redux/actions/salaryIncreaseAction";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useDispatch, useSelector } from "react-redux";
import "../../../../styles/views/_style.scss"

const TabSalaryIncrease = ({ setOpenDialog }) => {
    const { employee } = useSelector(state => state.employees)
    const { salaryIncrease, totalElements, isLoading } = useSelector(
        (state) => state.salaryIncrease
    );
    const dispatch = useDispatch();
    const initialValue = {
        startDate: moment().format("YYYY-MM-DD"),
        reason: "",
        note: "",
        oldSalary: 0,
        newSalary: "",
    };
    const [dataPage, setDataPage] = useState([]);
    const [salaryObj, setSalaryObj] = useState(initialValue);
    const [dialogViewForm, setDialogForm] = useState(false);
    const [dialogSave, setDialogSave] = useState(false);
    const [dialogNotifyRequest, setDialogNotifyRequest] = useState(false);
    const [message, setMessage] = useState({ title: "", content: "" });
    const [pagnition, setPagnition] = useState({
        page: 0,
        rowsPerPage: 5,
    });

    const [ConfirmDialog, confirm] = useConfirm(
        "Xác nhận xóa",
        "Bạn có muốn xóa thông tin này không!"
    );

    const updateDataPage = () => {
        const startOfPage = pagnition.page * pagnition.rowsPerPage;
        const endOfPage = (pagnition.page + 1) * pagnition.rowsPerPage;
        const pageData = salaryIncrease.slice(startOfPage, endOfPage);
        setDataPage(pageData);
    };

    const fetchSalaryIncrease = useCallback(() => {
        dispatch(getSalaryIncreaseByEmployeeAction(employee?.id));
    }, [dispatch, employee.id]);

    useEffect(() => {
        fetchSalaryIncrease();
    }, [fetchSalaryIncrease, isLoading]);

    const handleChangeValue = (e) => {
        const { name, value } = e.target;
        if (name === "newSalary") {
            const newValue = value.replace(/[.,]/g, "");
            setSalaryObj({
                ...salaryObj,
                [name]: value ? parseInt(newValue) : "",
            });
        } else {
            setSalaryObj({
                ...salaryObj,
                [name]: value,
            });
        }
    };

    const handleDeleteEmployee = async (id) => {
        const ok = await confirm();
        if (!ok) return;
        dispatch(deleteSalaryIncreaseAction(id));
        setSalaryObj(initialValue);
    };

    const handleViewEmployee = () => {
        setDialogForm(true);
        setSalaryObj(initialValue);
    };

    const handleNotifyEmployee = (data) => {
        const additionalRequest = data?.salaryIncreaseStatus === 5;
        setDialogNotifyRequest(true);
        setMessage({
            title: additionalRequest ? "Nội dung yêu cầu bổ sung" : "Lý do từ chối",
            content: additionalRequest
                ? data?.reasonForRefusal
                : data?.additionalRequest,
        });
    };

    const handleSubmit = (e) => {
        if (salaryObj?.id) {
            dispatch(
                editSalaryIncreaseAction({
                    ...salaryObj,
                    startDate: moment().format("YYYY-MM-DD"),
                    oldSalary: salaryObj?.oldSalary !== null ? salaryObj?.oldSalary : 0,
                })
            );
        } else {
            dispatch(
                addSalaryIncreaseAction(
                    {
                        ...salaryObj,
                        oldSalary: salaryObj?.oldSalary !== null ? salaryObj?.oldSalary : 0,
                    },
                    employee?.id
                )
            );
        }
        setDialogSave(true);
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
                        {STATUS_EMPLOYEE.EDIT.includes(rowData.salaryIncreaseStatus) && (
                            <IconButton
                                size="small"
                                onClick={() =>
                                    setSalaryObj({
                                        ...rowData,
                                        startDate: moment(rowData?.startDate).format("YYYY-MM-DD"),
                                    })
                                }
                            >
                                <Icon fontSize="small" color="primary">
                                    edit
                                </Icon>
                            </IconButton>
                        )}
                        {rowData?.salaryIncreaseStatus === 1 && (
                            <IconButton
                                size="small"
                                onClick={() => handleDeleteEmployee(rowData.id)}
                            >
                                <Icon fontSize="small" color="error">
                                    delete
                                </Icon>
                            </IconButton>
                        )}
                        <IconButton
                            size="small"
                            onClick={() => handleViewEmployee(rowData)}
                        >
                            <Visibility fontSize="small" color="secondary"></Visibility>
                        </IconButton>
                        {STATUS_EMPLOYEE.NOTIFY.includes(rowData.salaryIncreaseStatus) && (
                            <IconButton
                                size="small"
                                onClick={() => handleNotifyEmployee(rowData)}
                            >
                                <Icon fontSize="small" color="secondary">
                                    notifications
                                </Icon>
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
            title: "Ngày bắt đầu",
            field: "startDate",
            align: "center",
            minWidth: "100px",
            render: (data) => (
                <span>{moment(data?.startDate).format("DD/MM/YYYY")}</span>
            ),
        },
        {
            title: "Lý do",
            field: "reason",
            align: "left",
            minWidth: "180px",
            maxWidth: "200px",
            render: (rowData) => <span className="text-wrapper-overflow-form">{rowData?.reason}</span>
        },
        {
            title: "Lương cũ",
            field: "oldSalary",
            align: "right",
            minWidth: "80px",
            render: (rowData) => (
                <span>{parseInt(rowData?.oldSalary).toLocaleString()} VNĐ</span>
            ),
        },
        {
            title: "Lương mới",
            field: "newSalary",
            align: "right",
            minWidth: "80px",
            render: (rowData) => (
                <span>{parseInt(rowData?.newSalary).toLocaleString()} VNĐ</span>
            ),
        },
        {
            title: "Ghi chú",
            field: "note",
            align: "left",
            minWidth: "160px",
            maxWidth: "260px",
            render: (rowData) => <span className="text-wrapper-overflow-form">{rowData?.note}</span>
        },
        {
            title: "Trạng thái",
            field: "salaryIncreaseStatus",
            align: "left",
            minWidth: "140px",
            render: (data) => (
                <span>{`${STATUS[data?.salaryIncreaseStatus].name}`}</span>
            ),
        },
    ];

    useEffect(() => {
        updateDataPage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagnition, salaryIncrease]);

    return (
        <ValidatorForm onSubmit={handleSubmit}>
            <Grid
                container
                spacing={2}
                style={{
                    marginBottom: "14px",
                    marginTop: "14px",
                    justifyContent: "space-between",
                }}
            >
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <TextValidator
                        className="w-100 stylePlaceholder"
                        label={
                            <span style={{ color: "black" }}>
                                <span style={{ color: "red" }}> * </span>
                                Ngày bắt đầu
                            </span>
                        }
                        type="date"
                        name="startDate"
                        value={salaryObj?.startDate}
                        fullWidth
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            max: moment().format("YYYY-MM-DD"),
                        }}
                        validators={["required"]}
                        errorMessages={["Ngày bắt đầu không được để trống"]}
                    />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <TextValidator
                        className="w-100 stylePlaceholder mt-2"
                        size="small"
                        label={
                            <span style={{ color: "black" }}>
                                <span style={{ color: "red" }}> * </span>
                                Lương cũ (VNĐ)
                            </span>
                        }
                        variant="outlined"
                        value={salaryObj?.oldSalary ? salaryObj?.oldSalary.toLocaleString() : 0}
                        disabled
                        type="text"
                        name="oldSalary"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">vnđ</InputAdornment>,
                        }}
                        onChange={handleChangeValue}
                        validators={["required"]}
                        errorMessages={["Trường này không được để trống!"]}
                    />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <TextValidator
                        className="w-100 stylePlaceholder mt-2"
                        size="small"
                        label={
                            <span style={{ color: "black" }}>
                                <span style={{ color: "red" }}> * </span>
                                Lương mới (VNĐ)
                            </span>
                        }
                        variant="outlined"
                        type="text"
                        name="newSalary"
                        value={
                            salaryObj?.newSalary ? salaryObj?.newSalary.toLocaleString() : 0
                        }
                        onChange={handleChangeValue}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">vnđ</InputAdornment>,
                        }}
                        validators={["required"]}
                        errorMessages={["Trường này không được để trống!"]}
                    />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <TextValidator
                        className="w-100 stylePlaceholder mt-2"
                        size="small"
                        label={
                            <span style={{ color: "black" }}>
                                <span style={{ color: "red" }}> * </span>
                                Lý do
                            </span>
                        }
                        variant="outlined"
                        type="text"
                        name="reason"
                        value={salaryObj?.reason ? salaryObj?.reason.toLocaleString() : ""}
                        onChange={handleChangeValue}
                        validators={["required"]}
                        errorMessages={["Lý do không được để trống!"]}
                    />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <TextValidator
                        className="w-100 stylePlaceholder"
                        size="small"
                        label={
                            <span style={{ color: "black" }}>
                                <span style={{ color: "red" }}> * </span>
                                Ghi chú
                            </span>
                        }
                        variant="outlined"
                        type="text"
                        name="note"
                        value={salaryObj?.note}
                        onChange={handleChangeValue}
                        validators={["required"]}
                        errorMessages={["Trường này không được để trống!"]}
                    />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} spacing={2}>
                    <Button
                        style={{ marginRight: "6px" }}
                        variant="contained"
                        color="secondary"
                        onClick={() => setSalaryObj(initialValue)}
                    >
                        Hủy
                    </Button>
                    <Button
                        style={{ marginRight: "6px" }}
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Lưu
                    </Button>
                </Grid>
            </Grid>
            <CustomTable
                data={dataPage ? dataPage.map((salary) => ({ ...salary })) : []}
                columns={columns}
                setPagnition={setPagnition}
                pagnition={pagnition}
                totalElements={totalElements}
            />
            {dialogViewForm && (
                <FormSalaryIncrease
                    open={dialogViewForm}
                    setOpen={setDialogForm}
                    employeeData={employee}
                    salaryObj={salaryObj}
                />
            )}
            {dialogSave && (
                <FormSalaryIncrease
                    open={dialogSave}
                    setOpen={setDialogSave}
                    setOpenDialog={setOpenDialog}
                    employeeData={employee}
                    salaryObj={salaryObj}
                    save={true}
                />
            )}
            {dialogNotifyRequest && (
                <DialogNotifyRequest
                    open={dialogNotifyRequest}
                    setOpen={setDialogNotifyRequest}
                    message={message}
                />
            )}
            <ConfirmDialog />
        </ValidatorForm>
    );
};

export default TabSalaryIncrease;
