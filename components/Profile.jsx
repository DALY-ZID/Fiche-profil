import React, { useState } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Table } from 'reactstrap';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconTrash} from '@tabler/icons-react';
import { Button } from '@mui/material';
import Link from 'next/link';
import AddProfile from "../pages/AddProfile";
import EditRoadIcon from '@mui/icons-material/EditRoad';import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

import { useRouter } from 'next/router';

const Profile = (props) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedData = props.profiles.slice(startIndex, endIndex);

  const router = useRouter();
  return (
    
    <Card>
      
      <CardBody>
        <CardTitle tag="h5">Fiche de profil de `Sifast`</CardTitle>
        <CardSubtitle className="mb-2 text-muted flex items-center justify-between ml-96" tag="h6">
          <Link href='AddProfile'>
          <Button className="bg-primary text-white px-4 py-2 rounded-full ml-96">
  Ajouter un Profil
  <PersonAddAlt1Icon />
</Button>

          </Link>
        </CardSubtitle>
        <div className="table-responsive">
          <Table className="text-nowrap mt-3 align-middle" borderless>
            <thead>
              <tr>
                <th>Employé</th>
                <th>Poste</th>
                <th>SuperViseur</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((profile) => (
                <tr key={profile.id} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      {/* <Link href={`/test?id=${profile.id}`}> */}
                      <Link href={`/DetailsFiche_Profil?id=${profile.id}`}>
                      <Image
                        src={"/assets/images/" + profile.img}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                    </Link>
                        <div className="ms-3">
                          <h6 className="mb-0">{profile.name}</h6>
                          <span className="text-muted">{profile.email}</span>
                        </div>
                      
                      
                    </div>
                  </td>
                  <td>{profile.job}</td>
                  <td>{profile.Equipe}</td>
                  <td>
                    <Tooltip title="Delete">
                      
                      <IconButton aria-label="delete" color="error" onClick={()=>{props.deleteProfile(profile.id)}} >
                        <IconTrash />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <Link href={`/Edit?id=${profile.id}`}>
                      <IconButton aria-label="edit" >
                        <EditRoadIcon />
                      </IconButton>
                      </Link>
                      
                    </Tooltip>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardBody>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={props.profiles.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Paper />
    </Card>
  );
};

export default Profile;
