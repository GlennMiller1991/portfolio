import React, {Suspense, useState} from 'react';
import './index.css'
import {NotificationContainer} from './common/components/notification/notification-container'
import {observer} from "mobx-react-lite";
import {Portfolio} from "./pages/portfolio/portfolio";
import {AppContext} from "./app/app.context";
import {AppController} from "./app/app.controller";
import {WindowWrapperLazy} from "./common/components/window-wrapper/window-wrapper-lazy";

export const App = observer(() => {

    const [app] = useState(() => new AppController())


    if (!app.isAppReady) return null

    return (
        <AppContext.Provider value={app}>
            <div>
                <Portfolio/>
                {
                    app.windowContent &&
                    <Suspense>
                        <WindowWrapperLazy>
                            {
                                app.windowContent
                            }
                        </WindowWrapperLazy>
                    </Suspense>
                }

                <NotificationContainer controller={app.notificationsQueue}/>
            </div>
        </AppContext.Provider>
    );
})


