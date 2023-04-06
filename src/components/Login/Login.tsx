import React, {useCallback, useState, useMemo} from 'react'
import {Input} from '../../common/components/Input/Input'
import {Button} from '../../common/components/Button/Button'
import styles from './Login.module.scss'
import {setClasses} from '../../common/utils/setClasses'
import {useFieldState} from '../../common/customHooks/useFieldState'
import {useDispatch, useSelector} from 'react-redux'
import {tErrors} from '../../common/types/types'
import {stateType} from '../../redux/store'
import {appUpdateState} from '../../redux/appReducer/appReducer'
import {loginAPI} from '../../common/api/loginAPI'
import commonStyles from '../../common/styles/CommonStyles.module.scss'
import {tObjectValidators, Validator} from '../../common/validators/Validator'
import {emailRegexp, telegramRegexp} from '../../common/constants/regexps'
import {Row} from '../../common/components/Row/Row';

export type tSignupParams = {
    firstName: string,
    lastName: string,
    email: string,
    telegram: string,
    password: string,
    confirmPassword: string,
}

export type tLoginParams = {
    loginEmail: string,
    loginPassword: string,
}

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
    const validator = useMemo(() => {
        const loginParams: tLoginParams = {
            loginPassword: '',
            loginEmail: '',
        }
        const validator = new Validator<tLoginParams>(loginParams)
        const validators: tObjectValidators<tLoginParams> = {
            loginEmail: {
                validators: [
                    validator.required(),
                    validator.checkMaxStringLength(20),
                    validator.checkTemplate(emailRegexp),
                ]
            },
            loginPassword: {
                validators: [
                    validator.required(),
                    validator.checkMaxStringLength(20),
                ]
            }

        }
        validator.updateValidators(validators)
        return validator
    }, [])
    const [state, onChange, clearState, onBlur] = useFieldState<tLoginParams>(validator)
    const dispatch = useDispatch()

    return (
        <>
            <h1>
                SIGN IN
                <span className={commonStyles.upperThenHeader}>SIGN IN</span>
            </h1>
            <Input value={state.data.loginEmail} name={'Email'} data-name={'loginEmail'}
                   focusedBackgroundClass={styles.focusedText}
                   onChange={onChange}
                   onBlur={onBlur}/>
            <Input value={state.data.loginPassword} type={'password'} name={'Password'} data-name={'loginPassword'}
                   focusedBackgroundClass={styles.focusedText}
                   onChange={onChange}
                   onBlur={onBlur}/>
            <div className={setClasses(styles.submit, 'flex')}>
                <Button text={state.resError || 'Sign in'} disabled={!!state.resError}
                        onClick={() => {
                            loginAPI.login({
                                email: state.data.loginEmail,
                                hash: state.data.loginPassword
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

    const validator = useMemo(() => {
        const signupParams: tSignupParams = {
            firstName: '',
            lastName: '',
            email: '',
            telegram: '',
            password: '',
            confirmPassword: '',
        }
        const validator = new Validator<tSignupParams>(signupParams)
        const validators: tObjectValidators<tSignupParams> = {
            confirmPassword: {
                validators: [
                    validator.required(),
                    validator.checkMaxStringLength(20),
                    validator.compareWith('password')
                ]
            },
            firstName: {
                validators: [
                    validator.required(),
                    validator.checkMaxStringLength(20),
                    validator.checkMinStringLength(3),

                ]
            },
            lastName: {
                validators: [
                    validator.required(),
                    validator.checkMaxStringLength(20),
                    validator.checkMinStringLength(3),
                ]
            },
            email: {
                validators: [
                    validator.required(),
                    validator.checkMaxStringLength(40),
                    validator.checkTemplate(emailRegexp),
                ]
            },
            password: {
                validators: [
                    validator.required(),
                    validator.checkMaxStringLength(20),
                    validator.compareWith('password')
                ]
            },
            telegram: {
                validators: [
                    validator.required(),
                    validator.checkMaxStringLength(20),
                    validator.checkTemplate(telegramRegexp),
                ]
            },
        }
        validator.updateValidators(validators)
        return validator
    }, [])
    const [state, onChange, clearState, onBlur] = useFieldState<tSignupParams>(validator)

    return (
        <>
            <h1>
                SIGN UP
                <span className={commonStyles.upperThenHeader}>SIGN UP</span>
            </h1>
            <Row withWrap>
                <Input value={state.data.firstName}
                       containerClass={styles.inputContainer}
                       name={'First name'} data-name={'firstName'}
                       onChange={onChange}
                       onBlur={onBlur}/>
                <Input value={state.data.lastName} name={'Last name'} data-name={'lastName'}
                       containerClass={styles.inputContainer}
                       onChange={onChange}
                       onBlur={onBlur}/>
                <Input value={state.data.email} name={'Email'} data-name={'email'}
                       containerClass={styles.inputContainer}
                       onChange={onChange}
                       onBlur={onBlur}/>
                <Input value={state.data.telegram} name={'Telegram'} data-name={'telegram'}
                       containerClass={styles.inputContainer}
                       onChange={onChange}
                       onBlur={onBlur}/>
                <Input value={state.data.password} type={'password'} name={'Password'} data-name={'password'}
                       onChange={onChange}
                       containerClass={styles.inputContainer}
                       onBlur={onBlur}/>
                <Input value={state.data.confirmPassword} type={'password'} name={'Confirm password'}
                       data-name={'confirmPassword'}
                       containerClass={styles.inputContainer}
                       onChange={onChange}
                       onBlur={onBlur}/>
            </Row>
            <div className={setClasses(styles.submit, 'flex')}>
                <Button text={state.resError || 'Sign up'} disabled={!!state.resError}
                        onClick={() => {
                            loginAPI.signup(state.data)
                                .then(() => {
                                    clearState()
                                })
                                .catch((err) => {
                                    alert(err.message)
                                })
                        }}
                />
            </div>
        </>
    )
})