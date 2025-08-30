import React, {useState} from 'react';
import './index.css'
import {NotificationContainer} from './common/components/notification/notification-container'
import {observer} from "mobx-react-lite";
import {Portfolio} from "./pages/portfolio/portfolio";
import {AppContext} from "./app/app.context";
import {AppController} from "./app/app.controller";
import {Tools} from "@src/tools/tools";

export const App = observer(() => {

    const [app] = useState(() => new AppController())


    if (!app.isAppReady) return null

    return (
        <AppContext.Provider value={app}>
            <div>
                <Portfolio/>
                <NotificationContainer controller={app.notificationsQueue}/>
                <Tools/>
            </div>
        </AppContext.Provider>
    );
});


