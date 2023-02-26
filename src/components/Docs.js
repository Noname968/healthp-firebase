import React, { useState, useContext, useEffect } from 'react'
import Navbar from './Navbar'
import { firestore } from '../firebase'
import profilecontext from '../context/Profilecontext'
import './Adddoc.css'
import DeleteIcon from '@mui/icons-material/Delete';

function Docs() {
    const context = useContext(profilecontext);
    const { user } = context;
    const [projects, setprojects] = useState([])
    const [name, setname] = useState("")

    useEffect(() => {
        const usersRef = firestore.collection('userfiles').where('userid', '==', user.uid).orderBy("createdAt")
        usersRef.get()
            .then((querySnapshot) => {
                const data = [];
                querySnapshot.forEach((doc) => {
                    const user = {
                        id: doc.id,
                        ...doc.data()
                    };
                    data.push(user);
                });
                setprojects(data.reverse());
            })
            .catch((error) => {
                console.error('Error getting documents: ', error);
            });
    })

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dateconvert = (timestamp) => {
        const datenew = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
        const dateString = datenew.toLocaleString('en-IN', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'Asia/Kolkata' });
        const day = datenew.getDay()
        const dayName = dayNames[day];
        return dateString
    }

    const handledelete = (name) => {
        const usersref = firestore.collection('userfiles').where('name', '==', name);
        usersref.get()
            .then((querySnapshot) => {
                if (querySnapshot.empty) {
                    // notifyfailed('No such project')
                } else {
                    const userRef = querySnapshot.docs[0].ref;
                    userRef.delete()
                        .then(() => {
                            console.log('Document successfully deleted!');
                            // notifydeleted();
                        })
                        .catch((error) => {
                            console.error('Error deleting document: ', error);
                            // notifyfailed(error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error getting document: ', error);
                // notifyfailed(error);
            });
    }

    const handlesearch = (e) => {
        e.preventDefault();
        firestore.collection("userfiles")
            .where("name", "==", name)
            .get()
            .then((querySnapshot) => {
                const updatedResults = [];
                querySnapshot.forEach((doc) => {
                    updatedResults.push({ id: doc.id, ...doc.data() });
                });
                setprojects(updatedResults);
                console.log(updatedResults)
            })
            .catch((error) => {
                console.error("Error searching documents: ", error);
            });
    }

    return (
        <>
            <Navbar />
            <div className='docs'>
                <div className="table-res">
                    <div className="searchh">
                        <form className="navsearch me-auto" onSubmit={handlesearch}>
                            <svg className='ssvg' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.2083 10.8333H11.4842L11.2275 10.5858C12.1258 9.54083 12.6667 8.18417 12.6667 6.70833C12.6667 3.4175 9.99917 0.75 6.70833 0.75C3.4175 0.75 0.75 3.4175 0.75 6.70833C0.75 9.99917 3.4175 12.6667 6.70833 12.6667C8.18417 12.6667 9.54083 12.1258 10.5858 11.2275L10.8333 11.4842V12.2083L15.4167 16.7825L16.7825 15.4167L12.2083 10.8333ZM6.70833 10.8333C4.42583 10.8333 2.58333 8.99083 2.58333 6.70833C2.58333 4.42583 4.42583 2.58333 6.70833 2.58333C8.99083 2.58333 10.8333 4.42583 10.8333 6.70833C10.8333 8.99083 8.99083 10.8333 6.70833 10.8333Z" fill="#7A7A7A" />
                            </svg>
                            <input type="text" name="" id="" className='navs' placeholder='Enter Name of Doc' onChange={(event) => setname(event.target.value)} value={name} />
                        </form>
                    </div>
                    <table className="tbl">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Created At</th>
                                <th>Download</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{project.name}</td>
                                    <td>{dateconvert(project.createdAt.toJSON())}</td>
                                    <td><a href={project.fileUrl} className='clickb' target="_blank">Click Here</a></td>
                                    <td className='bin' data-bs-toggle="modal" data-bs-target="#staticBackdrop"><DeleteIcon />
                                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Confirmation</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        Do you want to delete file- <strong>{project.name}</strong>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                        <button type="button" className="btn btn-primary" onClick={() => handledelete(project.name)}>Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Docs
