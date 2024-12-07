import React, { useEffect, useState } from "react";
import { Button, DialogActions, DialogContent, DialogTitle, Grid, Icon, IconButton, Dialog, Box } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useDispatch, useSelector } from "react-redux";
import { editEmployeeAction } from "app/redux/actions/employeesAction";

const DialogSaveEmployee = ({ open, setOpen }) => {
    const { employee } = useSelector(state => state.employees);
    const dispatch = useDispatch()
    const [item, setItem] = useState("");


    const handleChangeValue = (e) => {
        setItem(e.target.value)
    }


    const handleSubmit = () => {
        const dateNow = new Date();
        const getMonth = dateNow.getMonth() + 1
        const getYear = dateNow.getFullYear()
        const numberSaved = `NL${getMonth}${getYear}/${item}`

        dispatch(editEmployeeAction({
            ...employee,
            numberSaved: numberSaved,
            submitProfileStatus: "0",
        }))
        setOpen(false);
    }

    useEffect(() => {
        ValidatorForm.addValidationRule("validateCode", (value) => {
            return value.length === 3
        })

        return () => {
            ValidatorForm.removeValidationRule("validateCode")
        }
    }, [])

    return (
        <Dialog
            open={open}
            maxWidth={"sm"}
            fullWidth={true}
        >
            <DialogTitle id="draggable-dialog-title">
                <Box display={'flex'} justifyContent={"space-between"} alignItems={"center"}>
                    <span className="mb-6">Lưu hồ sơ</span>
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
                                        Mã hồ sơ
                                    </span>
                                }
                                variant="outlined"
                                value={item}
                                onChange={handleChangeValue}
                                type="text"
                                validators={["required", "validateCode"]}
                                errorMessages={[
                                    "Trường này không được để trống",
                                    "Mã hồ sơ phải đủ 3 ký tự"
                                ]}
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

export default DialogSaveEmployee

