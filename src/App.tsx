import React, {useState} from 'react';
import './index.css'
import {WindowWrapper} from './common/components/WindowWrapper/WindowWrapper'
import {Alert} from './common/components/Alert/Alert'
import {observer} from "mobx-react-lite";
import {Route, Routes} from "react-router-dom";
import {Portfolio} from "./pages/portfolio/portfolio";
import {AppContext} from "./app/app.context";
import {AppController} from "./app/infra/app.controller";

export const App = observer(() => {

    const [app] = useState(() => new AppController())


    if (!app.isAppReady) return null
    return (
        <AppContext.Provider value={app}>
            <div>
                <Routes>
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
                    app.notification &&
                    <Alert>
                        {
                            app.notification
                        }
                    </Alert>
                }
            </div>
        </AppContext.Provider>
    );
})


