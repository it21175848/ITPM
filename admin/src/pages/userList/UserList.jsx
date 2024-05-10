import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { useState, useEffect } from "react"; // Import useEffect from react
import { userRequest } from "../../requestMethods";
import { Link } from "react-router-dom";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const res = userRequest.get("/users/?new=true").then((res) => {
        const { users } = res.data;
        // Assign unique ids to users
        const usersWithIds = users.map((user, index) => ({
          ...user,
          id: index + 1,
        }));
        setUsers(usersWithIds);
        setLoading(false);
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "username", headerName: "Username", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "isAdmin",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return params.value ? "Admin" : "Customer";
      },
    },
  ];

  return (
    <div className="userList">
      <h1 style={{color: '#005f7f', textAlign: 'left'}}>Ezy-Mall's Users Lists</h1>
      <br/>
      <h3 style={{fontSize: '20px', color: 'green'}}>
        Welcome to our user management dashboard. Here you can view, edit and manage user accounts.
      </h3><br/>

      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}




/*
import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function UserList() {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
*/