import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import { Button } from 'react-bootstrap';

export default function Dashboard(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h6 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h6>}
        >
            <Head title="Dashboard" />

            <div className="card border-0 shadow-sm pt-3">
                <div className="card-body">
                    Welcome to dashboard
                </div>
            </div>
        </Authenticated>
    );
}
