import React, {useCallback, useState, FocusEvent, useMemo} from 'react'
import {Input} from '../../common/components/Input/Input'
import {Button} from '../../common/components/Button/Button'
import styles from './Login.module.scss'
import {setClasses} from '../../common/utils/setClasses'
import {useFieldState} from '../../common/customHooks/useFieldState'
import {useDispatch, useSelector} from 'react-redux'
import {tErrors} from '../../common/types/types'
import {stateType} from '../../redux/store'
import {appUpdateErrors, appUpdateState} from '../../redux/appReducer/appReducer'
import {loginAPI} from '../../common/api/loginAPI'
import commonStyles from '../../common/styles/CommonStyles.module.scss'

type tLoginParams = {
    loginEmail: string,
    loginPassword: string,
}
const keys = ['loginEmail', 'loginPassword'] as Array<keyof tLoginParams>

export const Login: React.FC = React.memo(() => {
    const [state, onChange, clearState] = useFieldState<tLoginParams>(keys)
    const dispatch = useDispatch()
    const errors = useSelector<stateType, tErrors>(state => state.appState.errors)

    const onBlurField = useCallback((event: FocusEvent<HTMLInputElement>) => {
        const field = event.currentTarget.dataset.name
        const value = event.currentTarget.value.trim()
        let error: tErrors = {[field as string]: ''}
        switch (field) {
            case 'loginEmail':
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                    error[field] = 'Invalid email address'
                }
                break
            case 'loginPassword':
                if (!value) error[field] = `${field} is required field`
                break
            default:
                return
        }
        dispatch(appUpdateErrors(error))
    }, [])

    const resError: string | undefined = useMemo(() => {
        let res: string | undefined
        if (state.loginPassword && state.loginEmail) {
            res = errors?.loginPassword || errors?.loginEmail
        } else {
            res = 'Fill all required fields'
        }
        return res
    }, [errors, state])

    return (
        <div className={styles.container}>
            <h1>
                LOG IN
                <span className={commonStyles.upperThenHeader}>LOG IN</span>
            </h1>
            <Input value={state.loginEmail} name={'Email'} data-name={'loginEmail'}
                   focusedBackgroundClass={styles.focusedText}
                   onChange={onChange}
                   onBlur={onBlurField}/>
            <Input value={state.loginPassword} type={'password'} name={'Password'} data-name={'loginPassword'}
                   focusedBackgroundClass={styles.focusedText}
                   onChange={onChange}
                   onBlur={onBlurField}/>
            <div className={setClasses(styles.submit, 'flex')}>
                <Button text={resError || 'Log in'} disabled={!!resError}
                        onClick={() => {
                            loginAPI.login({
                                email: state.loginEmail,
                                hash: state.loginPassword
                            })
                                .then(() => {
                                    return true
                                })
                                .catch(() => {
                                    return false
                                })
                                .then((res: boolean) => {
                                    clearState()
                                    dispatch(appUpdateState({
                                        authenticated: res
                                    }))
                                    if (res) {
                                        dispatch(appUpdateState({
                                            windowWrapper: undefined
                                        }))
                                    }
                                })
                        }}
                />
            </div>
        </div>
    )
})