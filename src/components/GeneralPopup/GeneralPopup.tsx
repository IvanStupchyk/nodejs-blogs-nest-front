import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";

type RegistrationPopupPropsType = {
    openPopup: boolean
    closePopup: () => void
    title: string
    message: string
}
const GeneralPopup = (props: RegistrationPopupPropsType) => {
    const {
        openPopup,
        closePopup,
        title,
        message
    } = props

    return (
        <Dialog
            open={openPopup}
            onClose={closePopup}
        >
            <div style={{padding: '15px'}}>
                <DialogTitle>
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={closePopup}
                        style={{backgroundColor: '#f31853', color: '#fff'}}
                    >
                        OK
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    );
};

export default React.memo(GeneralPopup)