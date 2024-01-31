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
    openRegistrationPopup: boolean
    closeRegistrationPopup: () => void
    email: string
}
const RegistrationPopup = (props: RegistrationPopupPropsType) => {
    const {openRegistrationPopup, closeRegistrationPopup, email} = props

    return (
        <Dialog
            open={openRegistrationPopup}
            onClose={closeRegistrationPopup}
        >
            <div style={{padding: '15px'}}>
                <DialogTitle>
                    Email sent
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        We have sent a link to confirm your email to {email}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={closeRegistrationPopup}
                        style={{backgroundColor: '#f31853', color: '#fff'}}
                    >
                        OK
                    </Button>
                </DialogActions>
            </div>

        </Dialog>
    );
};

export default React.memo(RegistrationPopup)