import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App';
import {RouterProvider, createHashRouter} from 'react-router-dom';
import {Provider} from "react-redux";
import {store} from './redux/store';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const router = createHashRouter([
    {
        path: '/*',
        element: <Provider store={store}>
            <App/>
        </Provider>
    }
])

root.render(<RouterProvider router={router}/>);