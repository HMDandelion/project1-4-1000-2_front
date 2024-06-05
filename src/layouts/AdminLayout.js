// Chakra imports
import {Portal, Box, Grid} from '@chakra-ui/react';
// Layout components
import Navbar from "../components/Navbar";
import Sidebar from '../components/Sidebar';
import React from 'react';
import {Outlet} from 'react-router-dom';
import Footer from "../components/footer/FooterAdmin";
import Card from "../components/card/Card";

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
                <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
                    {/* Main Fields */}
                    <Grid
                        templateColumns={{
                            base: "1fr",
                            lg: "1.34fr 1fr 1.62fr",
                        }}
                        templateRows={{
                            base: "repeat(3, 1fr)",
                            lg: "1fr",
                        }}
                        gap={{ base: "20px", xl: "20px" }}>
                    </Grid>
                    <Grid
                        mb='20px'
                        templateColumns={{
                            base: "1fr",
                            lg: "repeat(2, 1fr)",
                            "2xl": "1.34fr 1.62fr 1fr",
                        }}
                        templateRows={{
                            base: "1fr",
                            lg: "repeat(2, 1fr)",
                            "2xl": "1fr",
                        }}
                        gap={{ base: "20px", xl: "20px" }}>

                    </Grid>
                    <Card direction='column' w='100%'>
                        <Outlet/>
                    </Card>
                </Box>
                <Box>
                    <Footer/>
                </Box>
            </Box>
        </Box>
    )
}

export default AdminLayout;