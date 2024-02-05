import React from 'react'

// COMPONENTS, RESOURCES, CONSTANTS
import './styles.scss'
import Device from "../../components/Device/Device";
import {GetDevicesResponse} from "../../types/requests/get/requests";

type ProfileSettingsPagePropsType = {
    userDevices: GetDevicesResponse[] | undefined
    userDeviceId: string
    handeTerminateSession: (deviceId: string) => void
    handeTerminateAllSession: (userDeviceId: string) => void
}

const ProfileSettingsPage = (props: ProfileSettingsPagePropsType) => {
    const {
        userDevices,
        userDeviceId,
        handeTerminateSession,
        handeTerminateAllSession
    } = props

    const currentSession = userDevices?.filter(d => d.deviceId === userDeviceId)
    const otherSessions = userDevices?.filter(d => d.deviceId !== userDeviceId)

    return <div className="profile_settings__container">
        <h1 className='profile_settings__title'>Profile settings</h1>
        <div className='profile_settings__underline'></div>

        <p className='profile_settings__tab margin-top-50'>Devices</p>
        <div className='profile_settings__underline'></div>

        <p className='profile_settings__subtitle margin-top-40'>This device</p>
        {
            currentSession?.length &&
            <Device
              title={currentSession[0].title}
              ip={currentSession[0].ip}
              deviceId={currentSession[0].deviceId}
              lastVisit={currentSession[0].lastActiveDate}
            />
        }
        <div className="width-all df-end margin-top-30">
            {
                userDevices && userDevices?.length > 1 &&
                  <div
                    onClick={() => handeTerminateAllSession(userDeviceId)}
                    className='profile_settings__btn'
                  >
                    Terminate all other session
                  </div>
            }
        </div>
        <p className='profile_settings__subtitle'>Other active sessions</p>
        {
            otherSessions?.length ?
            otherSessions.map(d => {
                return <Device
                    key={d.deviceId}
                    title={d.title}
                    ip={d.ip}
                    deviceId={d.deviceId}
                    lastVisit={d.lastActiveDate}
                    handeTerminateSession={handeTerminateSession}
                />
            })
                : ''
        }
    </div>
}

export default React.memo(ProfileSettingsPage)
