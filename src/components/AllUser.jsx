import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import { getUsers, deleteUser } from "../services/apis";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Alluser = () => {
    var currentId;
    const [users, setUsers] = useState([]);
    const navigate = useNavigate()

    useEffect( () => {
        const auth = localStorage.getItem("loginData");
        if(! auth)
            navigate('/home');
        else
            getAllUsers();
    }, [])

    const getAllUsers = async () => {
        let response = await getUsers();
        //console.log(response.status); // 200 success
        //console.log(response.data); // get object of data
        setUsers(response.data);
    }

    const deleteThisUser = async (id) => {
        if(window.confirm('Are you sure To delete this user?')){
            await deleteUser(id);
            getAllUsers();
        }
        else
            console.log('return no delate');
    }
    return (
        <Table>
            <TableHead>
                <TableRow style={{fontSize:'19'}}>
                    <TableCell>ID</TableCell>
                    <TableCell>NAME</TableCell>
                    <TableCell>USERNAME</TableCell>
                    <TableCell>EMAIL</TableCell>
                    <TableCell>PHONE</TableCell>
                    <TableCell>PASSWORD</TableCell>
                    <TableCell>ACTION</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    users.map((data) => {
                        currentId = (data._id !==null || data._id==undefined) ? data.id : data._id
                        return (
                            <TableRow key={currentId}>
                                <TableCell>{currentId}</TableCell>
                                <TableCell>{data.name}</TableCell>
                                <TableCell>{data.username}</TableCell>
                                <TableCell>{data.email}</TableCell>
                                <TableCell>{data.phone}</TableCell>
                                <TableCell>{data.password}</TableCell>
                                <TableCell>
                                    <Button color="primary" size="small" variant="contained" component={Link} to={`/edit/${currentId}`} startIcon={<EditIcon />}> Edit</Button>&nbsp;
                                    <Button color="secondary" size="small" variant="contained" onClick={()=> deleteThisUser(currentId) } startIcon={<DeleteIcon />}> Delete</Button>
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    )
}

export default Alluser;