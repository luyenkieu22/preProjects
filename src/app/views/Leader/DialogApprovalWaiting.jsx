import React, { useState } from "react";
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
} from "@material-ui/core";
import TabCV from "./customTabs/TabCV";
import TabCurriculumVitae from "./customTabs/TabCurriculumVitae";
import TabCertificate from "./customTabs/TabCertificate";
import DialogAdditionalRequest from "../../component/customDialog/DialogAdditionalRequest";
import DialogApprove from "../../component/customDialog/DialogApprove";
import DialogReject from "../../component/customDialog/DialogReject";
import { useDispatch, useSelector } from "react-redux";
import { editEmployeeAction } from "app/redux/actions/employeesAction";
import DialogSendLeader from "../../component/customDialog/DialogSendLeader";

const useStyles = makeStyles({
    title: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: "10px",
    },
});

const DialogApprovalWaiting = ({
    open,
    setOpen,
    leader,
    canUpdate,
    sendLeader,
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { employee } = useSelector(state => state.employees)
    const [tabStatus, setTabStatus] = useState(1);
    const [openDialogApproval, setOpenDialogApproval] = useState(false);
    const [openDialogAdditional, setOpenDialogAdditional] = useState(false);
    const [openDialogReject, setOpenDialogReject] = useState(false);
    const [openDialogSendLeader, setOpenDialogSendLeader] = useState(false);
    const [activity, setActivity] = useState(employee?.activity);
    const [skill, setSkill] = useState(employee?.skill);

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleChangeTab = (e, newTab) => {
        setTabStatus(newTab);
    };

    const handleApprove = (data) => {
        dispatch(
            editEmployeeAction({
                ...employee,
                appointmentDate: data?.appointmentDate,
                submitProfileStatus: "3",
            })
        );
        setOpen(false);
    };

    const handleAdditionalRequest = (data) => {
        dispatch(
            editEmployeeAction({
                ...employee,
                additionalRequest: data?.additionalRequest,
                submitProfileStatus: "4",
            })
        );
        setOpen(false);
    };

    const handleSaveCV = () => {
        dispatch(
            editEmployeeAction({
                ...employee,
                activity: activity,
                skill: skill,
            })
        );
    };
    const handleReject = (data) => {
        dispatch(
            editEmployeeAction({
                ...employee,
                ...data,
                submitProfileStatus: "5",
            })
        );
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleCloseDialog}
            maxWidth="lg"
            fullWidth={true}
        >
            <DialogTitle>
                <Box className={classes.title}>
                    <Typography variant="h5">Thông tin nhân viên</Typography>
                    <IconButton
                        className="position-absolute r-10 t-10"
                        onClick={handleCloseDialog}
                    >
                        <Icon color="default" title="close">
                            close
                        </Icon>
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={2}>
                        <Tabs
                            orientation="vertical"
                            variant="fullWidth"
                            indicatorColor="primary"
                            value={tabStatus}
                            onChange={handleChangeTab}
                        >
                            <Tab value={1} label="CV" />
                            <Tab value={2} label="Sơ yếu lý lịch" />
                            <Tab value={3} label="Thông tin văn bằng" />
                        </Tabs>
                    </Grid>
                    <Grid item xs={10} style={{ height: "500px", overflow: "scroll" }}>
                        {tabStatus === 1 ? (
                            <TabCV
                                canUpdate={canUpdate}
                                skill={skill}
                                setSkill={setSkill}
                                activity={activity}
                                setActivity={setActivity}
                            />
                        ) : tabStatus === 2 ? (
                            <TabCurriculumVitae />
                        ) : (
                            tabStatus === 3 && <TabCertificate />
                        )}
                    </Grid>
                </Grid>
            </DialogContent>
            <Grid>
                {openDialogApproval && (
                    <DialogApprove
                        open={openDialogApproval}
                        setOpen={setOpenDialogApproval}
                        handleApprove={handleApprove}
                        data={{ appointmentDate: employee?.appointmentDate || "" }}
                    />
                )}
                {openDialogAdditional && (
                    <DialogAdditionalRequest
                        open={openDialogAdditional}
                        setOpen={setOpenDialogAdditional}
                        handleAdditional={handleAdditionalRequest}
                        data={{ additionalRequest: employee?.additionalRequest || "" }}
                    />
                )}
                {openDialogReject && (
                    <DialogReject
                        open={openDialogReject}
                        setOpen={setOpenDialogReject}
                        handleReject={handleReject}
                        data={{
                            reasonForRejection: employee?.reasonForRejection || "",
                            rejectionDate: employee?.rejectionDate || "",
                        }}
                    />
                )}
                {openDialogSendLeader && (
                    <DialogSendLeader
                        open={openDialogSendLeader}
                        setOpen={setOpenDialogSendLeader}
                        setOpenRequest={setOpen}
                    />
                )}
            </Grid>
            <DialogActions>
                <Button
                    onClick={handleCloseDialog}
                    variant="contained"
                    color="secondary"
                >
                    Hủy
                </Button>
                {employee?.submitProfileStatus === "2" && leader && (
                    <>
                        <Button
                            onClick={() => setOpenDialogReject(true)}
                            variant="contained"
                            color="secondary"
                        >
                            Từ chối
                        </Button>
                        <Button
                            onClick={() => setOpenDialogAdditional(true)}
                            variant="contained"
                            color="primary"
                        >
                            Yêu cầu bổ sung
                        </Button>
                        <Button
                            onClick={() => setOpenDialogApproval(true)}
                            variant="contained"
                            color="primary"
                        >
                            Duyệt
                        </Button>
                    </>
                )}
                {sendLeader && (
                    <>
                        <Button
                            onClick={handleSaveCV}
                            variant="contained"
                            color="secondary"
                        >
                            Lưu
                        </Button>
                        <Button
                            onClick={() => setOpenDialogSendLeader(true)}
                            variant="contained"
                            color="primary"
                        >
                            Trình lãnh đạo
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default DialogApprovalWaiting;
