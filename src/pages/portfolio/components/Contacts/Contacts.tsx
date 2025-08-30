import React, {useMemo, useState} from 'react';
import commonStyles from '../../../../common/styles/common.module.scss'
import styles from './Contacts.module.scss'
import {Input} from '@src/common/components/Input/Input'
import {setClasses} from '@src/lib/common/set-classes'
import {Button} from '@src/common/components/button/Button'
import {tObjectValidators, Validator} from '@src/lib/form/validator'
import {emailRegexp, telegramRegexp} from '@src/lib/common/regexps'
import en from '../../../../app/dictionary/en.json'
import {IMessage} from "@src/models/message.model";
import {MessageService} from "@src/services/message/message.service";
import {useAppContext} from "@src/app/app.context";
import {Notification} from "@src/app/notification/notification";
import {useFieldState} from "@src/lib/form/use-field-state";
import {observer} from "mobx-react-lite";

type IContactForm = Omit<IMessage, 'email' | 'telegram'> & {
    backRoute: string
}
export const Contacts = observer(() => {
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
                    validator.required(() => app.dictionary.validatorMessage.required),
                    validator.checkMaxStringLength(40, () => `${app.dictionary.contacts.formFields.backRoute}. ${app.dictionary.validatorMessage.maxLength}: 40`),
                    validator.checkCustom((value: string) => {
                        // let isTelegramLink = false;
                        let isTelegramLink = value.startsWith('@');
                        let template = isTelegramLink ? telegramRegexp : emailRegexp
                        let isError = !!validator.checkTemplate(template)('backRoute')
                        if (!isError) return;
                        // return app.dictionary.validatorMessage.email;
                        return 'Tg: @aA1_ ' + 'email: email@email.com'
                    })
                ]
            },
            author: {
                validators: [
                    validator.required(() => app.dictionary.validatorMessage.required),
                    validator.checkMaxStringLength(20, () => `${app.dictionary.contacts.formFields.name}. ${app.dictionary.validatorMessage.maxLength}: ${20}`),
                ]
            },
            subject: {
                validators: [
                    validator.required(() => app.dictionary.validatorMessage.required),
                    validator.checkMaxStringLength(150, () => `${app.dictionary.contacts.formFields.subject}. ${app.dictionary.validatorMessage.maxLength}: ${150}`)
                ]
            },
            body: {
                validators: [
                    validator.required(() => app.dictionary.validatorMessage.required),
                    validator.checkMaxStringLength(1500, () => `${app.dictionary.contacts.formFields.body}. ${app.dictionary.validatorMessage.maxLength}: ${1500}`)
                ]
            }

        }
        validator.updateValidators(validators)
        return validator
    }, [])
    const formState = useFieldState<IContactForm>(validator)

    return (
        <Section header={app.dictionary.sections.contacts}
                 id={en.sections.contacts}
                 containerClassName={styles.wrapper}>
            <div className={styles.inputs}>
                        <Input onChange={formState.onChange}
                               containerClass={styles.name}
                               onBlur={formState.onBlur}
                               data-name={'author'}
                               value={formState.data.author}
                               name={app.dictionary.contacts.formFields.name}
                        />
                        <Input onChange={formState.onChange}
                               containerClass={styles.email}
                               onBlur={formState.onBlur}
                               data-name={'backRoute'}
                               value={formState.data.backRoute}
                               name={app.dictionary.contacts.formFields.backRoute}
                        />
                        <Input onChange={formState.onChange}
                               containerClass={styles.subject}
                               onBlur={formState.onBlur}
                               data-name={'subject'}
                               value={formState.data.subject}
                               name={app.dictionary.contacts.formFields.subject}
                        />
                        <Input onChange={formState.onChange}
                               containerClass={styles.message}
                               asTextArea
                               onBlur={formState.onBlur}
                               data-name={'body'}
                               value={formState.data.body}
                               name={app.dictionary.contacts.formFields.body}
                        />
                        <div className={setClasses(styles.submit, 'flex')}>
                            <Button
                                text={(formState.isAllTouched && formState.error) ? formState.error : app.dictionary.contacts.sendMsg}
                                disabled={!formState.isAllTouched || !!formState.error}
                                onClick={async () => {
                                    const notification = new Notification(new Date().valueOf())

                                    try {
                                        const isTelegramLink = formState.data.backRoute.startsWith('@');
                                        const data = formState.data;
                                        await service.create({
                                            author: data.author,
                                            subject: data.subject,
                                            body: data.body,
                                            email: isTelegramLink ? undefined : data.backRoute,
                                            telegram: isTelegramLink ? data.backRoute : undefined,
                                        } as IMessage)
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
        </Section>
    )
});

type ISection = {
    id?: string,
    containerClassName?: string,
    header?: string,
}
export const Section: React.FC<React.PropsWithChildren<ISection>> = (({
                                                                                    children,
                                                                                    id,
                                                                                    containerClassName,
                                                                                    header,
                                                                      }) => {
    return (
        <div id={id} className={containerClassName}>
            <div className={commonStyles.container}>
                {
                    header &&
                    <h2 className={commonStyles.title}>
                        <span className={commonStyles.upperThenHeader}>{header}</span>
                        {header}
                    </h2>
                }
                {
                    children
                }
            </div>
        </div>
    )
})

