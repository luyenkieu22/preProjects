import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Icon, IconButton, MenuItem } from "@material-ui/core";
import { Visibility } from "@material-ui/icons";
import DialogApprovalWaiting from "app/views/Leader/DialogApprovalWaiting";
import DialogNotifyRequest from "app/component/customDialog/DialogNotifyRequest";
import CustomTable from "app/component/CustomTable";
import { useConfirm } from "app/component/useConfirm";
import { POSITION, STATUS, STATUS_EMPLOYEE } from "app/const/statusEmployee";
import moment from "moment";
import { SelectValidator, TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { addProcessAction, deleteProcessAction, editProcessAction, getProcessByEmployeeIdAction } from "app/redux/actions/processAction";
import FormProcess from "app/component/employeeForm/FormProcess";

const TabProcess = ({ employee }) => {
    const { process, totalElements, isLoading } = useSelector(state => state.process)
    const dispatch = useDispatch()
    const initialValue = {
        promotionDay: moment().format("YYYY-MM-DD"),
        newPosition: "",
        note: "",
        currentPosition: employee?.currentPosition || "",
        leaderId: employee?.leaderId || ""
    }
    const [dataPage, setDataPage] = useState([])
    const [processObj, setProcessObj] = useState(initialValue)
    const [dialogViewCV, setDialogViewCV] = useState(false)
    const [dialogNotifyRequest, setDialogNotifyRequest] = useState(false)
    const [message, setMessage] = useState({ title: "", content: "" })
    const [pagnition, setPagnition] = useState({
        page: 0,
        rowsPerPage: 5,
    });
    const [ConfirmDialog, confirm] = useConfirm(
        "Xác nhận xóa",
        "Bạn có muốn xóa thông tin này không!"
    )

    const updateDataPage = () => {
        const startOfPage = pagnition.page * pagnition.rowsPerPage;
        const endOfPage = (pagnition.page + 1) * pagnition.rowsPerPage;
        const pageData = process.slice(startOfPage, endOfPage);
        setDataPage(pageData);
    };

    const fetchProcess = useCallback(() => {
        dispatch(getProcessByEmployeeIdAction(employee?.id));
    }, [dispatch, employee.id]);

    useEffect(() => {
        fetchProcess();
    }, [fetchProcess, isLoading]);

    const handleChangeValue = (e) => {
        const { name, value } = e.target;
        setProcessObj({
            ...processObj,
            [name]: value
        })
    }

    const handleDelete = async (id) => {
        const ok = await confirm();
        if (!ok) return;
        dispatch(deleteProcessAction(id));
        setProcessObj(initialValue);
    };

    const handleViewEmployee = (data) => {
        setDialogViewCV(true);
        setProcessObj(data);
    };

    const handleNotifyEmployee = (data) => {
        const additionalRequest = data?.salaryIncreaseStatus === 5
        setDialogNotifyRequest(true);
        setMessage({
            title: additionalRequest ? "Nội dung yêu cầu bổ sung" : "Lý do từ chối",
            content: additionalRequest ? data?.reasonForRefusal : data?.additionalRequest
        })
    };

    const handleSubmit = () => {
        if (processObj?.id) {
            dispatch(editProcessAction({
                ...processObj,
                promotionDay: moment().format("YYYY-MM-DD")
            }))
        } else {
            dispatch(addProcessAction(processObj, employee?.id))
        }
        setProcessObj(initialValue)
    }

    const columns = [
        {
            title: "Thao tác",
            field: "custom",
            align: "center",
            maxWidth: "120px",
            render: (rowData) => {
                return (
                    <div className="">
                        {STATUS_EMPLOYEE.EDIT.includes(rowData.processStatus) &&
                            <IconButton size="small" onClick={() => setProcessObj({ ...rowData, promotionDay: moment(rowData?.promotionDay).format("YYYY-MM-DD") })}>
                                <Icon fontSize="small" color="primary">
                                    edit
                                </Icon>
                            </IconButton>
                        }
                        {rowData?.processStatus === 1 &&
                            <IconButton size="small" onClick={() => handleDelete(rowData.id)}>
                                <Icon fontSize="small" color="error">
                                    delete
                                </Icon>
                            </IconButton>
                        }
                        <IconButton
                            size="small"
                            onClick={() => handleViewEmployee(rowData)}
                        >
                            <Visibility fontSize="small" color="secondary"></Visibility>
                        </IconButton>
                        {STATUS_EMPLOYEE.NOTIFY.includes(rowData.processStatus) &&
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
            title: "Ngày thăng chức",
            field: "promotionDay",
            align: "center",
            minWidth: "80px",
            render: (data) => (
                <span>{moment(data?.promotionDay).format("DD/MM/YYYY")}</span>
            ),
        },
        {
            title: "Ghi chú",
            field: "note",
            align: "left",
            minWidth: "200px",
            maxWidth: "220px",
        },
        {
            title: "Vị trí hiện tại",
            field: "currentPosition",
            align: "center",
            minWidth: "80px",
            render: (data) => (
                <span>{`${POSITION[data?.currentPosition - 1].value}`}</span>
            ),
        },
        {
            title: "Vị trí đề xuất",
            field: "newPosition",
            align: "left",
            minWidth: "120px",
            render: (data) => (
                <span>{`${POSITION[data?.newPosition - 1].value}`}</span>
            ),
        },
        {
            title: "Trạng thái",
            field: "processStatus",
            align: "left",
            minWidth: "120px",
            render: (data) => (
                <span>{`${STATUS[data?.processStatus].name}`}</span>
            ),
        },
    ];

    useEffect(() => {
        updateDataPage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagnition, process]);

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
                                Ngày thăng chức
                            </span>
                        }
                        type="date"
                        name="promotionDay"
                        value={processObj?.promotionDay}
                        fullWidth
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            readOnly: true
                        }}
                        validators={["required"]}
                        errorMessages={["Ngày thăng chức không được để trống"]}
                    />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <TextValidator
                        className="w-100 stylePlaceholder"
                        label={
                            <span style={{ color: "black" }}>
                                <span style={{ color: "red" }}> * </span>
                                Vị trí hiện tại
                            </span>
                        }
                        type="text"
                        name="currentPosition"
                        disabled
                        value={processObj?.currentPosition && POSITION[processObj?.currentPosition].value}
                        fullWidth
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        validators={["required"]}
                        errorMessages={["Vị trí hiện tại không được để trống"]}
                    />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <SelectValidator
                        className="w-100 stylePlaceholder"
                        size="small"
                        label={
                            <span style={{ color: "black" }}>
                                <span style={{ color: "red" }}> * </span>
                                Vị trí đề xuất
                            </span>
                        }
                        variant="outlined"
                        type="text"
                        name="newPosition"
                        value={processObj?.newPosition}
                        onChange={handleChangeValue}
                        validators={["required"]}
                        errorMessages={["Trường này không được để trống!"]}
                    >
                        {
                            POSITION.map((item) => (
                                <MenuItem value={item.id} key={item.id}>
                                    {item.value}
                                </MenuItem>
                            ))
                        }
                    </SelectValidator >
                </Grid >
                <Grid item lg={8} md={8} sm={12} xs={12}>
                    <TextValidator
                        className="w-100 stylePlaceholder mt-2"
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
                        value={processObj?.note}
                        onChange={handleChangeValue}
                        validators={["required"]}
                        errorMessages={["Ghi chú không được để trống!"]}
                    />
                </Grid >
                <Grid item lg={4} md={4} sm={12} xs={12} spacing={2}>
                    <Button style={{ marginRight: "6px" }} variant="contained" color="secondary" onClick={() => setProcessObj(initialValue)}>
                        Hủy
                    </Button>
                    <Button style={{ marginRight: "6px" }} variant="contained" color="primary" type="submit">
                        Lưu
                    </Button>
                </Grid>
            </Grid >
            <CustomTable
                data={
                    dataPage
                        ? dataPage.map((proposal) => ({ ...proposal }))
                        : []
                }
                columns={columns}
                setPagnition={setPagnition}
                pagnition={pagnition}
                totalElements={totalElements}
            />
            {dialogViewCV && <FormProcess open={dialogViewCV} setOpen={setDialogViewCV} employeeData={employee} processObj={processObj} />}
            {dialogNotifyRequest && <DialogNotifyRequest open={dialogNotifyRequest} setOpen={setDialogNotifyRequest} message={message} />}
            <ConfirmDialog />
        </ValidatorForm >
    );
};

export default TabProcess;
