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
    Grid,
} from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import "../../../styles/views/_form.scss"
import moment from "moment";
import DialogApprove from "../customDialog/DialogApprove";
import { useDispatch } from "react-redux";
import { editSalaryIncreaseAction } from "app/redux/actions/salaryIncreaseAction";
import DialogAdditionalRequest from "../customDialog/DialogAdditionalRequest";
import DialogReject from "../customDialog/DialogReject";
import DialogFormSendLeader from "../customDialog/DialogFormSendLeader";

const useStyles = makeStyles({
    titleDialog: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
});

const FormSalaryIncrease = ({
    open,
    setOpen,
    setOpenDialog,
    employeeData,
    salaryObj,
    leader,
    save
}) => {
    const classes = useStyles();
    const [dialogApproval, setDialogApproval] = useState(false);
    const [dialogAdditionalRequest, setDialogAdditionalRequest] = useState(false);
    const [dialogReject, setDialogReject] = useState(false);
    const [dialogLeader, setDialogLeader] = useState(false);
    const dispatch = useDispatch()
    const dateSalary = moment(salaryObj?.startDate).format("DD/MM/YYYY").split("/")
    const dateEmployee = moment(employeeData?.submitDay).format("DD/MM/YYYY").split("/")

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleApprove = (data) => {
        dispatch(editSalaryIncreaseAction({
            ...salaryObj,
            acceptanceDate: data.acceptanceDate,
            salaryIncreaseStatus: 3,
        }))
        setOpen(false)
    };

    const handleAdditional = (data) => {
        dispatch(editSalaryIncreaseAction({
            ...salaryObj,
            additionalRequest: data.additionalRequest,
            salaryIncreaseStatus: 4,
        }))
        setOpen(false)
    };
    const handleReject = (data) => {
        dispatch(editSalaryIncreaseAction({
            ...salaryObj,
            ...data,
            salaryIncreaseStatus: 5,
        }))
        setOpen(false)
    };

    const handleSendLeader = leaderId => {
        dispatch(editSalaryIncreaseAction({
            ...salaryObj,
            leaderId: leaderId,
            salaryIncreaseStatus: 2,
        }))
        setOpen(false)
        setOpenDialog(false)
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
                        Đề xuất tăng lương
                    </Typography>
                    <IconButton
                        onClick={handleCloseDialog}
                    >
                        <Icon color="default" title="close">
                            close
                        </Icon>
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent dividers className="wrapper-dialog">
                <Box className="dialog-body">
                    <Grid container item xs={12} className="container-form">
                        <Grid item xs={4}>
                            <Typography className="flex-center">CÔNG TY OCEANTECH</Typography>
                            <Typography className="flex-center font-bold">SỐ {employeeData?.id}/ QĐ - TL</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Box className="flex-center">
                                <Typography className="text-overflow font-bold">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</Typography>
                            </Box>
                            <Box className="flex-center">
                                <Typography className="text-overflow text-underline font-bold">Độc lập - tự do - Hạnh phúc</Typography>
                            </Box>
                            <Box className="flex-center">
                                <Typography className="text-overflow line-height-25 italic">
                                    {`Hà Nội, ngày ${dateSalary[0]} tháng ${dateSalary[1]} năm ${dateSalary[2]}`}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Typography className="flex-center mt-32 font-bold">QUYẾT ĐỊNH</Typography>
                    <Typography className="flex-center pb-12 italic mb-20 font-bold">
                        V/v tăng lương cho người lao động
                    </Typography>
                    <Typography className="italic">
                        - Căn cứ vào Điều lệ, nội quy, quy chế của Công ty OCEANTECH.
                    </Typography>
                    <Typography className="italic">
                        - Căn cứ vào hợp đồng số được ký giữa Công ty OCEANTECH và Ông/Bà:{' '}
                        <span className="font-bold">{employeeData?.name}</span> {`ngày ${dateEmployee[0]} 
                            tháng ${dateEmployee[1]} 
                            năm ${dateEmployee[2]}`}.
                    </Typography>
                    <Typography className="pb-12 italic ">
                        - Căn cứ vào sự đóng góp thực tế của Ông/Bà: <span className="font-bold">{employeeData?.name}</span> đối với sự phát triển của Công ty
                        OCEANTECH.
                    </Typography>
                    <Box className="flex-center mt-20">
                        <Typography className="text-overflow font-bold">GIÁM ĐỐC CÔNG TY OCEANTECH</Typography>
                    </Box>
                    <Typography className="flex-center line-height-25 mb-20 font-bold">QUYẾT ĐỊNH</Typography>
                    <Typography>
                        - <span className="font-bold">Điều 1:</span> Tăng lương cho Ông/Bà: {<span className="font-bold">{employeeData?.name}</span>} {`đang làm việc tại 
                            công ty kể từ ngày ${dateSalary[0]} tháng ${dateSalary[1]} năm ${dateSalary[2]}, cụ thể như sau:`}
                    </Typography>
                    <Typography>
                        Mức lương hiện tại: <span className="font-bold">{salaryObj?.oldSalary?.toLocaleString()} VND</span>.
                    </Typography>
                    <Typography>
                        Mức lương sau điều chỉnh: <span className="font-bold">{salaryObj?.newSalary?.toLocaleString()} VND</span>.
                    </Typography>
                    <Typography>
                        - <span className="font-bold">Điều 2:</span>Các Ông/Bà Phòng nhân sự, Phòng tài chính kế toán và Ông/Bà:{' '}
                        <span className="font-bold">{employeeData?.leaderName}</span> căn cứ thi hành quyết định này.
                    </Typography>
                    <Box className="flex-between mt-32">
                        <Box />
                        <Box className='px-32'>
                            <Typography className="flex-center">
                                <span className="font-bold">GIÁM ĐỐC</span>
                            </Typography>
                            <Typography className="flex-center italic">
                                (Ký tên, đóng dấu)
                            </Typography>
                            {salaryObj?.salaryIncreaseStatus === 2 && (
                                <div className="mt-32 flex-center">
                                    <span className="sign-text ">{employeeData?.leaderName}</span>
                                </div>
                            )}
                        </Box>
                    </Box>
                    {dialogApproval && (
                        <DialogApprove
                            open={dialogApproval}
                            setOpen={setDialogApproval}
                            data={{ acceptanceDate: salaryObj?.acceptanceDate || "" }}
                            handleApprove={handleApprove}
                        />
                    )}
                    {dialogAdditionalRequest && (
                        <DialogAdditionalRequest
                            open={dialogAdditionalRequest}
                            setOpen={setDialogAdditionalRequest}
                            data={{ additionalRequest: salaryObj?.additionalRequest || "" }}
                            handleAdditional={handleAdditional}
                        />
                    )}
                    {dialogReject && (
                        <DialogReject
                            open={dialogReject}
                            setOpen={setDialogReject}
                            data={{
                                reasonForRefusal: salaryObj?.reasonForRefusal || "",
                                rejectionDate: salaryObj?.rejectionDate || ""
                            }}
                            handleReject={handleReject}
                        />
                    )}
                    {dialogLeader && (
                        <DialogFormSendLeader
                            open={dialogLeader}
                            setOpen={setDialogLeader}
                            data={salaryObj}
                            handleSendLeader={handleSendLeader}
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
                    {leader && (
                        <>
                            <Button variant="contained" color="primary" onClick={() => setDialogApproval(true)}>
                                Phê duyệt
                            </Button>
                            <Button variant="contained" color="primary" onClick={() => setDialogAdditionalRequest(true)}>
                                Yêu cầu bổ sung
                            </Button>
                            <Button variant="contained" color="primary" onClick={() => setDialogReject(true)}>
                                Từ chối
                            </Button>
                        </>
                    )}
                    {save && (
                        <Button
                            variant="contained"
                            className="mr-12"
                            color="primary"
                            onClick={() => setDialogLeader(true)}
                        >
                            Trình lãnh đạo
                        </Button>
                    )}
                </div>
            </DialogActions>
        </Dialog>
    );
};

export default FormSalaryIncrease;
