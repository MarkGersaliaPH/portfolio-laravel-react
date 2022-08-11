import React, { useState,useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/inertia-react';
import Navbar from './Admin/Navbar';
import BreadcrumbExample from './Admin/Breadcrumbs';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from 'react-bootstrap'; 

export default function Authenticated({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    let { flash } = usePage().props; 
    const notify = (message) => {
        toast.success(message);
    }
    useEffect(() => {
        {flash.message && (
            notify(flash.message)
            )} 
    },[1])
 
    return (
        <>
        <div className='bg-light pb-3 relative' >
                <Navbar auth={auth} /> 
                    <div >
                    <div className="bg-white pb-1 pt-3"  style={{marginTop:'50px'}}>
                        <div className="container" > 
                    <BreadcrumbExample/>
                        </div>
                    </div>
                    <main className="container my-3" >
                        <div className='mb-3'>{header}</div> 
                       
                       <Toaster
                           position="top-right"
                            reverseOrder={false}
                            toastOptions={{
                                // Define default options 
                                duration: 5000, 
                               
                              }}/> 
                        {children}
                    </main>
            </div> 
                </div> 
        {/* <div className="footer p-3 bg-white">
        <div className="text-center">
            Copyright &copy; 2022 
        </div>
            </div> */}
            </>
    ) 
}
