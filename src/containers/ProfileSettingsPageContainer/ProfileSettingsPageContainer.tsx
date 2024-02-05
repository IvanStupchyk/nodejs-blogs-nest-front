import React from 'react'

// COMPONENTS, RESOURCES, CONSTANTS
import {ProfileSettingsPage} from '../../pages'
import {
    useDeleteAllDevicesMutation,
    useDeleteSpecifiedDeviceMutation,
    useLazyGetDevicesQuery
} from "../../services/devices.api";
import {useAppSelector} from "../../store/storeToolkit";
import {useActions} from "../../hooks/useActions";

const ProfileSettingsPageContainer = () => {
    const [ getDevices, { data: userDevicesData }] = useLazyGetDevicesQuery()
    const [ deleteSpecifiedSession] = useDeleteSpecifiedDeviceMutation()
    const [ deleteAllSessions] = useDeleteAllDevicesMutation()

    const {
        setAllDevicesAC,
    } = useActions()

    const userDeviceId = useAppSelector((state) => state.auth.deviceId)
    const userDevices = useAppSelector((state) => state.devices.devices)

    const handeTerminateSession = React.useCallback((deviceId: string) => {
        deleteSpecifiedSession(deviceId)
    }, [])

    const handeTerminateAllSession = React.useCallback((userDeviceId: string) => {
        deleteAllSessions(userDeviceId)
    }, [])

    React.useEffect(() => {
      getDevices()
    }, [])

    React.useEffect(() => {
        if (userDevicesData) {
            setAllDevicesAC(userDevicesData)
        }
    }, [userDevicesData])

  return <ProfileSettingsPage
      userDevices={userDevices}
      userDeviceId={userDeviceId}
      handeTerminateSession={handeTerminateSession}
      handeTerminateAllSession={handeTerminateAllSession}
  />
}

export default React.memo(ProfileSettingsPageContainer)
