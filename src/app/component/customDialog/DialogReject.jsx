import React, { useState } from "react";
import { Button, DialogActions, DialogContent, DialogTitle, Grid, Icon, IconButton, Dialog, Box } from "@material-ui/core";
import moment from "moment";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const DialogReject = ({ open, setOpen, data, handleReject }) => {
    const [item, setItem] = useState({ ...data });

    const handleChangeValue = (e) => {
        const { name, value } = e.target;
        setItem({ ...item, [name]: value })
    }

    const handleSubmit = () => {
        handleReject(item)
        setOpen(false);
    }
    return (
        <Dialog
            open={open}
            maxWidth={"sm"}
            fullWidth={true}
        >
            <DialogTitle id="draggable-dialog-title">
                <Box display={'flex'} justifyContent={"space-between"} alignItems={"center"}>
                    <span className="mb-6">Từ chối</span>
                    <IconButton className="position-absolute r-10 t-10" onClick={() => setOpen(false)}>
                        <Icon title="close">
                            close
                        </Icon>
                    </IconButton>
                </Box>
            </DialogTitle>
            <ValidatorForm onSubmit={handleSubmit}>
                <DialogContent dividers className="overflow-none">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextValidator
                                className="w-100 stylePlaceholder"
                                size="small"
                                label={
                                    <span style={{ color: "black" }}>
                                        <span style={{ color: "red" }}> * </span>
                                        Lý do từ chối
                                    </span>}
                                variant="outlined"
                                name={Object.keys(item)[0]}
                                value={Object.values(item)[0]}
                                onChange={handleChangeValue}
                                type="text"
                                validators={["required"]}
                                errorMessages={["Trường này không được để trống"]}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextValidator
                                className="w-100 stylePlaceholder"
                                size="small"
                                label={
                                    <span style={{ color: "black" }}>
                                        <span style={{ color: "red" }}> * </span>
                                        Ngày từ chối
                                    </span>
                                }
                                variant="outlined"
                                name={Object.keys(item)[1]}
                                value={Object.values(item)[1] ? moment(Object.values(item)[1]).format("YYYY-MM-DD") : ''}
                                onChange={handleChangeValue}
                                type="date"
                                validators={["required"]}
                                errorMessages={["Trường này không được để trống"]}
                                inputProps={{
                                    min: moment().format("YYYY-MM-DD"),
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions spacing={4}>
                    <Button
                        variant="contained"
                        className="mr-12"
                        color="secondary"
                        onClick={() => setOpen(false)}
                    >
                        Hủy
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Lưu
                    </Button>
                </DialogActions>
            </ValidatorForm >
        </Dialog >
    )
}

export default DialogReject

