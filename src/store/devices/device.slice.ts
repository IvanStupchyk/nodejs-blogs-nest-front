import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {devicesApi} from "../../services/devices.api";

type DeviceType = {
  ip: string,
  title: string,
  lastActiveDate: string
  deviceId: string
}

type InitialStateType = {
  devices: DeviceType[]
}

const initialState: InitialStateType = {
  devices: []
}

export const deviceSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    setAllDevicesAC(state, action: PayloadAction<DeviceType[]>) {
      state.devices = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addMatcher(
        devicesApi.endpoints?.deleteSpecifiedDevice.matchFulfilled,
        (state,  {payload} ) => {
          //@ts-ignore
          state.devices = state.devices.filter(d => d.deviceId !== payload.id)
        }
    );

    builder.addMatcher(
        devicesApi.endpoints?.deleteAllDevices.matchFulfilled,
        (state,  {payload} ) => {
          //@ts-ignore
          state.devices = state.devices.filter(d => d.deviceId === payload.id)
        }
    )
  },
})

export const deviceActions = deviceSlice.actions
export const deviceReducer = deviceSlice.reducer
