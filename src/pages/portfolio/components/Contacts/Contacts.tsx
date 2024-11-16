import React, {useMemo, useState} from 'react';
import commonStyles from '../../../../common/styles/common.module.scss'
import styles from './Contacts.module.scss'
import {Input} from '../../../../common/components/Input/Input'
import {setClasses} from '../../../../common/utils/setClasses'
import {Button} from '../../../../common/components/Button/Button'
import {useFieldState} from '../../../../common/customHooks/useFieldState'
import {tObjectValidators, Validator} from '../../../../common/validators/Validator'
import {emailRegexp} from '../../../../common/constants/regexps'
import en from './../../../../app/infra/dictionary/en.json'

import {IMessage} from "../../../../models/message.model";
import {MessageService} from "../../../../services/message/message.service";
import {useAppContext} from "../../../../app/app.context";


export const Contacts = React.memo(() => {
    const [service] = useState(() => new MessageService())

    const app = useAppContext()
    const validator = useMemo(() => {
        const loginParams: IMessage = {
            email: 'email@mail.ru',
            author: 'author',
            subject: 'subject',
            body: 'body',
        }
        const validator = new Validator<IMessage>(loginParams)
        const validators: tObjectValidators<IMessage> = {
            email: {
                validators: [
                    validator.required(),
                    validator.checkMaxStringLength(20),
                    validator.checkTemplate(emailRegexp),
                ]
            },
            author: {
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
            body: {
                validators: [
                    validator.required(),
                    validator.checkMaxStringLength(1500)
                ]
            }

        }
        validator.updateValidators(validators)
        return validator
    }, [])
    const [state, onChange, clearState, onBlur] = useFieldState<IMessage>(validator)


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
                           data-name={'author'}
                           value={state.data.author}
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
                           data-name={'body'}
                           value={state.data.body}
                           name={'Message'}
                    />
                    <div className={setClasses(styles.submit, 'flex')}>
                        <Button text={state.resError || 'Send message'} disabled={!!state.resError}
                                onClick={async () => {
                                    try {
                                        await service.create(state.data)
                                        app.setNotification(app.dictionary.messages.delivered)
                                        clearState()
                                    } catch ({message}) {
                                        app.setNotification(app.dictionary.messages.notDelivered)
                                    }
                                }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
})

