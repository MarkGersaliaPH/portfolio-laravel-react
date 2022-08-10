import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import React from 'react'

function Index(props) {
    return (
        <Authenticated
        auth={props.auth}
        errors={props.errors}
        header={<h2 className="font-semibold  leading-tight">Messages</h2>}
        >
             <Head title="Messages" />

<div className="card border-0 shadow-sm">
    <div className="card-body">
        Messages
    </div>
</div>
      </Authenticated>
  )
}

export default Index