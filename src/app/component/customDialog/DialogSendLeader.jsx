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
    MenuItem,
    Typography,
} from "@material-ui/core";
import { LEADER, LEADER_POSITION } from "app/const/statusEmployee";
import { editEmployeeAction } from "app/redux/actions/employeesAction";
import moment from "moment";
import React, { useState } from "react";
import { SelectValidator, TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
    titleDialog: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
});

const DialogSendLeader = ({ open, setOpen, employeeData }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ ...employeeData });

    const handleChangeValue = (e) => {
        const { value, name } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        dispatch(editEmployeeAction({ ...formData, submitProfileStatus: "2" }));
        setOpen(false);
    };

    return (
        <Dialog open={open} maxWidth={"md"} fullWidth={true}>
            <DialogTitle>
                <Box className={classes.titleDialog}>
                    <Typography variant="h5" color="textPrimary">
                        Trình lãnh đạo
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
                        <Grid item xs={4}>
                            <TextValidator
                                size="small"
                                fullWidth
                                label={
                                    <span>
                                        <span style={{ color: "red" }}> * </span>
                                        Ngày nộp
                                    </span>
                                }
                                variant="outlined"
                                value={
                                    formData?.submitDay &&
                                    moment(formData?.submitDay).format("YYYY-MM-DD")
                                }
                                onChange={handleChangeValue}
                                type="date"
                                name="submitDay"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                validators={["required"]}
                                errorMessages={["Ngày nộp không được để trống"]}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <SelectValidator
                                size="small"
                                label={
                                    <span>
                                        <span style={{ color: "red" }}> * </span>
                                        Tên lãnh đạo
                                    </span>
                                }
                                variant="outlined"
                                type="text"
                                name="leaderId"
                                value={formData?.leaderId}
                                onChange={handleChangeValue}
                                validators={["required"]}
                                errorMessages={["Tên lãnh đạo không được để trống"]}
                            >
                                {LEADER.map((leader) => (
                                    <MenuItem value={leader.id} key={leader.id}>
                                        {leader.leaderName}
                                    </MenuItem>
                                ))}
                            </SelectValidator>
                        </Grid>
                        <Grid item xs={4}>
                            <SelectValidator
                                size="small"
                                label={
                                    <span>
                                        <span style={{ color: "red" }}> * </span>
                                        Chức vụ
                                    </span>
                                }
                                variant="outlined"
                                type="text"
                                name="leaderPosition"
                                value={formData?.leaderPosition}
                                onChange={handleChangeValue}
                                validators={["required"]}
                                errorMessages={["Chức vụ không được để trống"]}
                            >
                                {LEADER_POSITION.map((position) => (
                                    <MenuItem value={position.id} key={position.id}>
                                        {position.value}
                                    </MenuItem>
                                ))}
                            </SelectValidator>
                        </Grid>
                        <Grid item xs={12}>
                            <TextValidator
                                size="small"
                                fullWidth
                                label={
                                    <span>
                                        <span style={{ color: "red" }}> * </span>
                                        Nội dung
                                    </span>
                                }
                                variant="outlined"
                                value={formData?.submitContent}
                                onChange={handleChangeValue}
                                type="text"
                                name="submitContent"
                                validators={["required"]}
                                errorMessages={["Nội dung không được để trống"]}
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

export default DialogSendLeader;