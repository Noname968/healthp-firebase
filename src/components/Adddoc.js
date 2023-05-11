import React, { useState, useContext } from 'react'
import Navbar from '../components/Navbar';
import { storageRef, firestore } from '../firebase';
import profilecontext from '../context/Profilecontext'
import 'firebase/compat/firestore';
import './Adddoc.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chatbot from './Chatbot';

function Adddoc() {
    const context = useContext(profilecontext);
    const { user } = context;
    const [name, setname] = useState('');
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(false)

    const notifysuccess = () => toast.success("Upload Successful");
    const notifyfailure = (error) => toast.success(error);

    const handleImageChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFormSubmit = (e) => {
        setProgress(true)
        e.preventDefault();
        const imageRef = storageRef.child(`Files/${file.name}`);
        const uploadTask = imageRef.put(file);
        uploadTask.on('state_changed',
            (snapshot) => {
                // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // setProgress(progress);
            },
            (error) => {
                console.error(error);
                notifyfailure(error);
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
                    await firestore.collection('userfiles').add({
                        userid: user.uid,
                        name: name,
                        fileUrl: downloadURL,
                        createdAt: new Date(),
                    }).then(() => {
                        console.log('Added')
                        setProgress(false)
                        notifysuccess();
                    })
                });
            }
        );
    };

    return (
        <>
            {progress && (
                <>
                    <div className="overlay"></div>
                    <div className="spanner">
                        <div className="loader"></div>
                        <p>Uploading Doc, please be patient.</p>
                    </div>
                </>
            )}
            <div>
                <Navbar />
                <form action="" className='dform' onSubmit={handleFormSubmit}>
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="loginName">Name</label>
                        <input type="text" id="loginName" className="form-control form-control-lg" placeholder='Enter Doc Name' value={name} onChange={(e) => setname(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="formFileMultiple" className="form-label">Add a file</label>
                        <input className="form-control form-control-lg" type="file" id="formFileMultiple" onChange={handleImageChange} required />
                    </div>
                    <div className="mb-3 bb">
                        <button type='submit' className="bt">Submit</button>
                    </div>
                </form>
            </div>
            <Chatbot/>
            <ToastContainer/>
        </>
    )
}

export default Adddoc
