import React, { useState } from "react";
import {
    DialogActions,
    Button,
    IconButton,
    Icon,
    Dialog,
    DialogTitle,
    DialogContent,
    makeStyles,
    Box,
    Typography,
    TextField,
} from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import "../../../styles/views/_form.scss";
import moment from "moment";
import DialogApprove from "../customDialog/DialogApprove";
import { POSITION } from "app/const/statusEmployee";
import DialogAdditionalRequest from "../customDialog/DialogAdditionalRequest";
import DialogReject from "../customDialog/DialogReject";
import { useDispatch } from "react-redux";
import { editEmployeeAction } from "app/redux/actions/employeesAction";

const useStyles = makeStyles({
    titleDialog: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
});

const FormEnd = ({
    open,
    setOpen,
    setOpenDialog,
    canUpdate,
    leader,
    employeeData,
}) => {
    const classes = useStyles();
    const [endDate, setEndDate] = useState(
        employeeData?.endDay
            ? moment(employeeData?.endDay).format("YYYY-MM-DD")
            : moment().format("YYYY-MM-DD")
    );
    const [reason, setReason] = useState(
        employeeData?.reasonForEnding || "Vì lý do: "
    );
    const [dialogApproval, setDialogApproval] = useState(false);
    const [dialogAdditionalRequest, setDialogAdditionalRequest] = useState(false);
    const [dialogReject, setDialogReject] = useState(false);
    const dispatch = useDispatch();

    const handleChangeValue = (e) => {
        const value = e.target.value;
        if (value.length < 10) {
            setReason("Vì lý do: ");
        } else {
            setReason(value);
        }
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleApprove = (data) => {
        dispatch(
            editEmployeeAction({
                ...employeeData,
                terminationAppointmentDate: data?.terminationAppointmentDate,
                submitProfileStatus: 7,
            })
        );
        setOpen(false);
    };

    const handleAdditional = (data) => {
        dispatch(
            editEmployeeAction({
                ...employeeData,
                ...data,
                additionalRequestTermination: data?.additionalRequestTermination,
                submitProfileStatus: 8,
            })
        );
        setOpen(false);
    };
    const handleReject = (data) => {
        dispatch(
            editEmployeeAction({
                ...employeeData,
                ...data,
                submitProfileStatus: 9,
            })
        );
        setOpen(false);
    };

    const handleSendLeader = () => {
        dispatch(
            editEmployeeAction({
                ...employeeData,
                endDay: endDate,
                submitProfileStatus: 6,
            })
        );
        setOpenDialog(false);
        setOpen(false);
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
                    <Typography variant="h5" color="textPrimary" className="font-bold">
                        Đơn xin nghỉ việc
                    </Typography>
                    <IconButton onClick={handleCloseDialog}>
                        <Icon color="default" title="close">
                            close
                        </Icon>
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent dividers className="wrapper-dialog">
                <Box className="dialog-body">
                    <Typography className="flex-center font-bold text-xl">
                        CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                    </Typography>
                    <Typography className="flex-center text-underline font-bold text-xl">
                        Độc lập - tự do - Hạnh phúc
                    </Typography>
                    <Typography className="flex-center mt-32 font-bold text-xl">
                        ĐƠN XIN NGHỈ VIỆC
                    </Typography>
                    <Typography className="mt-32">
                        Kính gửi: Ban giám đốc công ty{" "}
                        <span className="font-bold">OCEANTEACH</span>
                    </Typography>
                    <Typography className="">Tên tôi là: {employeeData?.name}</Typography>
                    <Typography className="">
                        Hiện tại đang là{" "}
                        {
                            POSITION.find(
                                (item) => item.id === employeeData?.currentPosition ?? 1
                            )?.value
                        }
                    </Typography>
                    <Box className="flex">
                        <Typography>
                            Tôi làm đơn này, đề nghị Ban Giám Đốc cho tôi xin nghỉ việc từ
                            ngày {moment(endDate).format("DD/MM/YYYY").split("/")[0]}
                            tháng {moment(endDate).format("DD/MM/YYYY").split("/")[1]}
                            năm {moment(endDate).format("DD/MM/YYYY").split("/")[2]}
                        </Typography>
                        {canUpdate && (
                            <TextField
                                type="date"
                                className="ml-10 pt-2 end-day"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        )}
                    </Box>
                    <Box className="relative">
                        <TextField
                            multiline
                            className="ml-10 underline-dash"
                            fullWidth
                            value={reason}
                            onChange={handleChangeValue}
                            InputProps={{
                                disableUnderline: true
                            }}
                        />
                    </Box>
                    <Typography className="mb-12">
                        Trong thời gian chờ đợi sự chấp nhận của Ban Giám Đốc Công ty, tôi sẽ tiếp tục làm việc nghiêm túc và chấp hành bàn giao công việc cũng như tài sản cho người quảng lý trực tiếp của tôi là ông/bà <span className="font-bold">{employeeData?.leaderName}</span>
                    </Typography>
                    <Typography>
                        Tôi xin chân thành cảm ơn!
                    </Typography>

                    <Box className="flex-between mt-32">
                        <Box></Box>
                        <Box className="px-32">
                            <Typography className="flex-center">
                                Hà Nội, Ngày {moment(endDate).format("DD/MM/YYYY").split("/")[0]}
                                tháng {moment(endDate).format("DD/MM/YYYY").split("/")[1]}
                                năm {moment(endDate).format("DD/MM/YYYY").split("/")[2]}
                            </Typography>
                            <Typography className="flex-center font-bold">
                                Người làm đơn
                            </Typography>
                            <Typography className="flex-center italic">
                                (Ký, ghi rõ họ tên)
                            </Typography>
                            <div className="mt-32 flex-center">
                                <span className="sign-text">{employeeData?.name}</span>
                            </div>
                        </Box>
                    </Box>
                    {dialogApproval && (
                        <DialogApprove
                            open={dialogApproval}
                            setOpen={setDialogApproval}
                            data={{ terminationAppointmentDate: employeeData?.terminationAppointmentDate || "" }}
                            handleApprove={handleApprove}
                        />
                    )}
                    {dialogAdditionalRequest && (
                        <DialogAdditionalRequest
                            open={dialogAdditionalRequest}
                            setOpen={setDialogAdditionalRequest}
                            data={{ additionalRequestTermination: employeeData?.additionalRequestTermination || "" }}
                            handleAdditional={handleAdditional}
                        />
                    )}
                    {dialogReject && (
                        <DialogReject
                            open={dialogReject}
                            setOpen={setDialogReject}
                            data={{
                                reasonForRefuseEndProfile: employeeData?.reasonForRefuseEndProfile || "",
                                refuseEndProfileDay: employeeData?.refuseEndProfileDay || "",
                            }}
                            handleReject={handleReject}
                        />
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <div className="button-group">
                    <Button
                        variant="contained"
                        className="mr-12"
                        color="secondary"
                        onClick={handleCloseDialog}
                    >
                        Hủy
                    </Button>
                    {leader ? (
                        <>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setDialogApproval(true)}
                            >
                                Phê duyệt
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setDialogAdditionalRequest(true)}
                            >
                                Yêu cầu bổ sung
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setDialogReject(true)}
                            >
                                Từ chối
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            className="mr-12"
                            color="primary"
                            onClick={handleSendLeader}
                        >
                            Trình lãnh đạo
                        </Button>
                    )}
                </div>
            </DialogActions>
        </Dialog>
    );
};

export default FormEnd;
