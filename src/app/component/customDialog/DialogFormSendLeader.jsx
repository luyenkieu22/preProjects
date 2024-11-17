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
import React, { useState } from "react";
import { SelectValidator, ValidatorForm } from "react-material-ui-form-validator";

const useStyles = makeStyles({
    titleDialog: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
});

const DialogFormSendLeader = ({ open, setOpen, data, handleSendLeader }) => {
    const classes = useStyles();
    const [leaderId, setLeaderId] = useState(data?.leaderId);

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        handleSendLeader(leaderId)
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
                        <Grid item xs={6}>
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
                                value={leaderId}
                                onChange={e => setLeaderId(e.target.value)}
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
                        <Grid item xs={6}>
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
                                value={LEADER.find(item => item.id === leaderId)?.leaderPosition}
                                inputProps={{
                                    readOnly: true,
                                }}
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

export default DialogFormSendLeader;
