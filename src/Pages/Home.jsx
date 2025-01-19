import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteDataApi, editDataApi, getDataApi } from '../Services/allApi';


function Home({datas}) {

  const [show, setShow] = useState(false);

  const [addData,setAddData] = useState([])

  const [deleteStatus , setDeleteStatus] = useState({})

  const [editData ,setEditData] = useState({})
  
  const [updateStatus, setUpdateStatus] = useState(false);
  

  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setEditData({
      id: item.id,
      username: item.username,
      emailId: item.emailId,
      mobile: item.mobile
    });
    setShow(true);
  };

  console.log(editData);
  

  const getData = async()=>{
    const result = await getDataApi()
    setAddData(result.data)
  }
  console.log(addData);
  

  const handleDelete = async(id) =>{
    const result = await deleteDataApi(id)
    console.log(result);
    
    if(result.status>=200 && result.status<300){
      setDeleteStatus(result)
    }
  }
  
const handleUpdate = async () => {
  const result = await editDataApi(editData.id, editData)
  if (result.status >= 200 && result.status < 300) {
    alert('Data updated successfully')
    setUpdateStatus(result)
    handleClose()
  } else {
    alert('Failed to update data')
  }
}
  
  useEffect(() => {
    getData()
  }, [deleteStatus , updateStatus]);

  return (
    <>
      <h1 className='text-center' style={{ marginTop: "100px" }}>User Details</h1>

      <div className='container mt-5'>
        <Table striped bordered hover responsive="sm">
          <thead className="table-dark">
            <tr className='text-center'>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Update</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

          {addData?.map((item,index)=>(
            <tr className="text-center" key={item.id}>
            <td>{index+1}</td>
            <td>{item?.username}</td>
            <td>{item?.emailId}</td>
            <td>{item?.mobile}</td>
            <td><Button variant="primary" onClick={() => handleShow(item)}><FontAwesomeIcon icon={faPenToSquare} /></Button>
              <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Your Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <input onChange={(e) => setEditData({ ...editData, username: e.target.value })} value={editData.username} type="text" className='form-control mt-2' placeholder='Name' /> 
                  <input onChange={(e) => setEditData({ ...editData, emailId: e.target.value })} value={editData.emailId} type="text" className='form-control mt-2' placeholder='Email' />
                  <input onChange={(e) => setEditData({ ...editData, mobile: e.target.value }) } value={editData.mobile} type="text" className='form-control mt-2' placeholder='Mobile' />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleUpdate} >
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal></td>
            <td><button ><FontAwesomeIcon icon={faTrashCan} onClick={()=>handleDelete(item?.id)} /></button> </td>
          </tr>
           ))
            
          } 

          </tbody>
        </Table>
      </div>

    </>
  )
}

export default Home




