import React, {useState} from 'react';
import './index.css'
import {WindowWrapper} from './common/components/WindowWrapper/WindowWrapper'
import {NotificationContainer} from './common/components/notification/notification-container'
import {observer} from "mobx-react-lite";
import {Portfolio} from "./pages/portfolio/portfolio";
import {AppContext} from "./app/app.context";
import {AppController} from "./app/app.controller";

export const App = observer(() => {

    const [app] = useState(() => new AppController())


    if (!app.isAppReady) return null

    return (
        <AppContext.Provider value={app}>
            <div>
                <Portfolio/>
                {
                    app.windowContent &&
                    <WindowWrapper>
                        {
                            app.windowContent
                        }
                    </WindowWrapper>
                }

                <NotificationContainer controller={app.notificationsQueue}/>
            </div>
        </AppContext.Provider>
    );
})


