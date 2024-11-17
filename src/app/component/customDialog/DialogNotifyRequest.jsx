import React from "react";
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Icon,
    IconButton,
    Dialog,
    Box,
    Typography,
} from "@material-ui/core";

const DialogNotifyRequest = ({ open, setOpen, message }) => {

    return (
        <Dialog open={open} maxWidth={"sm"} fullWidth={true}>
            <DialogTitle id="draggable-dialog-title">
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography variant="h5">{message.title}</Typography>
                    <IconButton
                        className="position-absolute r-10 t-10"
                        onClick={() => setOpen(false)}
                    >
                        <Icon title="close">close</Icon>
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent dividers className="overflow-none">
                <Typography>{message?.content}</Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    className="mr-12"
                    color="secondary"
                    onClick={() => setOpen(false)}
                >
                    Hủy
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogNotifyRequest;
