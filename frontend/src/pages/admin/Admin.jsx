import React from 'react'
import Layout from '../../component/Layout/Layout'
import AdminMenu from '../../component/Layout/AdminMenu'
import { useAuth } from '../../context/auth'

function Admin() {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu/>
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3 m-6 gap-3 text-xl text-pretty">
              <h3> Admin Name:{auth?.user?.name}</h3>
              <h3> Admin Email:{auth?.user?.email}</h3>
              <h3>Admin Contact:{auth?.user?.phone}</h3>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  )
  
}

export default Admin
