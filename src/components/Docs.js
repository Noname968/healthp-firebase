import React, { useState, useContext, useEffect } from "react";
import Navbar from "./Navbar";
import { firestore } from "../firebase";
import profilecontext from "../context/Profilecontext";
import "./Adddoc.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import Chatbot from "./Chatbot";

function Docs() {
  const context = useContext(profilecontext);
  const { user } = context;
  const [docs, setDocs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [progress, setProgress] = useState(true)

  const notifysuccess = () => toast.success("Deleted Successfully");
  const notifyfailure = (error) => toast.success(error);

  const dateconvert = (timestamp) => {
    const datenew = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
    );
    const dateString = datenew.toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "Asia/Kolkata",
    });
    return dateString;
  };

  useEffect(() => {
    const unsubscribe = firestore.collection("userfiles").where('userid', '==', user.uid).orderBy("createdAt")
      .onSnapshot((querySnapshot) => {
        const updatedDocs = [];
        querySnapshot.forEach((doc) => {
          updatedDocs.push({ id: doc.id, ...doc.data() });
        });
        setDocs(updatedDocs.reverse());
        setProgress(false);
      });
    console.log(docs)
    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  const handleDelete = (id) => {
    firestore.collection("userfiles").doc(id).delete()
      .then(() => {
        console.log("Document successfully deleted!");
        notifysuccess()
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
        notifyfailure(error.message);
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDocs = docs.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      {progress ? (
        <div className="sp">
          <div className="spinner-border " role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>) : (
        <div className="docs">
          <div className="table-res">
            <div className="searchh">
              <form className="navsearch me-auto">
                <svg
                  className="ssvg"
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.2083 10.8333H11.4842L11.2275 10.5858C12.1258 9.54083 12.6667 8.18417 12.6667 6.70833C12.6667 3.4175 9.99917 0.75 6.70833 0.75C3.4175 0.75 0.75 3.4175 0.75 6.70833C0.75 9.99917 3.4175 12.6667 6.70833 12.6667C8.18417 12.6667 9.54083 12.1258 10.5858 11.2275L10.8333 11.4842V12.2083L15.4167 16.7825L16.7825 15.4167L12.2083 10.8333ZM6.70833 10.8333C4.42583 10.8333 2.58333 8.99083 2.58333 6.70833C2.58333 4.42583 4.42583 2.58333 6.70833 2.58333C8.99083 2.58333 10.8333 4.42583 10.8333 6.70833C10.8333 8.99083 8.99083 10.8333 6.70833 10.8333Z"
                    fill="#7A7A7A"
                  />
                </svg>
                <input type="text" name="" id="" className="navs" placeholder="Enter Name of Doc" value={searchTerm} onChange={handleSearch} required />
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
                {filteredDocs.length>0 ? filteredDocs.map((doc, index) => (
                  <tr key={doc.id}>
                    <td>{index + 1}</td>
                    <td>{doc.name}</td>
                    <td>{dateconvert(doc.createdAt.toJSON())}</td>
                    <td><a href={doc.fileUrl} rel="noreferrer" className="clickb" target="_blank">Click Here </a></td>
                    <td className="bin" onClick={() => handleDelete(doc.id)}> <DeleteIcon /> </td>
                  </tr>
                )):(
                  <p className="pp">No docs to display. To add a doc <Link to='/addoc' className="linkto">click Here</Link></p>
                  )}
                  </tbody>
            </table>
          </div>
        </div>
      )}
      <Chatbot/>
      <ToastContainer/>
    </>
  );
}

export default Docs;
