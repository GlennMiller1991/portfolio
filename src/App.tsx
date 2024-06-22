import React, {useState} from 'react';
import './index.css'
import {WindowWrapper} from './common/components/WindowWrapper/WindowWrapper'
import {Alert} from './common/components/Alert/Alert'
import {observer} from "mobx-react-lite";
import {Route, Routes} from "react-router-dom";
import {Portfolio} from "./pages/portfolio/portfolio";
import {Login} from "./pages/auth/Login/Login";
import {AppController} from "./app/app.controller";
import {AppContext} from "./app/app.context";

export const App = observer(() => {
    const [appController] = useState(() => new AppController())

    if (!appController.isAppReady) return null
    return (
        <AppContext.Provider value={appController}>
            <div>
                <Routes>
                    <Route path={'/auth'} element={<Login/>}/>
                    <Route path={'/*'} element={<Portfolio/>}/>
                </Routes>
                {
                    appController.windowContent &&
                    <WindowWrapper>
                        {
                            appController.windowContent
                        }
                    </WindowWrapper>
                }
                {
                    appController.alertMessage &&
                    <Alert>
                        {
                            appController.alertMessage
                        }
                    </Alert>
                }
            </div>
        </AppContext.Provider>
    );
})


