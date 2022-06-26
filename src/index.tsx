import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";

import {store} from "./state/store";
import AppWithRedux from "./AppWithRedux";

import './index.css';


ReactDOM.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>,
    document.getElementById('root')
);
