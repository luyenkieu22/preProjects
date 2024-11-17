import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@material-ui/core";

export const useConfirm = (title, message) => {
    const [promise, setPromise] = useState(null);

    const confirm = () =>
        new Promise((resolve, reject) => {
            setPromise({ resolve });
        });

    const handleCancel = () => {
        promise.resolve(false);
        setPromise(null);
    };

    const handleConfirm = () => {
        promise.resolve(true);
        setPromise(null);
    };

    const ConfirmDialog = () => (
        <Dialog open={promise !== null} maxWidth="sm" fullWidth={true}>
            <DialogTitle id="draggable-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent dividers>{message}</DialogContent>
            <DialogActions>
                <div className="flex flex-space-between flex-middle">
                    <Button
                        variant="contained"
                        className="mr-12"
                        color="secondary"
                        onClick={handleCancel}
                    >
                        Không
                    </Button>
                    <Button
                        variant="contained"
                        className="mr-12"
                        color="primary"
                        onClick={handleConfirm}
                    >
                        Có
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    );

    return [ConfirmDialog, confirm];
};
