import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import axios from "axios";
import ReadTable from "./ReadTable";

function Table() {
  const [searchquery, setSearchquery] = useState("");
  const [posts, setPosts] = useState([]);
  const [drop ,setDrop]=useState([]);

  // Get id
  const [editPostId, setEditPostId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    id: "",
  });

  //edit data
  const handleEditChange = (input) => (e) => {
    e.preventDefault();
    setEditFormData({ ...editFormData, [input]: e.target.value });
  };

  // edit model data
  const handleEditPostForm = (e, post) => {
    e.preventDefault();

    setEditPostId(post.id);
    const formValues = {
      name: post.name,
      id: post.id,
    };
    setEditFormData(formValues);
  };

  //save form data
  const handleFormSave = (e) => {
    e.preventDefault();
    const savePost = {
      name: editFormData.name,
      id: editFormData.id,
    };
    const newPosts = [...posts];
    const formIndex = posts.findIndex((post) => post.id === editPostId);
    newPosts[formIndex] = savePost;
    setPosts(newPosts);
    setEditPostId(null);
  };

  // delete data
  const handleDelete = (e) => {
    e.preventDefault();
    const newPosts = [...posts];
    const formIndex = posts.findIndex((post) => post.id === editPostId);

    // print data in console
    let printdataconsole = newPosts.splice(formIndex, 1);
    console.log("delete data ");
    console.log(printdataconsole);

    setPosts(newPosts);
  };

  //search fillter data
 function search(posts) {
    return posts.filter((row) =>
      row.name.toLowerCase().indexOf((searchquery) > -1)
    );
  }


  const fetchUrl =
    "https://api.postman.com/collections/24582109-37d97559-22b0-42e0-b592-7fd8b90b8e01?access_key=PMAT-01GXAEX88FNRZN45AWACQ2V20F";
  useEffect(() => {
    async function fetchData() {
      const data = await axios.get(fetchUrl);
      setPosts(data.data.collection.item.filter((item) => item.name.toLowerCase().includes(searchquery)))
      setDrop(data.data.collection.item);
    
      // setPosts(data)
    }
    fetchData();
  }, [searchquery]);
  console.log(posts);
  return (
    <div>
      <form className="row g-3 ms-auto m-8" style={{ margin: "20px" }}>
        <div className="col-auto">
          <input
            type="text"
            className="form-control ms-auto"
            placeholder="search data"
            value={searchquery}
            onChange={(e) => setSearchquery(e.target.value)}
          />
        </div>
      </form>

{/* //dropdown */}
     <div>
      <select >

         {drop 
            ?drop.map((dropx)=>{
              <option>{dropx.name}</option>
            }):null
          }
          </select>
     </div>
      
      <table className="table table-bordered border-primary table table-responsible">
        <thead>
          <tr>
            <th scope="col">name</th>
            <th scope="col">id</th>
            <th scope="col">action</th>
          
          </tr>
        </thead>
        <tbody>
          <ReadTable
            posts={search(posts)}
            handleEditPostForm={handleEditPostForm}
          ></ReadTable>
        </tbody>
      </table>

      {/* Edit modal design */}
      <div
        className="modal fade"
        id="editModalForm"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit row
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleFormSave}>
                <div className="mb-3">
                  <label className="form-label">name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    // placeholder={name}
                    placeholder="name"
                    required
                    value={editFormData.name}
                    onChange={handleEditChange("name")}
                    // disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">id</label>
                  <input
                    type="text"
                    className="form-control"
                    name="id"
                    placeholder="id"
                    required
                    value={editFormData.id}
                    onChange={handleEditChange("id")}
                    disabled
                  />
                </div>
          
                <div className="modal-footer d-block">
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-success float-end"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleDelete}
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-danger float-start"
                  >
                    Delete
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;