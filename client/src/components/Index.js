import React, { useState } from "react";

function Index() {

  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handlesubmit = async()=>{
     if (note === null || !("Name" in note) || !("Age" in note) || !("Gender" in note) || !("Fav_Number" in note)){
      setError({"msg":"Enter correct values","status":"warning"})
     }
     else{
      setError(null);
      await fetch("http://127.0.0.1:5000/api/note/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((response) => response.json())
      .then((data) => {
        setError(data);
      })
      .catch((error) => {
        console.error("Failed to save data:", error);
      });
     }
    
  }
  return (
    <div>
      <div className="h-100 h-custom">
        <div className="container py-5 h-100">
        {error && (
        <div className={`alert alert-${error.status}`} role="alert">
          {error.msg}
        </div>
      )}
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3">
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Form</h3>

                  <div className="px-md-2">
                    <div className="form-outline mb-4">
                      <input type="text" id="form3Example1q" className="form-control" name="Name" onChange={onchange} required/>
                      <label className="form-label" htmlFor="form3Example1q">
                        Name
                      </label>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline datepicker">
                          <input type="text" className="form-control" id="exampleDatepicker1" name="Age" onChange={onchange} required/>
                          <label htmlFor="exampleDatepicker1" className="form-label">
                            Age
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <select className="form-select" aria-label="Default select example" name="Gender" onChange={onchange} required>
                          <option value="">Open this select menu</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                        <label htmlFor="exampleDatepicker1" className="form-label">
                          Gender
                        </label>
                      </div>
                    </div>

                    <div className="mb-4">
                      <select className="form-select" aria-label="Default select example" name="Fav_Number" onChange={onchange} required>
                        <option value="">Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        <option value="4">Four</option>
                        <option value="5">Five</option>
                        <option value="6">Six</option>
                        <option value="7">Seven</option>
                        <option value="8">Eight</option>
                        <option value="9">Nine</option>
                        <option value="0">Zero</option>
                      </select>
                      <label htmlFor="exampleDatepicker1" className="form-label">
                        Fav Number
                      </label>
                    </div>

                    <button type="submit" className="btn btn-success btn-lg mb-1" onClick={handlesubmit}>
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
