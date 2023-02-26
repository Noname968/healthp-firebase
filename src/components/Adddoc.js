import React, { useState, useContext } from 'react'
import Navbar from '../components/Navbar';
import { storageRef, firestore } from '../firebase';
import profilecontext from '../context/Profilecontext'
import 'firebase/compat/firestore';
import './Adddoc.css'

function Adddoc() {
    const context = useContext(profilecontext);
    const { user } = context;
    const [name, setname] = useState('');
    const [file, setFile] = useState(null);

    const handleImageChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFormSubmit = (e) => {
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
                    })
                });
            }
        );
    };

    return (
        <div>
            <Navbar />
            <form action="" className='dform' onSubmit={handleFormSubmit}>
                <div className="form-outline mb-4">
                    <label className="form-label" for="loginName">Name</label>
                    <input type="text" id="loginName" className="form-control form-control-lg" placeholder='Enter Doc Name' value={name} onChange={(e) => setname(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label for="formFileMultiple" className="form-label">Add a file</label>
                    <input className="form-control form-control-lg" type="file" id="formFileMultiple" onChange={handleImageChange} required />
                </div>
                <div className="mb-3 bb">
                    <button type='submit' className="bt">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Adddoc
