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
} from "@material-ui/core";
import TabCV from "./customTabs/TabCV";
import TabCurriculumVitae from "./customTabs/TabCurriculumVitae";
import TabCertificate from "./customTabs/TabCertificate";
import DialogAdditionalRequest from "../../component/customDialog/DialogAdditionalRequest";
import DialogApprove from "../../component/customDialog/DialogApprove";
import DialogReject from "../../component/customDialog/DialogReject";
import { useDispatch } from "react-redux";
import { editEmployeeAction } from "app/redux/actions/employeesAction";
import DialogSendLeader from "../../component/customDialog/DialogSendLeader";
import { getExperienceByEmployeeAction } from "app/redux/actions/experiencesAction";

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
    employeeData,
    leader,
    canUpdate,
    sendLeader,
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [tabStatus, setTabStatus] = useState(1);
    const [openDialogApproval, setOpenDialogApproval] = useState(false);
    const [openDialogAdditional, setOpenDialogAdditional] = useState(false);
    const [openDialogReject, setOpenDialogReject] = useState(false);
    const [openDialogSendLeader, setOpenDialogSendLeader] = useState(false);
    const [activity, setActivity] = useState(employeeData?.activity);
    const [skill, setSkill] = useState(employeeData?.skill);

    useEffect(() => {
        dispatch(getExperienceByEmployeeAction(employeeData?.id));
    }, [dispatch, employeeData.id]);


    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleChangeTab = (e, newTab) => {
        setTabStatus(newTab);
    };

    const handleApprove = (data) => {
        dispatch(
            editEmployeeAction({
                ...employeeData,
                appointmentDate: data?.appointmentDate,
                submitProfileStatus: "3",
            })
        );
        setOpen(false);
    };

    const handleAdditionalRequest = (data) => {
        dispatch(
            editEmployeeAction({
                ...employeeData,
                additionalRequest: data?.additionalRequest,
                submitProfileStatus: "4",
            })
        );
        setOpen(false);
    };

    const handleSaveCV = () => {
        dispatch(
            editEmployeeAction({
                ...employeeData,
                activity: activity,
                skill: skill,
            })
        );
    };
    const handleReject = (data) => {
        dispatch(
            editEmployeeAction({
                ...employeeData,
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
                                employeeData={employeeData}
                                canUpdate={canUpdate}
                                skill={skill}
                                setSkill={setSkill}
                                activity={activity}
                                setActivity={setActivity}
                            />
                        ) : tabStatus === 2 ? (
                            <TabCurriculumVitae employeeData={employeeData} />
                        ) : (
                            tabStatus === 3 && <TabCertificate employeeData={employeeData} />
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
                        data={{ appointmentDate: employeeData?.appointmentDate || "" }}
                    />
                )}
                {openDialogAdditional && (
                    <DialogAdditionalRequest
                        open={openDialogAdditional}
                        setOpen={setOpenDialogAdditional}
                        handleAdditional={handleAdditionalRequest}
                        data={{ additionalRequest: employeeData?.additionalRequest || "" }}
                    />
                )}
                {openDialogReject && (
                    <DialogReject
                        open={openDialogReject}
                        setOpen={setOpenDialogReject}
                        handleReject={handleReject}
                        data={{
                            reasonForRejection: employeeData?.reasonForRejection || "",
                            rejectionDate: employeeData?.rejectionDate || "",
                        }}
                    />
                )}
                {openDialogSendLeader && (
                    <DialogSendLeader
                        employeeData={employeeData}
                        open={openDialogSendLeader}
                        setOpen={setOpenDialogSendLeader}
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
                {employeeData?.submitProfileStatus === "2" && leader && (
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
