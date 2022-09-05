import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { getAllArticles, deleteUser } from "../services/apis";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AllArticles = () => {
  var currentId;
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    getList();

    // const auth = localStorage.getItem("loginData");
    // if(! auth)
    //     navigate('/home');
    // else
    //     getList();
  }, [])

  const getList = async () => {
    let response = await getAllArticles();
    // console.log('response: ', response);
    //console.log(response.status); // 200 success
    //console.log(response.data); // get object of data
    setArticles(response.data);
  }

  const deleteThisUser = async (id) => {
    window.alert('you can not delete now!');
    return;
    if (window.confirm('Are you sure To delete this user?')) {
      await deleteUser(id);
      getList();
    }
    else
      console.log('return no delate');
  }
  return (
    <Table>
      <TableHead>
        <TableRow style={{ fontSize: '19' }}>
          <TableCell>ID</TableCell>
          <TableCell>TITLE</TableCell>
          <TableCell>BODY</TableCell>
          <TableCell>CREATEAT</TableCell>
          <TableCell>UPDATEAT</TableCell>
          <TableCell>ACTION </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          articles.map((data) => {
            currentId = (data._id !==null || data._id==undefined) ? data.id : data._id
            return (
              <TableRow key={currentId}>
                <TableCell>{currentId}</TableCell>
                <TableCell>{data.title}</TableCell>
                <TableCell>{data.body}</TableCell>
                <TableCell>{data.createdAt}</TableCell>
                <TableCell>{data.updatedAt}</TableCell>
                <TableCell>
                  {/* <Button color="primary" size="small" variant="contained" component={Link} to={`/edit/${currentId}`} startIcon={<EditIcon />}> Edit</Button>&nbsp; */}
                  <Button color="primary" size="small" variant="contained" onClick={() => alert("You can't edit now.")} startIcon={<EditIcon />}> Edit</Button>&nbsp;
                  <Button color="secondary" size="small" variant="contained" onClick={() => deleteThisUser(currentId)} startIcon={<DeleteIcon />}> Delete</Button> 
                </TableCell>
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
  )
}

export default AllArticles;