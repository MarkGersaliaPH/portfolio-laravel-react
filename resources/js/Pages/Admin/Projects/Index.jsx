import Authenticated from '@/Layouts/Authenticated'
import { Inertia } from '@inertiajs/inertia';
import { Head, usePage } from '@inertiajs/inertia-react'
import React, { useState } from 'react'
import FormModal from './FormModal'

function Index(props) {
    let { data } = usePage().props; 
    let [toggleModal, setToggleModal] = useState(false);
    let [formData, setFormData] = useState({});
    let [editMode, setEditMode] = useState(false);
    let store_url = route('admin.projects.store'); 
    let [actionUrl, setActionUrl] = useState(store_url);
    let [selectedSkills, setSelectedSkills] = useState([]);


 
    const editData = (data) => {
        setToggleModal(true);
        setEditMode(true);
        setFormData(data);

        //convert object to array
        let newArr = [];
        data.skills.map((val, key) => {
            newArr.push(val.display);
        })
  
        setSelectedSkills(newArr) 
        setActionUrl(route('admin.projects.update',data.id))
    };

    const showModal = (param) => {
        setEditMode(false)
        setFormData({}) 
        setToggleModal(param);
        setActionUrl(store_url)
        setSelectedSkills([])
    };

    const deleteData = (data) => {
        Inertia.delete(route('admin.projects.destroy', data));
    }
    return (
        <Authenticated
        auth={props.auth}
        errors={props.errors}
        header={<h1 className="fw-bolder  leading-tight">Projects</h1>}
        >
            <Head title="Projects" />
            <FormModal
                toggleModal={toggleModal}
                showModal={showModal}
                formData={formData}
                setFormData={setFormData}
                editMode={editMode}
                actionUrl={actionUrl}
                modalTitle="Add Project"
                selectedSkills={selectedSkills}
                setSelectedSkills={setSelectedSkills}
            />
            
            <div className="row mt-5">
            {data
                    ? data.map((val, key) => (
                          <div key={key} className="col-md-6 col-lg-4 col-sm-6 mb-3">
                              <div className="card border-0 shadow rounded">
                                  <img
                                      src={val.image}
                                      className="card-img-top mx-auto w-100"
                                      alt="..."
                                  />
                                  <div className="card-body">
                                    <h5 className="card-title fw-bolder">{val.title}</h5>
                                    <a className="text-primary text-decoration-none" target="_blank" href={val.link}>{val.link}</a>
                                      <p className="card-text">
                                          {val.description}
                                    </p>
                                    <div className="mb-3">  
                                        {
                                            val.skills ? val.skills.map((skill, key) => ( 
                                                <span class="badge bg-secondary me-1">{skill.display}</span>
                                                ))
                                                : null
                                        }
                                    </div>
                                     
                                </div>
                                <div className="card-footer">
                                <button
                                          onClick={() => editData(val)}
                                          className="btn btn-info text-white me-2"
                                      >
                                          Edit
                                      </button>
                                      <button onClick={()=>deleteData(val)} className="btn btn-danger">
                                          Delete
                                      </button>
                                </div>
                              </div>
                          </div>
                      ))
                    : null}
                </div>
      </Authenticated>
  )
}

export default Index