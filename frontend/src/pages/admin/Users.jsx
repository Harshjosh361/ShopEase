import React from 'react'
import Layout from '../../component/Layout/Layout'
import AdminMenu from '../../component/Layout/AdminMenu'  


function Users() {
  return (
   <Layout>
    <div className="row">
      <div className="col-md-3">
        <AdminMenu></AdminMenu>
      </div>
      <div className="col-md-9">
        <h1>ALl users</h1>
      </div>
    </div>
   </Layout>
  )
}

export default Users
