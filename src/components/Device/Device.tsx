import React from "react";
import './styles.scss'
import chromeIcon from "../../assets/icons/chrome-icon.svg";
import {dateFormat} from "../../utils/utils";
import signInIcon from "../../assets/icons/sign-in.svg";

type DevicePropsType = {
    title: string,
    ip: string,
    lastVisit: string,
    deviceId: string,
    handeTerminateSession?: (deviceId: string) => void
}

const Device = (props: DevicePropsType) => {
    const {
        title,
        ip,
        lastVisit,
        handeTerminateSession,
        deviceId
    } = props

    return (
        <div className='device__container'>
            <div className='df-center'>
                <div className='device__browser_img_container'>
                    <img src={chromeIcon} className='center-img' alt='chrome icon'/>
                </div>
                <div className='df-column-start'>
                    <p className='device__title margin-top-10'>
                        {title.length > 20 ? title.slice(0, 50) + '...' : title}
                    </p>
                    <span className='device__ip margin-top-15'>
                        <span style={{fontWeight: 'bold'}}>IP:</span>
                        {' '}
                        {ip}
                    </span>
                    {
                        handeTerminateSession
                            ? <span className='device__ip margin-top-5'>
                                <span style={{fontWeight: 'bold'}}>Last visit:</span>
                                    {' '}
                                    {dateFormat(lastVisit)}
                            </span>
                            : <span className='device__status margin-top-5'>Online</span>
                    }
                </div>
            </div>
            <div>
                {
                    handeTerminateSession &&
                  <div
                    onClick={() => handeTerminateSession(deviceId)}
                    className='device__terminate_session_btn df'
                  >
                    <img src={signInIcon} className='header__sign-in-icon' alt='sign in icon'/>
                    <p>Log out</p>
                  </div>
                }
            </div>
        </div>
    )
}

export default React.memo(Device)