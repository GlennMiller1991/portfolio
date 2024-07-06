import React, {useMemo} from 'react';
import commonStyles from '../../../../common/styles/common.module.scss'
import styles from './Contacts.module.scss'
import {Input} from '../../../../common/components/Input/Input'
import {setClasses} from '../../../../common/utils/setClasses'
import {Button} from '../../../../common/components/Button/Button'
import {useFieldState} from '../../../../common/customHooks/useFieldState'
import {messageAPI} from '../../../../common/api/messageAPI'
import {tObjectValidators, Validator} from '../../../../common/validators/Validator'
import {emailRegexp} from '../../../../common/constants/regexps'
import en from './../../../../app/infra/dictionary/en.json'

type tLoginParamType = {
    email: string,
    name: string,
    subject: string,
    message: string,
}

export const Contacts = React.memo(() => {
    const validator = useMemo(() => {
        const loginParams: tLoginParamType = {
            email: '',
            name: '',
            subject: '',
            message: '',
        }
        const validator = new Validator<tLoginParamType>(loginParams)
        const validators: tObjectValidators<tLoginParamType> = {
            email: {
                validators: [
                    validator.required(),
                    validator.checkMaxStringLength(20),
                    validator.checkTemplate(emailRegexp),
                ]
            },
            name: {
                validators: [
                    validator.required(),
                    validator.checkMaxStringLength(20),
                ]
            },
            subject: {
                validators: [
                    validator.required(),
                    validator.checkMaxStringLength(150)
                ]
            },
            message: {
                validators: [
                    validator.required(),
                    validator.checkMaxStringLength(1500)
                ]
            }

        }
        validator.updateValidators(validators)
        return validator
    }, [])
    const [state, onChange, clearState, onBlur] = useFieldState<tLoginParamType>(validator)


    return (
        <div id={en.sections.contacts} className={styles.wrapper}>
            <div className={`${commonStyles.container} ${styles.container}`}>
                <h2 className={commonStyles.title}>
                    <span className={commonStyles.upperThenHeader}>GET IN TOUCH</span>
                    CONTACTS
                </h2>
                <div className={styles.inputs}>
                    <Input onChange={onChange}
                           containerClass={styles.name}
                           onBlur={onBlur}
                           data-name={'name'}
                           value={state.data.name}
                           name={'Name'}
                    />
                    <Input onChange={onChange}
                           containerClass={styles.email}
                           onBlur={onBlur}
                           data-name={'email'}
                           value={state.data.email}
                           name={'Email'}
                    />
                    <Input onChange={onChange}
                           containerClass={styles.subject}
                           onBlur={onBlur}
                           data-name={'subject'}
                           value={state.data.subject}
                           name={'Subject'}
                    />
                    <Input onChange={onChange}
                           containerClass={styles.message}
                           asTextArea
                           onBlur={onBlur}
                           data-name={'message'}
                           value={state.data.message}
                           name={'Message'}
                    />
                    <div className={setClasses(styles.submit, 'flex')}>
                        <Button text={state.resError || 'Send message'} disabled={!!state.resError}
                                onClick={() => {
                                    messageAPI.sendMessage(state.data)
                                        .then(clearState)
                                }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
})

