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
import { POSITION, TYPE_PROPOSAL } from "app/const/statusEmployee";
import DialogAdditionalRequest from "../customDialog/DialogAdditionalRequest";
import DialogReject from "../customDialog/DialogReject";
import { useDispatch } from "react-redux";
import { editProposalAction } from "app/redux/actions/proposalAction";
import DialogFormSendLeader from "../customDialog/DialogFormSendLeader";

const useStyles = makeStyles({
    titleDialog: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
});

const FormProposal = ({ open, setOpen, employeeData, proposalObj, leader }) => {
    const classes = useStyles();
    const [dialogApproval, setDialogApproval] = useState(false);
    const [dialogAdditionalRequest, setDialogAdditionalRequest] = useState(false);
    const [dialogReject, setDialogReject] = useState(false);
    const [dialogLeader, setDialogLeader] = useState(false);
    const dispatch = useDispatch()
    const dateProposal = moment(proposalObj?.startDate)
        .format("DD/MM/YYYY")
        .split("/");

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleApprove = (data) => {
        dispatch(editProposalAction({
            ...proposalObj,
            acceptanceDate: data.acceptanceDate,
            proposalStatus: 3,
        }))
        setOpen(false)
    };

    const handleAdditional = (data) => {
        dispatch(editProposalAction({
            ...proposalObj,
            additionalRequest: data.additionalRequest,
            proposalStatus: 4,
        }))
        setOpen(false)
    };
    const handleReject = (data) => {
        dispatch(editProposalAction({
            ...proposalObj,
            ...data,
            proposalStatus: 5,
        }))
        setOpen(false)
    };

    const handleSendLeader = leaderId => {
        dispatch(editProposalAction({
            ...proposalObj,
            leaderId: leaderId,
            proposalStatus: 2,
        }))
        setOpen(false)
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
                        Đề xuất/Tham mưu
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
                                SỐ {employeeData?.id}/ TM - ĐX
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
                                    {`Hà Nội, ngày ${dateProposal[0]} tháng ${dateProposal[1]} năm ${dateProposal[2]}`}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Typography className="flex-center mt-32 font-bold">
                        ĐƠN ĐỀ XUẤT THAM MƯU
                    </Typography>
                    <Typography className="mt-32">
                        Kính gửi: Ban giám đốc công ty{" "}
                        <span className="font-bold">OCEANTECH</span>
                    </Typography>
                    <Typography>
                        Tên tôi là: <span className="font-bold">{employeeData?.name}</span>
                    </Typography>
                    <Typography>
                        Sinh ngày: {moment(employeeData?.dateOfBirth).format("DD/MM/YYYY")}.
                        Dân tộc: {employeeData?.religion || "không"}.
                        Tôn giáo: {employeeData?.ethnic || "không"}.
                    </Typography>
                    <Typography>
                        Số căn cước công dân: {employeeData?.citizenIdentificationNumber}.
                        Nơi cấp: {employeeData?.placeOfIssueCard}. Ngày cấp:{" "}
                        {moment(employeeData?.dateOfIssuanceCard).format("DD/MM/YYYY")}.
                    </Typography>
                    <Typography>
                        Nơi đăng ký hộ khẩu thường trú: {employeeData?.address}.
                    </Typography>
                    <Typography>Nơi ở hiện tại: {employeeData?.address}</Typography>
                    <Typography>
                        Hiện đang là nhân viên tại công ty với vị trí:{" "}
                        {
                            POSITION.find(
                                (item) => item?.id === employeeData?.currentPosition - 1
                            )?.value
                        }
                        .
                    </Typography>
                    <Typography>
                        Tôi viết đơn này với đề xuất như sau{" "}
                        {TYPE_PROPOSAL.find((item) => item.id === proposalObj?.type)?.name}.
                    </Typography>
                    <Typography>Vì lý do: {proposalObj?.content}.</Typography>
                    <Typography className="mt-32">Tôi xin chân thành cảm ơn!</Typography>

                    <Box className="flex-between mt-32">
                        <Box>
                            <Typography className="flex-center italic">
                                Hà Nội, Ngày {dateProposal[0]} tháng {dateProposal[1]} năm {dateProposal[2]}
                            </Typography>
                            <Typography className="flex-center"><span className="font-bold">Người làm đơn</span></Typography>
                            <Typography className="flex-center">(Ký, ghi rõ họ tên)</Typography>
                            <Typography className="mt-32 flex-center"><span className="sign-text">{employeeData?.name}</span></Typography>
                        </Box>
                        <Box>
                            <Typography className="flex-center"><span className="font-bold">Giám đốc</span></Typography>
                            <Typography className="flex-center italic">(Ký tên, đóng dấu)</Typography>
                            {proposalObj?.proposalStatus === 2 && (
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
                            data={{ acceptanceDate: proposalObj?.acceptanceDate || "" }}
                            handleApprove={handleApprove}
                        />
                    )}
                    {dialogAdditionalRequest && (
                        <DialogAdditionalRequest
                            open={dialogApproval}
                            setOpen={setDialogApproval}
                            data={{ additionalRequest: proposalObj?.additionalRequest || "" }}
                            handleAdditional={handleAdditional}
                        />
                    )}
                    {dialogReject && (
                        <DialogReject
                            open={dialogApproval}
                            setOpen={setDialogApproval}
                            data={{
                                reasonForRefusal: proposalObj?.reasonForRefusal || "",
                                rejectionDate: proposalObj?.rejectionDate || ""
                            }}
                            handleReject={handleReject}
                        />
                    )}
                    {dialogLeader && (
                        <DialogFormSendLeader
                            open={dialogLeader}
                            setOpen={setDialogLeader}
                            data={proposalObj}
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

export default FormProposal;
