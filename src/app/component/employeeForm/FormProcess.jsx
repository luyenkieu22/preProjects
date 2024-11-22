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
import "../../../styles/views/_form.scss";
import moment from "moment";
import DialogApprove from "../customDialog/DialogApprove";
import { GENDER, POSITION } from "app/const/statusEmployee";
import DialogAdditionalRequest from "../customDialog/DialogAdditionalRequest";
import DialogReject from "../customDialog/DialogReject";
import DialogFormSendLeader from "../customDialog/DialogFormSendLeader";
import { useDispatch } from "react-redux";
import { editProcessAction } from "app/redux/actions/processAction";

const useStyles = makeStyles({
    titleDialog: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
});

const FormProcess = ({ open, setOpen, employeeData, processObj, leader }) => {
    const classes = useStyles();
    const [dialogApproval, setDialogApproval] = useState(false);
    const [dialogAdditionalRequest, setDialogAdditionalRequest] = useState(false);
    const [dialogReject, setDialogReject] = useState(false);
    const [dialogLeader, setDialogLeader] = useState(false);
    const dispatch = useDispatch();
    const dateProcess = moment(processObj?.promotionDate)
        .format("DD/MM/YYYY")
        .split("/");

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleApprove = (data) => {
        dispatch(
            editProcessAction({
                ...processObj,
                acceptanceDate: data.acceptanceDate,
                proposalStatus: 3,
            })
        );
        setOpen(false);
    };

    const handleAdditional = (data) => {
        dispatch(
            editProcessAction({
                ...processObj,
                additionalRequest: data.additionalRequest,
                proposalStatus: 4,
            })
        );
        setOpen(false);
    };
    const handleReject = (data) => {
        dispatch(
            editProcessAction({
                ...processObj,
                ...data,
                proposalStatus: 5,
            })
        );
        setOpen(false);
    };

    const handleSendLeader = (leaderId) => {
        dispatch(
            editProcessAction({
                ...processObj,
                leaderId: leaderId,
                proposalStatus: 2,
            })
        );
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
                        Đề xuất thăng chức
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
                    <Grid container spacing={3} item xs={12} className="container-form">
                        <Grid item xs={4}>
                            <Typography className="flex-center">
                                CÔNG TY OCEANTECH
                            </Typography>
                            <Typography className="flex-center font-bold">
                                SỐ {employeeData?.id}/ QĐ - TC
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Box className="flex-center">
                                <Typography className="text-overflow font-bold">
                                    CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                                </Typography>
                            </Box>
                            <Box className="flex-center">
                                <Typography className="text-overflow text-underline font-bold">
                                    Độc lập - tự do - Hạnh phúc
                                </Typography>
                            </Box>
                            <Box className="flex-center">
                                <Typography className="text-overflow line-height-25 italic">
                                    {`Hà Nội, ngày ${dateProcess[0]} tháng ${dateProcess[1]} năm ${dateProcess[2]}`}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Typography className="flex-center mt-32 font-bold">
                        QUYẾT ĐỊNH
                    </Typography>
                    <Typography className="flex-center pb-12 italic mb-20 font-bold">
                        V/v thăng chức
                    </Typography>
                    <Typography className="italic">
                        - Căn cứ Luật Doanh nghiệp 2020 và các văn bản hướng dẫn thi hành.
                    </Typography>
                    <Typography className="italic">
                        - Căn cứ Điều lệ Công ty OCEANTECH.
                    </Typography>
                    <Typography className="italic">
                        - Căn cứ yêu cầu hoạt động sản xuất kinh doanh.
                    </Typography>
                    <Typography className="italic">
                        - Xét năng lực, phẩm chất và trình độ của Ông/Bà:{" "}
                        <span className="font-bold">{employeeData?.name}</span>.
                    </Typography>
                    <Typography className="flex-center line-height-25 mb-20 mt-20 font-bold">
                        QUYẾT ĐỊNH
                    </Typography>
                    <Typography>
                        - <span className="font-bold">Điều 1:</span> Bổ nhiệm chức danh{" "}
                        {
                            <span className="font-bold">
                                {
                                    POSITION.find((item) => item.id === processObj?.newPosition)
                                        ?.value
                                }
                            </span>
                        }{" "}
                        đối với:
                    </Typography>
                    <Typography>
                        - Ông/Bà: <span className="font-bold">{employeeData?.nam}</span>.
                        Giới tính:{" "}
                        {GENDER.find((item) => item.id === employeeData?.gender)?.name}
                    </Typography>
                    <Typography>
                        - Sinh ngày:{" "}
                        {moment(employeeData?.dateOfBirth).format("DD/MM/YYYY")}. Dân tộc:{" "}
                        {employeeData?.ethnic || "không"}. Tôn giáo:{" "}
                        {employeeData?.religion || "không"}.
                    </Typography>
                    <Typography>
                        - Số căn cước công dân: {employeeData?.citizenIdentificationNumber}.
                        Nơi cấp: {employeeData?.placeOfIssueCard}. Ngày cấp:{" "}
                        {moment(employeeData?.dateOfIssuanceCard).format("DD/MM/YYYY")}
                    </Typography>
                    <Typography>
                        - Nơi đăng ký hộ khẩu thường trú: {employeeData?.address}.
                    </Typography>
                    <Typography>- Nơi ở hiện tại: {employeeData?.address}.</Typography>
                    <Typography>
                        - <span className="font-bold">Điều 2:</span> Quyền và nghĩa vụ:
                    </Typography>
                    <Typography>
                        - Thực hiện quyền và nghĩa vụ của cấp bậc được bổ nhiệm theo quy
                        định của công ty.
                    </Typography>
                    <Typography>
                        - <span className="font-bold">Điều 3:</span> Hiệu lực thi hành:
                    </Typography>
                    <Typography>
                        - Ông/Bà có tên tại Điều 1 và các cơ quan, tổ chức, cá nhân liên
                        quan chịu trách nhiệm thi hành quyết định này. Quyết định này có
                        hiệu lực kể từ ngày ký.
                    </Typography>

                    <Box className="flex-between mt-32">
                        <Box></Box>
                        <Box className="px-32">
                            <Typography className="flex-center">
                                <span className="font-bold">GIÁM ĐỐC</span>
                            </Typography>
                            <Typography className="flex-center italic">
                                (Ký tên, đóng dấu)
                            </Typography>
                            {processObj?.salaryIncreaseStatus === 2 && (
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
                            data={{ acceptanceDate: processObj?.acceptanceDate || "" }}
                            handleApprove={handleApprove}
                        />
                    )}
                    {dialogAdditionalRequest && (
                        <DialogAdditionalRequest
                            open={dialogAdditionalRequest}
                            setOpen={setDialogAdditionalRequest}
                            data={{ additionalRequest: processObj?.additionalRequest || "" }}
                            handleAdditional={handleAdditional}
                        />
                    )}
                    {dialogReject && (
                        <DialogReject
                            open={dialogReject}
                            setOpen={setDialogReject}
                            data={{
                                reasonForRefusal: processObj?.reasonForRefusal || "",
                                rejectionDate: processObj?.rejectionDate || "",
                            }}
                            handleReject={handleReject}
                        />
                    )}
                    {dialogLeader && (
                        <DialogFormSendLeader
                            open={dialogLeader}
                            setOpen={setDialogLeader}
                            data={processObj}
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
                            onClick={() => setDialogApproval(true)}
                        >
                            Trình lãnh đạo
                        </Button>
                    )}
                </div>
            </DialogActions>
        </Dialog>
    );
};

export default FormProcess;
