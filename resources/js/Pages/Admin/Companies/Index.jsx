import Authenticated from '@/Layouts/Authenticated'
import { Head } from '@inertiajs/inertia-react'
import React from 'react'

function Index(props) {
    return (
        <Authenticated
        auth={props.auth}
        errors={props.errors}
        header={<h6 className="font-semibold  leading-tight">Companies</h6>}
        >
             <Head title="Companies" />

<div className="card border-0 shadow-sm">
    <div className="card-body">
        Companies
    </div>
</div>
      </Authenticated>
  )
}

export default Index