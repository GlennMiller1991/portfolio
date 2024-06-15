import React, {useCallback, useState, useMemo, useContext} from 'react'
import {Input} from '../../common/components/Input/Input'
import {Button} from '../../common/components/Button/Button'
import styles from './Login.module.scss'
import {setClasses} from '../../common/utils/setClasses'
import {useFieldState} from '../../common/customHooks/useFieldState'
import {useDispatch} from 'react-redux'
import {loginAPI} from '../../common/api/loginAPI'
import commonStyles from '../../common/styles/common.module.scss'
import {tObjectValidators, Validator} from '../../common/validators/Validator'
import {emailRegexp, telegramRegexp} from '../../common/constants/regexps'
import {Row} from '../../common/components/Row/Row';
import {AppContext} from "../../App";

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
    const appController = useContext(AppContext)
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
                                password: state.data.loginPassword
                            })
                                .then((res) => {
                                    if (window.confirm(res.message)) {
                                        appController.setWindowContent(null)
                                        appController.setIsAuthenticated(true)
                                    }
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
export const SignUpPage: React.FC = React.memo(() => {

    const appController = useContext(AppContext)
    const dispatch = useDispatch()
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
                                    appController.setAlertMessage('For sign up complete please follow telegram @AlexandroBasBot')
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