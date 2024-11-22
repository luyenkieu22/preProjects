import React, { useState } from "react";
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Icon,
    IconButton,
    Dialog,
    Box,
} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const DialogAdditionalRequest = ({ open, setOpen, data, handleAdditional }) => {
    const [item, setItem] = useState({ ...data });

    const handleChangeValue = (e) => {
        const { name, value } = e.target;
        setItem({ ...item, [name]: value });
    };

    const handleSubmit = () => {
        setOpen(false);
        handleAdditional(item);
    };

    return (
        <Dialog open={open} maxWidth={"sm"} fullWidth={true}>
            <DialogTitle id="draggable-dialog-title">
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <span className="mb-10">Yêu cầu bổ sung</span>
                    <IconButton
                        className="position-absolute r-10 t-10"
                        onClick={() => setOpen(false)}
                    >
                        <Icon title="close">close</Icon>
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
                                        <span style={{ color: 'red' }}> * </span>
                                        Yêu cầu bổ sung
                                    </span>
                                }
                                variant="outlined"
                                name={Object.keys(item)[0]}
                                value={Object.values(item)[0]}
                                onChange={handleChangeValue}
                                type="text"
                                validators={["required"]}
                                errorMessages={["Trường này không được để trống"]}
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
                    <Button variant="contained" color="primary" type="submit">
                        Lưu
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </Dialog >
    );
};

export default DialogAdditionalRequest;
