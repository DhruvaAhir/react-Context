import React, { memo, useState } from 'react'
import { Button, ButtonGroup, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip, Typography, } from '@mui/material'
import Icon from '@mui/material/Icon';
import { useNavigate } from 'react-router-dom';

import EditDialog from './editDialog';
const areEqaul = (prevProps, nextProps) => {
    const prev = prevProps.user
    const next = nextProps.user
    return (prev.id === next.id && prev.firstName === next.firstName && prev.lastName === next.lastName && prev.email === next.email && prev.isDeleted === next.isDeleted)
}
const UserCard =
    memo
        ((props) => {
            console.log('User Card Component Rendered')

            const navigate = useNavigate()
            const [editDialog, setEditDialog] = useState(false)

            const [editingUser] = useState(props.user)
            const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

            const handleDeleteDialogClickOpen = () => {
                setOpenDeleteDialog(true);
            };

            const handleDeleteDialogClose = () => {
                setOpenDeleteDialog(false);
            };
            const user = props.user
            const delBtn = (user.isDeleted) ? (
                <Tooltip title="Restore">
                    <Button onClick={() => {

                        handleDeleteDialogClickOpen()

                    }} color='error'>
                        <Icon Icon fontSize="small"  >
                            restore_from_trash
                        </Icon>
                    </Button >
                </Tooltip>
            ) : (
                <Tooltip title="Delete">
                    <Button color='error' onClick={() => {
                        handleDeleteDialogClickOpen()
                    }}>
                        <Icon Icon fontSize="small" >
                            delete
                        </Icon>
                    </Button >
                </Tooltip>
            )

            const handleEditDialogOpen = () => {
                setEditDialog(true)
            }
            const handleEditDialogClose = () => {
                setEditDialog(false)
            }

            return (
                <div className='user-card'>
                    <div className="is-admin">
                        {user.isAdmin && <Chip className='admin-img' label='Admin' variant="outlined" color="success" />}
                    </div>
                    <div className="is-deleted">
                        {user.isDeleted && <Chip className='deleted-img' label='Deleted' variant="outlined" color="error" />}
                    </div>
                    <div className="img"><img src={user.profileImageUrl} alt="user" /></div>
                    <div className="info-name">
                        {`${user.firstName} ${user.lastName}`}
                    </div>
                    <div className="info">
                        <div className="info-field">
                            <div className="info-q">email:</div>
                            <div className="info-a">                   <Tooltip title={user.email}>
                                <Typography width={'150px'} noWrap>
                                    {user.email}
                                </Typography>
                            </Tooltip>
                            </div>
                        </div>
                        <div className="info-field">
                            <div className="info-q">Phone:</div>
                            <div className="info-a">{user.phone}</div>
                        </div>
                        <div className="info-field">
                            <div className="info-q">age:</div>
                            <div className="info-a">{user.age}</div>
                        </div>
                        <div className="info-field">
                            <div className="info-q">Address:</div>
                            <div className="info-a" >
                                <Tooltip title={user.address}>
                                    <Typography width={'150px'} noWrap >
                                        {user.address}
                                    </Typography>
                                </Tooltip>
                            </div>
                        </div>
                        <div className="info-field">
                            <ButtonGroup variant="outlined" aria-label="Basic button group" sx={{ mt: 2, mx: 'auto' }}>
                                <Tooltip title="Edit">
                                    <Button onClick={handleEditDialogOpen} color='warning' >
                                        <Icon fontSize="small">edit</Icon>
                                    </Button>
                                </Tooltip>
                                {
                                    (props.hisKeys).includes((user.id).toString()) &&
                                    <Tooltip title="edit history">
                                        <Button onClick={() => { navigate(`history/${user.id}`) }}>
                                            <Icon>timeline</Icon>
                                        </Button>
                                    </Tooltip>
                                }
                                {delBtn}
                            </ButtonGroup>
                        </div>
                    </div>
                    <Dialog
                        open={openDeleteDialog}
                        fullWidth
                        keepMounted
                        onClose={handleDeleteDialogClose}
                        aria-describedby="alert-dialog-slide-description">

                        <DialogTitle>{"Are you Sure?"}</DialogTitle>
                        <DialogContent>
                            {user.isDeleted ? "Restoring the user make them reappear in the profile." : "Deleting the user you won't be able to see them in profile."}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDeleteDialogClose}>Disagree</Button>
                            <Button onClick={() => { props.delUser(user.id); handleDeleteDialogClose(); }}>Agree</Button>
                        </DialogActions>

                    </Dialog>
                    <EditDialog open={editDialog} handleClose={handleEditDialogClose} addHistory={props.addHistory} user={editingUser} />
                </div>
            )
        }
            , areEqaul

        )

export default UserCard;    