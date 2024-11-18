import {Notification} from "../../../app/notification/notification";
import React, {HTMLAttributes} from "react";

type INotification = {
    controller: Notification,
} & HTMLAttributes<HTMLDivElement>
export const NotificationView: React.FC<INotification> = React.memo(({
                                                                         controller,
                                                                     }) => {
    return <>{controller.message}</>
})