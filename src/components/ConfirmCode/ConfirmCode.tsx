import React from 'react';
import './styles.scss'
import manIllustration from "../../assets/images/man-illustration.png";

type ConfirmCodePropsType = {
    handleReSendLink: () => void
}
const ConfirmCode = ({handleReSendLink}: ConfirmCodePropsType) => {
    return (
        <div className="confirm_code__container df-column-center margin-top-30">
            <div className="confirm_code__text_container margin-btm-20">
                <h1 className='confirm_code__title margin-btm-20'>Email verification link expired</h1>
                <p className='confirm_code__message margin-btm-30'>
                    Looks like the verification link has expired. Not to worry, we can send the link again
                </p>
                <button onClick={handleReSendLink} className='confirm_code__send_button'>
                    Resend verification link
                </button>
            </div>
            <div className='confirm_code__illustration_container'>
                <img src={manIllustration} className='center-img' alt='man illustration'/>
            </div>
        </div>
    );
}

export default React.memo(ConfirmCode)