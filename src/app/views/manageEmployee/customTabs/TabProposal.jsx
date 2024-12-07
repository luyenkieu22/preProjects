import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Icon, IconButton, MenuItem } from "@material-ui/core";
import { Visibility } from "@material-ui/icons";
import DialogNotifyRequest from "app/component/customDialog/DialogNotifyRequest";
import CustomTable from "app/component/CustomTable";
import { useConfirm } from "app/component/useConfirm";
import {
    STATUS,
    STATUS_EMPLOYEE,
    TYPE_PROPOSAL,
} from "app/const/statusEmployee";
import moment from "moment";
import {
    SelectValidator,
    TextValidator,
    ValidatorForm,
} from "react-material-ui-form-validator";
import {
    addProposalAction,
    deleteProposalAction,
    editProposalAction,
    getProposalByEmployeeAction,
} from "app/redux/actions/proposalAction";
import FormProposal from "app/component/employeeForm/FormProposal";
import "../../../../styles/views/_style.scss"

const TabPropose = ({ setOpenDialog }) => {
    const { employee } = useSelector((state) => state.employees);
    const { proposal, totalElements, isLoading } = useSelector(
        (state) => state.proposal
    );
    const dispatch = useDispatch();
    const initialValue = {
        proposalDate: moment().format("YYYY-MM-DD"),
        content: "",
        note: "",
        type: "",
        detailedDescription: "",
    };
    const [dataPage, setDataPage] = useState([]);
    const [proposalObj, setProposalObj] = useState(initialValue);
    const [dialogViewCV, setDialogViewCV] = useState(false);
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
        const pageData = proposal.slice(startOfPage, endOfPage);
        setDataPage(pageData);
    };

    const fetchProposal = useCallback(() => {
        dispatch(getProposalByEmployeeAction(employee?.id));
    }, [dispatch, employee.id]);

    useEffect(() => {
        fetchProposal();
    }, [fetchProposal, isLoading]);

    const handleChangeValue = (e) => {
        const { name, value } = e.target;
        setProposalObj({
            ...proposalObj,
            [name]: value,
        });
    };

    const handleDeleteEmployee = async (id) => {
        const ok = await confirm();
        if (!ok) return;
        dispatch(deleteProposalAction(id));
        setProposalObj(initialValue);
    };

    const handleViewEmployee = () => {
        setDialogViewCV(true);
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

    const handleSubmit = () => {
        if (proposalObj?.id) {
            dispatch(
                editProposalAction({
                    ...proposalObj,
                    proposalDate: moment().format("YYYY-MM-DD"),
                })
            );
        } else {
            dispatch(addProposalAction(proposalObj, employee?.id));
        }
        setDialogSave(true);
    };

    const columns = [
        {
            title: "Thao tác",
            field: "custom",
            align: "center",
            maxWidth: "140px",
            render: (rowData) => {
                return (
                    <div className="">
                        {STATUS_EMPLOYEE.EDIT.includes(rowData.proposalStatus) && (
                            <IconButton
                                size="small"
                                onClick={() =>
                                    setProposalObj({
                                        ...rowData,
                                        proposalDate: moment(rowData?.proposalDate).format(
                                            "YYYY-MM-DD"
                                        ),
                                    })
                                }
                            >
                                <Icon fontSize="small" color="primary">
                                    edit
                                </Icon>
                            </IconButton>
                        )}
                        {rowData?.proposalStatus === 1 && (
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
                        {STATUS_EMPLOYEE.NOTIFY.includes(rowData.proposalStatus) && (
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
            title: "Ngày đề xuất",
            field: "proposalDate",
            align: "center",
            minWidth: "80px",
            render: (data) => (
                <span>{moment(data?.proposalDate).format("DD/MM/YYYY")}</span>
            ),
        },
        {
            title: "Loại đề xuất",
            field: "type",
            align: "left",
            minWidth: "200px",
            maxWidth: "220px",
            render: (data) => <span>{`${TYPE_PROPOSAL[data?.type - 1].name}`}</span>,
        },
        {
            title: "Nội dung",
            field: "content",
            align: "center",
            minWidth: "80px",
            render: (rowData) => <span className="text-wrapper-overflow-form">{rowData?.content}</span>
        },
        {
            title: "Mô tả",
            field: "detailedDescription",
            align: "left",
            minWidth: "120px",
            render: (rowData) => <span className="text-wrapper-overflow-form">{rowData?.detailedDescription}</span>
        },
        {
            title: "Ghi chú",
            field: "note",
            align: "center",
            minWidth: "160px",
            maxWidth: "260px",
            render: (rowData) => <span className="text-wrapper-overflow-form">{rowData?.note}</span>
        },
        {
            title: "Trạng thái",
            field: "proposalStatus",
            align: "left",
            minWidth: "120px",
            render: (data) => <span>{`${STATUS[data?.proposalStatus].name}`}</span>,
        },
    ];

    useEffect(() => {
        updateDataPage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagnition, proposal]);

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
                                Ngày đề xuất
                            </span>
                        }
                        type="date"
                        name="proposalDate"
                        value={proposalObj?.proposalDate}
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
                        errorMessages={["Ngày đề xuất không được để trống"]}
                    />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <SelectValidator
                        className="w-100 stylePlaceholder"
                        size="small"
                        label={
                            <span style={{ color: "black" }}>
                                <span style={{ color: "red" }}> * </span>
                                Loại đề xuất
                            </span>
                        }
                        variant="outlined"
                        type="text"
                        name="type"
                        value={proposalObj?.type}
                        onChange={handleChangeValue}
                        validators={["required"]}
                        errorMessages={["Trường này không được để trống!"]}
                    >
                        {TYPE_PROPOSAL.map((item) => (
                            <MenuItem value={item.id} key={item.id}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </SelectValidator>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <TextValidator
                        className="w-100 stylePlaceholder mt-2"
                        size="small"
                        label={
                            <span style={{ color: "black" }}>
                                <span style={{ color: "red" }}> * </span>
                                Nội dung
                            </span>
                        }
                        variant="outlined"
                        type="text"
                        name="content"
                        value={proposalObj?.content}
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
                                Mô tả chi tiết
                            </span>
                        }
                        variant="outlined"
                        type="text"
                        name="detailedDescription"
                        value={proposalObj?.detailedDescription}
                        onChange={handleChangeValue}
                        validators={["required"]}
                        errorMessages={["Mô tả chi tiết không được để trống!"]}
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
                        value={proposalObj?.note}
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
                        onClick={() => setProposalObj(initialValue)}
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
                data={dataPage ? dataPage.map((proposal) => ({ ...proposal })) : []}
                columns={columns}
                setPagnition={setPagnition}
                pagnition={pagnition}
                totalElements={totalElements}
            />
            {dialogViewCV && (
                <FormProposal
                    open={dialogViewCV}
                    setOpen={setDialogViewCV}
                    employeeData={employee}
                    proposalObj={proposalObj}
                />
            )}
            {dialogSave && (
                <FormProposal
                    open={dialogSave}
                    setOpen={setDialogViewCV}
                    setOpenDialog={setOpenDialog}
                    employeeData={employee}
                    proposalObj={proposalObj}
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

export default TabPropose;
