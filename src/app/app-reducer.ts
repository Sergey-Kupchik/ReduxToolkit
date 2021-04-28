import {Dispatch} from 'redux'
import {authAPI} from '../api/todolists-api'
import {setIsLoggedInAC} from '../features/Login/auth-reducer'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

const slice = createSlice({
    name: 'APP',
    initialState: initialState,
    reducers: {
        setAppErrorAC: (state, action: PayloadAction<{error: string | null}>) => {state.error=action.payload.error},
        setAppStatusAC: (state, action: PayloadAction<{status: RequestStatusType}>) => {state.status=action.payload.status},
        setAppInitializedAC: (state, action: PayloadAction<{value: boolean}>) => {state.isInitialized=action.payload.value},
    },
});

// Reducer
export const appReducer = slice.reducer

// Actions
export const {setAppErrorAC,setAppStatusAC,setAppInitializedAC} = slice.actions


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // is there any interaction with the server now
    status: RequestStatusType
    // if a global error happen, we will write the error text here
    error: string | null
    // true when the application was initialized (checked the user, got the settings, etc.)
    isInitialized: boolean
}



export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value:true}));
        } else {
        }
        dispatch(setAppInitializedAC({value:true}));
    })
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
