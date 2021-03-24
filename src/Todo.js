import React,{ useState } from 'react'
import './Todo.css';
import { Button, List,ListItem, ListItemText,Modal } from '@material-ui/core';
import db from './firebase'
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import { makeStyles } from '@material-ui/core/styles' 
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    paper: {
      display:'block',
      margin:'auto',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Todo(props) {

    const classes = useStyles();
    const[open,setOpen] = useState(false)
    const[input,setInput]= useState(props.text.todo) 

    function updateTodo(){
        db.collection('todos').doc(props.text.id).set({
            todo:input
        },{merge:true})
        setOpen(false)
    }
    return (
        
        <div>
            <List >
                <ListItem>
                    <ListItemText className="todo_list" primary={props.text.todo} />
                </ListItem>
                <div>
                    <Button style={{border:'1px solid #3f51b5',marginRight:'1rem',marginBottom:'1.4rem'}}color="primary" type="button" onClick={e=>setOpen(true)}>
                        Edit the Todo
                    </Button>
                    <DeleteForeverSharpIcon style={{backgroundColor:'red',fontSize:'xx-large'}} onClick={event => db.collection('todos').doc(props.text.id).delete() }/>
                </div>
             </List>
            <Modal
                open={open}
                onClose={e => setOpen(false)}
            >
                <div className={classes.paper}>
                     <h2>Edit Todo</h2>
                     <input placeholder={props.text.todo} value={input} onChange={event => setInput(event.target.value)}></input>
                     <Button color="primary" onClick={updateTodo}>Update Todo</Button>
                </div>
                </Modal>
         </div>
    )
}

export default Todo
