// Chakra imports
import { Portal, Box } from '@chakra-ui/react';
// Layout components
import Navbar from "../components/Navbar";
import Sidebar from '../components/Sidebar';
import React from 'react';
import {Outlet} from 'react-router-dom';
import Footer from "../components/footer/FooterAdmin";

// Custom Chakra theme
 function AdminLayout() {

    return (
        <Box>
            <Sidebar/>
            <Box className="main"
                 float='right'
                 minHeight='100vh'
                 height='100%'
                 overflow='auto'
                 position='relative'
                 maxHeight='100%'
                 w={{base: '100%', xl: 'calc( 100% - 290px )'}}
                 maxWidth={{base: '100%', xl: 'calc( 100% - 290px )'}}
                 transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
                 transitionDuration='.2s, .2s, .35s'
                 transitionProperty='top, bottom, width'
                 transitionTimingFunction='linear, linear, ease'>
                <Portal>
                    <Box>
                        <Navbar/>
                    </Box>
                </Portal>
                <Box>
                    <Outlet/>
                </Box>
                <Box>
                    <Footer/>
                </Box>
            </Box>
        </Box>
    )
}

export default AdminLayout;