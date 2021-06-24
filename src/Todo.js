import React, { useState } from 'react';
import "./Todo.css";
import db from './firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import { List, ListItem, ListItemText, ListItemAvatar, Button, Modal } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },

}));


function Todo(props) { 

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();

    const handleOpen = () => {
        setOpen(true);
    };
    const updateTodo = () => {
        //update the todo with the new input 
        db.collection('todos').doc(props.todo.id).set({
            todo: input

        }, { merge: true })
        setOpen(false);
    
    };
    return (
        <>
        <Modal open={open} onClose={e => setOpen(false)}>
            <div className={classes.paper}>
                <h1> I am a model </h1>
                <input placeholder={props.todo.todo} className={classes.margin} value={input} onChange={event => setInput(event.target.value) }/>
                <Button disabled={!input} onClick={updateTodo} size="small"  variant="contained" color="primary"> Update Todo</Button>
            </div>
        </Modal>

        <List> 
            <ListItem>
                <ListItemAvatar>
                </ListItemAvatar>
                <ListItemText primary={props.todo.todo} secondary="This is in the todo list"/>
            </ListItem>
            <EditIcon onClick={e => setOpen(true)} > </EditIcon>
            <DeleteForeverIcon onClick={event => db.collection('todos').doc(props.todo.id).delete()}> </DeleteForeverIcon>
            { /*<li>{props.text}</li>*/ }      
        </List>
        </>
    )
}

export default Todo
