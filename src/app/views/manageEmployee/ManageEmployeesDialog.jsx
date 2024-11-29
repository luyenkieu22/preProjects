import React, { useEffect, useState } from "react";
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
    Grid,
    Avatar,
    TextField,
} from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import "../../../styles/views/_style.scss";
import { toast } from "react-toastify";
import DialogApprovalWaiting from "../Leader/DialogApprovalWaiting";
import { GENDER } from "app/const/statusEmployee";
import moment from "moment";
import TabSalaryIncrease from "./customTabs/TabSalaryIncrease";
import TabPropose from "./customTabs/TabProposal";
import TabProcess from "./customTabs/TabProcess";
import FormEnd from "app/component/employeeForm/FormEnd";
import { useSelector } from "react-redux";

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
    },
});

const ManageEmployeesDialog = ({
    open,
    setOpen,
}) => {
    const classes = useStyles();
    const { employee } = useSelector(state => state.employees)
    const [statusTabs, setStatusTabs] = useState(1);
    const [changeTab, setChangeTab] = useState(false);
    const [showCV, setShowCV] = useState(false);
    const [endForm, setEndForm] = useState(false);
    const [employeeObject, setEmployeeObject] = useState({
        ...employee,
        id: employee?.id || "",
        name: employee?.name || "",
        code: employee?.code || "",
        email: employee?.gender || "",
        gender: employee?.dateOfBirth || "",
        dateOfBirth: employee?.address || "",
        address: employee?.team || "",
        team: employee?.email || "",
        image: employee?.image || "/assets/images/avatar.jpg",
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

    const handleChangeTab = (e, newTab) => {
        if (changeTab) {
            setStatusTabs(newTab);
        } else if (newTab !== 1) {
            toast.error("Vui lòng lưu thông tin nhân viên trước!");
        }
    };

    const handleShowCV = () => {
        setShowCV(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setEmployeeObject([]);
    };

    return (
        <Dialog
            open={open}
            maxWidth="lg"
            fullWidth={true}
            onClose={handleCloseDialog}
        >
            <DialogTitle id="draggable-dialog-title">
                <Box className={classes.titleDialog}>
                    <Typography variant="h5" color="textPrimary">
                        Cập nhật diễn biến
                    </Typography>
                    <IconButton onClick={handleCloseDialog}>
                        <Icon color="default" title="close">
                            close
                        </Icon>
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2} style={{ marginBottom: "14px" }}>
                    <Grid
                        container
                        item
                        className="container-avatar"
                        xs={12}
                        sm={12}
                        md={4}
                        lg={3}
                    >
                        <Grid item>
                            <Avatar
                                className="avatar"
                                alt="Avatar"
                                src={employeeObject.image}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} item md={8} lg={9} xs={12} sm={12}>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <TextField
                                className="w-100 stylePlaceholder mt-2"
                                size="small"
                                label={
                                    <span style={{ color: "black" }}>
                                        <span style={{ color: "red" }}> * </span>
                                        Mã nhân viên
                                    </span>
                                }
                                disabled
                                variant="outlined"
                                type="text"
                                name="code"
                                value={employeeObject.code || ""}
                            />
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <TextField
                                className="w-100 stylePlaceholder mt-2"
                                size="small"
                                label={
                                    <span style={{ color: "black" }}>
                                        <span style={{ color: "red" }}> * </span>
                                        Tên nhân viên
                                    </span>
                                }
                                variant="outlined"
                                disabled
                                type="text"
                                name="name"
                                value={employeeObject?.name}
                            />
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <TextField
                                className="w-100 stylePlaceholder"
                                label={
                                    <span style={{ color: "black" }}>
                                        <span style={{ color: "red" }}> * </span>
                                        Ngày sinh
                                    </span>
                                }
                                type="date"
                                name="dateOfBirth"
                                value={
                                    employeeObject?.dateOfBirth
                                        ? moment(employeeObject?.dateOfBirth).format("YYYY-MM-DD")
                                        : ""
                                }
                                fullWidth
                                variant="outlined"
                                disabled
                                size="small"
                            />
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <TextField
                                className="w-100 stylePlaceholder mt-2"
                                size="small"
                                label={
                                    <span style={{ color: "black" }}>
                                        <span style={{ color: "red" }}> * </span>
                                        Email
                                    </span>
                                }
                                variant="outlined"
                                disabled
                                type="email"
                                name="email"
                                value={employeeObject.email}
                            />
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <TextField
                                className="w-100 stylePlaceholder mt-2"
                                size="small"
                                label={
                                    <span style={{ color: "black" }}>
                                        <span style={{ color: "red" }}> * </span>
                                        Giới tính
                                    </span>
                                }
                                variant="outlined"
                                disabled
                                type="text"
                                name="gender"
                                value={GENDER[employeeObject?.gender]?.name}
                            />
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <TextField
                                className="w-100 stylePlaceholder"
                                size="small"
                                label={
                                    <span style={{ color: "black" }}>
                                        <span style={{ color: "red" }}> * </span>
                                        SĐT
                                    </span>
                                }
                                variant="outlined"
                                disabled
                                type="number"
                                name="phone"
                                value={employeeObject?.phone}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className="w-100 stylePlaceholder"
                                size="small"
                                label={
                                    <span style={{ color: "black" }}>
                                        <span style={{ color: "red" }}> * </span>
                                        Địa chỉ
                                    </span>
                                }
                                variant="outlined"
                                disabled
                                type="text"
                                name="address"
                                value={employeeObject?.address}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Tabs
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    value={statusTabs}
                    onChange={handleChangeTab}
                    centered
                >
                    <Tab label="Tăng lương" value={1} />
                    <Tab label="Đề xuất" value={2} />
                    <Tab label="Thăng chức" value={3} />
                </Tabs>
                {statusTabs === 1 ? (
                    <TabSalaryIncrease setOpenDialog={setOpen} />
                ) : statusTabs === 2 ? (
                    <TabPropose setOpenDialog={setOpen} />
                ) : (
                    statusTabs === 3 && <TabProcess setOpenDialog={setOpen} />
                )}
                {showCV && (
                    <DialogApprovalWaiting
                        open={showCV}
                        setOpen={setShowCV}
                    />
                )}
                {endForm &&
                    <FormEnd
                        open={endForm}
                        setOpen={setEndForm}
                        setOpenDialog={setOpen}
                        canUpdate={true}
                    />
                }
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
                    <Button
                        variant="contained"
                        className="mr-12"
                        color="primary"
                        onClick={handleShowCV}
                    >
                        Xem thông tin
                    </Button>
                    <Button
                        variant="contained"
                        className="mr-12"
                        color="primary"
                        onClick={() => setEndForm(true)}
                    >
                        Kết thúc
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    );
};

export default ManageEmployeesDialog;
