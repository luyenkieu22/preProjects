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
    TYPE_PROPOSAL,
} from "app/const/statusEmployee";
import { Visibility } from "@material-ui/icons";
import DialogApprovalWaiting from "./DialogApprovalWaiting";
import { getCertificateByEmployeeAction } from "app/redux/actions/certificatesAction";
import { getFamilyByEmployeeIdAction } from "app/redux/actions/familyAction";
import { getProposalByLeaderAction } from "app/redux/actions/proposalAction";
import FormProposal from "app/component/employeeForm/FormProposal";
import "../../../styles/views/_style.scss"

const WaitingPropose = () => {
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
    const { proposal, totalElements, isLoading } = useSelector(
        (state) => state.proposal
    );

    const updateDataTable = useCallback(() => {
        const startOfPage = pagnition.page * pagnition.rowsPerPage;
        const endOfPage = (pagnition.page + 1) * pagnition.rowsPerPage;
        const pageData = proposal.slice(startOfPage, endOfPage);
        setDataTable(pageData);
    }, [pagnition.page, pagnition.rowsPerPage, proposal]);

    useEffect(() => {
        updateDataTable();
    }, [updateDataTable, pagnition, proposal]);

    useEffect(() => {
        dispatch(getProposalByLeaderAction());
    }, [dispatch, isLoading]);


    const handleApplicationForm = (data) => {
        dispatch(getEmployeesAction(data?.employeeId))
        setOpenDialogApplication(true);
        setItem(data);
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
                        {STATUS_EMPLOYEE.WAITING_APPROVAL.includes(rowData.proposalStatus) &&
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
            field: "proposalDate",
            align: "center",
            minWidth: "100px",
            maxWidth: "100px",
            render: (data) => (
                <span>{moment(new Date(data?.proposalDate)).format("DD/MM/YYYY")}</span>
            ),
        },
        {
            title: "Loại đề xuất",
            field: "type",
            align: "left",
            minWidth: "120px",
            render: (data) => <span>{TYPE_PROPOSAL[data?.type]?.name}</span>
        },
        {
            title: "Mô tả chi tiết",
            field: "detailedDescription",
            align: "left",
            minWidth: "120px",
            render: (data) => <span className="text-wrapper-overflow-form">{data?.detailedDescription}</span>
        },
        {
            title: "Nội dung",
            field: "content",
            align: "left",
            minWidth: "130px",
            render: (data) => <span className="text-wrapper-overflow-form">{data?.content}</span>
        },
        {
            title: "Ghi chú",
            field: "note",
            align: "left",
            minWidth: "160px",
            render: (data) => <span className="text-wrapper-overflow-form">{data?.note}</span>
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
                        <FormProposal
                            employeeData={employees}
                            proposalObj={item}
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

export default WaitingPropose;
