import React from 'react';
import { Dialog, DialogContent, DialogContentText } from "@mui/material";

type RegistrationPopupPropsType = {
    openRegistrationPopup: boolean
    closeRegistrationPopup: () => void
}
const EmailConfirmPopup = (props: RegistrationPopupPropsType) => {
    const {openRegistrationPopup, closeRegistrationPopup} = props

    return (
        <Dialog
            open={openRegistrationPopup}
            onClose={closeRegistrationPopup}
        >
            <div style={{padding: '15px'}}>
                <DialogContent>
                    <DialogContentText>
                        You email has been confirmed, thank you for registration
                    </DialogContentText>
                </DialogContent>
            </div>

        </Dialog>
    );
};

export default React.memo(EmailConfirmPopup)