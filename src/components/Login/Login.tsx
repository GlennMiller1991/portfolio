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

type tSignupParams = {
    firstName: string,
    lastName: string,
    email: string,
    telegram: string,
    password: string,
    confirmPassword: string,
}
const signupKeys = ['firstName', 'lastName', 'email', 'telegram', 'password', 'confirmPassword'] as Array<keyof tSignupParams>

type tLoginParams = {
    loginEmail: string,
    loginPassword: string,
}
const keys = ['loginEmail', 'loginPassword'] as Array<keyof tLoginParams>

export const Login: React.FC = React.memo(() => {
    const [state, setState] = useState<{
        loginMode: boolean
    }>({
        loginMode: true,
    })

    const switchMode = useCallback(() => {
        setState(prev => ({...prev, loginMode: !prev.loginMode}))
    }, [])

    return (
        <div className={styles.container}>
            {
                state.loginMode ?
                    <LoginPage/> :
                    <SignUpPage/>
            }
            <div className={setClasses(styles.submit, 'flex')}>
                <Button text={state.loginMode ? 'Sign up' : 'Sign in'}
                        onClick={switchMode}
                />
            </div>
        </div>
    )
})

export const LoginPage: React.FC = React.memo(() => {
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
        <>
            <h1>
                SIGN IN
                <span className={commonStyles.upperThenHeader}>SIGN IN</span>
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
                <Button text={resError || 'Sign in'} disabled={!!resError}
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
        </>
    )
})
export const SignUpPage: React.FC = React.memo(() => {
    const [state, onChange, clearState] = useFieldState<tSignupParams>(signupKeys)
    const dispatch = useDispatch()
    const errors = useSelector<stateType, tErrors>(state => state.appState.errors)

    const onBlurField = useCallback((event: FocusEvent<HTMLInputElement>) => {
        const field = event.currentTarget.dataset.name
        const value = event.currentTarget.value.trim()
        let error: tErrors = {[field as string]: ''}
        switch (field) {
            case 'email':
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                    error[field] = 'Invalid email address'
                }
                break
            case 'password':
                if (value !== state.confirmPassword) error[field] = `Passwords are not equal`
                break
            case 'confirmPassword':
                if (value !== state.password) error[field] = `Passwords are not equal`
                break
            case 'telegram':
                if (!/^@[A-Z0-9]+$/i.test(value)) {
                    error[field] = 'Invalid telegram address'
                }
                break
            default:
                return
        }
        dispatch(appUpdateErrors(error))
    }, [state.password, state.confirmPassword])

    const resError: string | undefined = useMemo(() => {
        let res: string | undefined
        if (state.firstName && state.lastName && state.telegram && state.email && state.confirmPassword && state.password) {
            res = errors?.firstName || errors?.lastName || errors?.email || errors?.telegram || errors?.password || errors?.confirmPassword
        } else {
            res = 'Fill all required fields'
        }
        return res
    }, [errors, state])

    return (
        <>
            <h1>
                SIGN UP
                <span className={commonStyles.upperThenHeader}>SIGN UP</span>
            </h1>
            <Input value={state.firstName} name={'First name'} data-name={'firstName'}
                   focusedBackgroundClass={styles.focusedText}
                   onChange={onChange}
                   onBlur={onBlurField}/>
            <Input value={state.lastName} name={'Last name'} data-name={'lastName'}
                   focusedBackgroundClass={styles.focusedText}
                   onChange={onChange}
                   onBlur={onBlurField}/>
            <Input value={state.email} name={'Email'} data-name={'email'}
                   focusedBackgroundClass={styles.focusedText}
                   onChange={onChange}
                   onBlur={onBlurField}/>
            <Input value={state.telegram} name={'Telegram'} data-name={'telegram'}
                   focusedBackgroundClass={styles.focusedText}
                   onChange={onChange}
                   onBlur={onBlurField}/>
            <Input value={state.password} type={'password'} name={'Password'} data-name={'password'}
                   focusedBackgroundClass={styles.focusedText}
                   onChange={onChange}
                   onBlur={onBlurField}/>
            <Input value={state.confirmPassword} type={'password'} name={'Confirm password'}
                   data-name={'confirmPassword'}
                   focusedBackgroundClass={styles.focusedText}
                   onChange={onChange}
                   onBlur={onBlurField}/>
            <div className={setClasses(styles.submit, 'flex')}>
                <Button text={resError || 'Sign up'} disabled={!!resError}
                        onClick={console.log}
                />
            </div>
        </>
    )
})