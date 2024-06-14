import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import store from "./store";
import theme from "./theme/theme"
import {ChakraProvider} from "@chakra-ui/react";
import { createStandaloneToast } from '@chakra-ui/react';
import {BrowserRouter} from "react-router-dom";
const { ToastContainer, toast } = createStandaloneToast();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <ChakraProvider theme={theme}>
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        </ChakraProvider>
        <ToastContainer />
    </>
);