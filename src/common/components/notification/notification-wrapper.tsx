import {Notification} from "../../../app/notification/notification";
import React, {useEffect} from "react";

type INotificationWrapper = {
    notification: Notification;
    didComponentMount: (notification: Notification) => void;
}
export const NotificationWrapper: React.FC<React.PropsWithChildren<INotificationWrapper>> = React.memo(({
                                                                                                            children,
                                                                                                            notification,
                                                                                                            didComponentMount,
                                                                                                        }) => {

    useEffect(() => {
        didComponentMount(notification)
    }, []);

    return <>
        {
            children
        }
    </>
})