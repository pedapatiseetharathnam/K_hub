import React, { useEffect, useState } from "react";
import Graph from "./Graph";

function Output() {
    const [items, setItems] = useState(null);
    const [query,setQuery] = useState("");
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/note/fetchall", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data[0]["Age"])
        setItems(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="container">
        <div className="container mx-3 my-3">
          <Graph />
          <div className="container mx-3 my-3">
          <input type="text" placeholder="Search.." name="search" className="search" onChange={(e)=>setQuery(e.target.value)}/>
          </div>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Names</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Favourite Number</th>
            </tr>
          </thead>
          <tbody>
          {items &&
            items
            .filter((item)=> item["Name"].toLowerCase().includes(query) || item["Age"].includes(query) || item["Gender"].toLowerCase().includes(query) || item["Fav_Number"].toLowerCase().includes(query))
            .map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item["Name"]}</td>
                  <td>{item["Age"]}</td>
                  <td>{item["Gender"]}</td>
                  <td>{item["Fav_Number"]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Output;
