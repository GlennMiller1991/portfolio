import React from 'react'
import styles from './notification.module.scss'
import {setClasses} from '../../../lib/common/set-classes'
import {observer} from "mobx-react-lite";
import {CgClose} from "react-icons/cg";
import {NotificationQueue} from "../../../app/notification/notification-queue";
import {NotificationWrapper} from "./notification-wrapper";
import {NotificationView} from "./notification-view";


type INotificationContainer = {
    controller: NotificationQueue
}
export const NotificationContainer: React.FC<INotificationContainer> = observer(({
                                                                                     controller
                                                                                 }) => {

    return (
        <div className={styles.container}>
            {
                !!controller.queue.length &&
                <NotificationWrapper key={controller.queue[0].id}
                                     notification={controller.queue[0]}
                                     didComponentMount={controller.didComponentMount}>
                    <div
                        onAnimationEnd={controller.isDisappearingPhase ? controller.onAnimationEnd : undefined}
                        className={setClasses(
                            controller.isDisappearingPhase ? styles.animatedDisappearance : styles.animatedAppearance,
                            styles.notification, 'flexCenter'
                        )}>
                        <NotificationView controller={controller.queue[0]}/>
                        <div className={styles.closeBtn} onClick={() => controller.remove(controller.queue[0])}>
                            <CgClose/>
                        </div>
                    </div>
                </NotificationWrapper>
            }

        </div>
    )

})


