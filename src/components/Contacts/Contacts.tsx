import React, {useCallback, useState, FocusEvent, ChangeEvent, useMemo} from 'react';
import commonStyles from '../../common/styles/CommonStyles.module.scss'
import styles from './Contacts.module.scss'
import {tErrors} from '../../common/types/types'
import {useDispatch, useSelector} from 'react-redux'
import {appUpdateErrors} from '../../redux/appReducer/appReducer'
import {stateType} from '../../redux/store'
import {Input} from '../../common/components/Input/Input'
import {setClasses} from '../../common/utils/setClasses'
import {Button} from '../../common/components/Button/Button'
import {useFieldState} from '../../common/customHooks/useFieldState'
import {messageAPI} from '../../common/api/messageAPI'
import {requests} from '../../common/api/requests'
import {helloAPI} from '../../common/api/helloAPI'

type tLoginParamType = {
    email: string,
    name: string,
    subject: string,
    message: string,
}
const keys = ['email', 'name', 'subject', 'message'] as Array<keyof tLoginParamType>

export const Contacts = React.memo(() => {
    //error msg
    const [state, onChange] = useFieldState<tLoginParamType>(keys)

    const errors = useSelector<stateType, tErrors>(state => state.appState.errors)
    const dispatch = useDispatch()
    const onBlurField = useCallback((event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const field = event.currentTarget.dataset.name
        const value = event.currentTarget.value.trim()
        let error: tErrors = {[field as string]: ''}
        switch (field) {
            case 'name':
            case 'subject':
            case 'message':
                if (!value) error[field] = `${field} is required field`
                break
            case 'email':
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                    error[field] = 'Invalid email address'
                }
                break
            default:
                return
        }
        dispatch(appUpdateErrors(error))
    }, [])

    const resError: string | undefined = useMemo(() => {
        let res: string | undefined
        if (state.name && state.email && state.subject && state.message) {
            res = errors?.name || errors?.email || errors?.subject || errors?.message
        } else {
            res = 'Fill all required fields'
        }
        return res
    }, [errors, state])

    return (
        <div id={'contacts'} className={styles.wrapper}>
            <div className={`${commonStyles.container} ${styles.container}`}>
                <h2 className={commonStyles.title}>
                    <span className={commonStyles.upperThenHeader}>GET IN TOUCH</span>
                    CONTACTS
                </h2>
                <div className={styles.inputs}>
                    <Input onChange={onChange}
                           containerClass={styles.name}
                           onBlur={onBlurField}
                           data-name={'name'}
                           value={state.name}
                           name={'Name'}
                    />
                    <Input onChange={onChange}
                           containerClass={styles.email}
                           onBlur={onBlurField}
                           data-name={'email'}
                           value={state.email}
                           name={'Email'}
                    />
                    <Input onChange={onChange}
                           containerClass={styles.subject}
                           onBlur={onBlurField}
                           data-name={'subject'}
                           value={state.subject}
                           name={'Subject'}
                    />
                    <Input onChange={onChange}
                           containerClass={styles.message}
                           asTextArea
                           onBlur={onBlurField}
                           data-name={'message'}
                           value={state.message}
                           name={'Message'}
                    />
                    <div className={setClasses(styles.submit, 'flex')}>
                        <Button text={resError || 'Send message'} disabled={!!resError}
                                onClick={() => {
                                    helloAPI.hello()
                                    // messageAPI.sendMessage(state)
                                    //     .then(console.log)
                                    //     .catch(err => console.log(err.message))
                                }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
})

