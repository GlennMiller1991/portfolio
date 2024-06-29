import React from 'react';
import './index.css'
import {WindowWrapper} from './common/components/WindowWrapper/WindowWrapper'
import {Alert} from './common/components/Alert/Alert'
import {observer} from "mobx-react-lite";
import {Route, Routes} from "react-router-dom";
import {Portfolio} from "./pages/portfolio/portfolio";
import {Login} from "./pages/auth/Login/Login";
import {AppContext} from "./app/app.context";
import {app} from "./app/constants";

export const App = observer(() => {

    if (!app.isAppReady) return null
    console.log('app is ready')
    return (
        <AppContext.Provider value={app}>
            <div>
                <Routes>
                    <Route path={'/auth'} element={<Login/>}/>
                    <Route path={'/*'} element={<Portfolio/>}/>
                </Routes>
                {
                    app.windowContent &&
                    <WindowWrapper>
                        {
                            app.windowContent
                        }
                    </WindowWrapper>
                }
                {
                    app.alertMessage &&
                    <Alert>
                        {
                            app.alertMessage
                        }
                    </Alert>
                }
            </div>
        </AppContext.Provider>
    );
})


