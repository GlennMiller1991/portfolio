import React, {useMemo, useState} from 'react';
import commonStyles from '../../../../common/styles/common.module.scss'
import styles from './Contacts.module.scss'
import {Input} from '../../../../common/components/Input/Input'
import {setClasses} from '../../../../lib/common/set-classes'
import {Button} from '../../../../common/components/button/Button'
import {tObjectValidators, Validator} from '../../../../lib/form/validator'
import {emailRegexp, telegramRegexp} from '../../../../lib/common/regexps'
import en from '../../../../app/dictionary/en.json'
import {IMessage} from "../../../../models/message.model";
import {MessageService} from "../../../../services/message/message.service";
import {useAppContext} from "../../../../app/app.context";
import {Notification} from "../../../../app/notification/notification";
import {useFieldState} from "../../../../lib/form/use-field-state";

type IContactForm = Omit<IMessage, 'email' | 'telegram'> & {
    backRoute: string
}
export const Contacts = React.memo(() => {
    const app = useAppContext()
    const [service] = useState(() => new MessageService(app))

    const validator = useMemo(() => {
        const loginParams: IContactForm = {
            author: '',
            subject: '',
            body: '',
            backRoute: '',
        }
        const validator = new Validator<IContactForm>(loginParams)
        const validators: tObjectValidators<IContactForm> = {
            backRoute: {
                validators: [
                    validator.required(),
                    validator.checkMaxStringLength(40),
                    validator.checkCustom((value: string) => {
                        // TODO бэк не готов
                        let isTelegramLink = false;
                        // let isTelegramLink = value.startsWith('@');
                        let template = isTelegramLink ? telegramRegexp : emailRegexp
                        let isError = !!validator.checkTemplate(template)('backRoute')
                        if (!isError) return
                        return 'Email: email@email.com'
                        // return 'Tg: @aA1_ ' + 'email: email@email.com'
                    })
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
    const formState = useFieldState<IContactForm>(validator)

    return (
        <div id={en.sections.contacts} className={styles.wrapper}>
            <div className={`${commonStyles.container} ${styles.container}`}>
                <h2 className={commonStyles.title}>
                    <span className={commonStyles.upperThenHeader}>GET IN TOUCH</span>
                    CONTACTS
                </h2>
                <div className={styles.inputs}>
                    <Input onChange={formState.onChange}
                           containerClass={styles.name}
                           onBlur={formState.onBlur}
                           data-name={'author'}
                           value={formState.data.author}
                           name={'Name'}
                    />
                    <Input onChange={formState.onChange}
                           containerClass={styles.email}
                           onBlur={formState.onBlur}
                           data-name={'backRoute'}
                           value={formState.data.backRoute}
                           name={'Return address (email or telegram)'}
                    />
                    <Input onChange={formState.onChange}
                           containerClass={styles.subject}
                           onBlur={formState.onBlur}
                           data-name={'subject'}
                           value={formState.data.subject}
                           name={'Subject'}
                    />
                    <Input onChange={formState.onChange}
                           containerClass={styles.message}
                           asTextArea
                           onBlur={formState.onBlur}
                           data-name={'body'}
                           value={formState.data.body}
                           name={'Message'}
                    />
                    <div className={setClasses(styles.submit, 'flex')}>
                        <Button
                            text={(formState.isAllTouched && formState.error) ? formState.error : 'Send message'}
                            disabled={!!formState.error}
                            onClick={async () => {
                                const notification = new Notification(new Date().valueOf())

                                try {
                                    await service.create({...formState.data, email: formState.data.backRoute})
                                    notification.message = app.dictionary.messages.delivered
                                    notification.type = 'success'
                                    formState.clearState()
                                } catch (err) {
                                    notification.message = app.dictionary.messages.notDelivered
                                    notification.type = 'error'
                                }

                                app.notificationsQueue.add(notification)
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
})

