import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Icon,
    IconButton,
    makeStyles,
    Typography,
} from "@material-ui/core";
import {
    addExperienceAction,
    editExperienceAction,
} from "app/redux/actions/experiencesAction";
import moment from "moment";
import React, { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
    titleDialog: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
});

const DialogExperience = ({ open, setOpen, idEmployee, data, setData }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [experiencesObject, setExperienceObject] = useState({
        id: idEmployee || "",
        companyName: data?.companyName || "",
        startDate: data?.startDate || "",
        endDate: data?.endDate || "",
        jobDescription: data?.jobDescription || "",
        leavingReason: data?.leavingReason || "",
        companyAddress: data?.companyAddress || "",
    });

    const handleChangeValue = (e) => {
        const { value, name } = e.target;
        setExperienceObject({ ...experiencesObject, [name]: value });
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setData({});
    };

    const handleSubmit = () => {
        if (data?.id) {
            dispatch(editExperienceAction(experiencesObject));
        } else {
            dispatch(addExperienceAction(experiencesObject, idEmployee));
        }
        setOpen(false);
    };

    return (
        <Dialog open={open} maxWidth={"md"} fullWidth={true}>
            <DialogTitle>
                <Box className={classes.titleDialog}>
                    <Typography variant="h5" color="textPrimary">
                        {data?.id ? "Sửa" : "Thêm"} kinh nghiệm làm việc
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
            </DialogTitle>
            <ValidatorForm onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextValidator
                                size="small"
                                fullWidth
                                label={
                                    <span>
                                        <span style={{ color: "red" }}> * </span>
                                        Tên công ty
                                    </span>
                                }
                                variant="outlined"
                                type="text"
                                value={experiencesObject?.companyName}
                                onChange={handleChangeValue}
                                name="companyName"
                                validators={["required"]}
                                errorMessages={["Tên công ty không được để trống"]}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextValidator
                                size="small"
                                fullWidth
                                label={
                                    <span>
                                        <span style={{ color: "red" }}> * </span>
                                        Địa chỉ công ty
                                    </span>
                                }
                                variant="outlined"
                                type="text"
                                value={experiencesObject?.companyAddress}
                                onChange={handleChangeValue}
                                name="companyAddress"
                                validators={["required"]}
                                errorMessages={["Địa chỉ công ty không được để trống"]}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextValidator
                                size="small"
                                fullWidth
                                label={
                                    <span>
                                        <span style={{ color: "red" }}> * </span>
                                        Ngày bắt đầu
                                    </span>
                                }
                                variant="outlined"
                                value={
                                    experiencesObject?.startDate &&
                                    moment(experiencesObject?.startDate).format("YYYY-MM-DD")
                                }
                                onChange={handleChangeValue}
                                type="date"
                                name="startDate"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                validators={["required"]}
                                errorMessages={["Ngày bắt đầu không được để trống"]}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextValidator
                                size="small"
                                fullWidth
                                label={
                                    <span>
                                        <span style={{ color: "red" }}> * </span>
                                        Ngày kết thúc
                                    </span>
                                }
                                variant="outlined"
                                value={
                                    experiencesObject?.endDate &&
                                    moment(experiencesObject?.endDate).format("YYYY-MM-DD")
                                }
                                onChange={handleChangeValue}
                                type="date"
                                name="endDate"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                validators={["required"]}
                                errorMessages={["Ngày kết thúc không được để trống"]}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextValidator
                                size="small"
                                fullWidth
                                label={
                                    <span>
                                        <span style={{ color: "red" }}> * </span>
                                        Mô tả công việc
                                    </span>
                                }
                                variant="outlined"
                                value={experiencesObject?.jobDescription}
                                onChange={handleChangeValue}
                                type="text"
                                name="jobDescription"
                                validators={["required"]}
                                errorMessages={["Mô tả công việc không được để trống"]}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextValidator
                                size="small"
                                fullWidth
                                label={
                                    <span>
                                        <span style={{ color: "red" }}> * </span>
                                        Lý do nghỉ việc
                                    </span>
                                }
                                variant="outlined"
                                value={experiencesObject?.leavingReason}
                                onChange={handleChangeValue}
                                type="text"
                                name="leavingReason"
                                validators={["required"]}
                                errorMessages={["Lý do nghỉ việc không được để trống"]}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleCloseDialog}
                    >
                        Hủy
                    </Button>
                    <Button variant="contained" color="primary" type="submit">
                        Lưu
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </Dialog>
    );
};

export default DialogExperience;
