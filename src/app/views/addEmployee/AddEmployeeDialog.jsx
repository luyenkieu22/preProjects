import React, { useEffect, useRef, useState } from "react";
import {
    DialogActions,
    Button,
    IconButton,
    Icon,
    Dialog,
    DialogTitle,
    DialogContent,
    Tab,
    Tabs,
    makeStyles,
    Box,
    Typography,
} from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import "../../../styles/views/_style.scss";
import { toast } from "react-toastify";
import EmployeeInformation from "app/component/employeeTabs/EmployeeInformation";
import CertificateInformation from "app/component/employeeTabs/CertificateInformation";
import FamilyInformation from "app/component/employeeTabs/FamilyInformation";
import { useDispatch, useSelector } from "react-redux";
import { editEmployeeAction, uploadFileAction } from "app/redux/actions/employeesAction";
import DialogApprovalWaiting from "../Leader/DialogApprovalWaiting";
import { STATUS_EMPLOYEE } from "app/const/statusEmployee";

toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
});

const useStyles = makeStyles({
    titleDialog: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
});

const AddEmployeeDialog = ({
    open,
    setOpen,
}) => {
    const refInformation = useRef();
    const { employee, file } = useSelector(
        (state) => state.employees
    );
    const classes = useStyles();
    const dispatch = useDispatch();
    const [statusTabs, setStatusTabs] = useState(1);
    const [changeTab, setChangeTab] = useState(false);
    const [sendLeaderDialog, setSendLeaderDialog] = useState(false);

    const [employeeObject, setEmployeeObject] = useState({
        id: employee?.id || "",
        name: employee?.name || "",
        code: employee?.code || "",
        email: employee?.gender || "",
        gender: employee?.dateOfBirth || "",
        dateOfBirth: employee?.address || "",
        address: employee?.team || "",
        team: employee?.email || "",
        image: employee?.image ? employee?.image : "/assets/images/avatar.jpg",
        phone: employee?.phone || "",
        citizenIdentificationNumber:
            employee?.citizenIdentificationNumber || "",
        employeeFamilyDtos: employee?.employeeFamilyDtos || [],
        certificatesDto: employee?.certificatesDto || [],
        ethnic: employee?.ethnic || "",
        religion: employee?.religion || "",
        dateOfIssuanceCard: employee?.dateOfIssuanceCard || "",
        placeOfIssueCard: employee?.placeOfIssueCard || "",
    });

    useEffect(() => {
        setChangeTab(employee?.id ? true : false);
    }, [employee.id]);

    useEffect(() => {
        if (employee?.id) {
            setEmployeeObject({
                ...employeeObject,
                ...employee,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employee]);

    const handleChangeValue = (e) => {
        const { value, name } = e.target;
        if (name === "image") {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setEmployeeObject({
                    ...employeeObject,
                    [name]: reader.result,
                });
                dispatch(uploadFileAction(file));
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        } else {
            setEmployeeObject({ ...employeeObject, [name]: value });
        }
    };



    const handleChangeTab = (e, newTab) => {
        if (changeTab) {
            setStatusTabs(newTab);
        } else if (newTab !== 1) {
            toast.error("Vui lòng lưu thông tin nhân viên trước!");
        }
    };

    const handleSendLeader = () => {
        setSendLeaderDialog(true);
        dispatch(editEmployeeAction(employeeObject, file))
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setEmployeeObject([]);
    };

    const handleSubmitForm = () => {
        if (statusTabs === 1) refInformation.current.submit();
    };

    return (
        <Dialog
            open={open}
            maxWidth="md"
            fullWidth={true}
            onClose={handleCloseDialog}
        >
            <DialogTitle id="draggable-dialog-title">
                <Box className={classes.titleDialog}>
                    <Typography variant="h5" color="textPrimary">
                        {employeeObject?.id ? "Cập nhật nhân viên" : "Tạo mới nhân viên"}
                    </Typography>
                    <IconButton
                        className="position-absolute r-10 t-10"
                        onClick={handleCloseDialog}
                    >
                        <Icon color="default" title="close">
                            close
                        </Icon>
                    </IconButton>
                </Box>
                <Tabs
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    value={statusTabs}
                    onChange={handleChangeTab}
                    centered
                >
                    <Tab label="Thông tin nhân viên" value={1} />
                    <Tab label="Thông tin chứng chỉ" value={2} />
                    <Tab label="Quan hệ gia đình" value={3} />
                </Tabs>
            </DialogTitle>
            <DialogContent dividers>
                {statusTabs === 1 ? (
                    <EmployeeInformation
                        refInformation={refInformation}
                        employee={employeeObject}
                        setOpen={setOpen}
                        setChangeTab={setChangeTab}
                        handleChangeValue={handleChangeValue}
                    />
                ) : statusTabs === 2 ? (
                    <CertificateInformation />
                ) : (
                    statusTabs === 3 && <FamilyInformation />
                )}
                {sendLeaderDialog && (
                    <DialogApprovalWaiting
                        canUpdate={
                            STATUS_EMPLOYEE.EDIT_CV.includes(employee?.submitProfileStatus)
                                ? true
                                : false
                        }
                        sendLeader={true}
                        open={sendLeaderDialog}
                        setOpenDialogEmployee={setOpen}
                        setOpen={setSendLeaderDialog}
                    />
                )}
            </DialogContent>
            <DialogActions>
                <div className="flex flex-space-between flex-middle mt-10">
                    <Button
                        variant="contained"
                        className="mr-12"
                        color="secondary"
                        onClick={handleCloseDialog}
                    >
                        Hủy
                    </Button>
                    {changeTab && (
                        <Button
                            variant="contained"
                            className="mr-12"
                            color="primary"
                            onClick={handleSendLeader}
                        >
                            Đăng ký
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        className="mr-12"
                        color="primary"
                        onClick={handleSubmitForm}
                    >
                        Lưu
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    );
};

export default AddEmployeeDialog;
