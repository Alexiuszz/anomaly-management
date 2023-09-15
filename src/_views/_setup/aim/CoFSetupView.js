import React, {useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { red } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import {connect} from 'react-redux';
import {createCoF, updateCoF, deleteCoF} from '../../../_actions/anomalyActions'
import axios from 'axios';
import isNullOrUndefined from 'util';
import {Link} from 'react-router-dom';
import { withSnackbar } from 'notistack';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import ManageIcon from '@material-ui/icons/SettingsOutlined';
import AddIcon from '@material-ui/icons/AddOutlined';
import { green, purple } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Moment from 'react-moment'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import AlertDialog from '../../../_components/AlertDialog'

import EmptyBox from '@/_images/icons/empty_box_icon.inline.svg';
import {useStyles} from '@/_utilities/CommonStyles'
import {PlainButton} from '@/_utilities/CustomButtons'

 

function CoFSetupView(props)
{
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [searchText, setSearchText] = React.useState(""); 

    const [openAlert, setOpenAlert] = React.useState(false); 
    const [dialogProps, setDialogProps] = React.useState({});   
        
    const [isEditing, setIsEditing] = React.useState(false);
    const coFs = props.coFs;
    const [newCoF, setNewCoF] = React.useState(
      {
      name:"",
      score:0
    });
        
    function handleClickOpen() {
      setIsEditing(false);
      setNewCoF({
        name:"",
        score:0
      });
      setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }
   

    const deleteCoF = coF => {  
        
      
      
      //let selectedAccountRole = coFs.find(role => {return role.id == id});
      //console.warn(selectedAccountRole)
      if(coF)
      {
        setOpenAlert(true); 

        setDialogProps({...dialogProps, dialogTitle: "Delete CoF", 
        dialogMessage: "Delete CoF: "+coF.name,
        okAction:()=>{props.deleteCoF(coF);setOpenAlert(false)}
        })
      }

      //props.deleteCoF(Id);
    }

    const editCoF = coF => {
      
      
      //let selectedAccountRole = coFs.find(role => {return role.id == roleId});
      
      if(coF){
        setIsEditing(true);
        setNewCoF(coF)
        setOpen(true);
      }
       
      
    }

    const handleSearchInputChange = event => {
      const { name, value } = event.target  ;
      //console.warn(value)
      //console.warn(coFs.filter( f=> searchText == ""? true:f.name.indexOf(searchText) > -1))
      setSearchText(value)  
    }
    const handleInputChange = event => {
      const { name, value } = event.target  
      setNewCoF({ ...newCoF, [name]: value })      
    }

    function addCoF() {     
        
        props.createCoF({...newCoF});
        setOpen(false);
    }

    function updateCoF() {      
      props.updateCoF(newCoF);
      setOpen(false);
    }

    useEffect(() => {
        /*const fetchData = async () => {
        
        //if(isNullOrUndefined(props.projects))
        //  return;

      axios.get(' /api/projects')
            .then((result) => {
              console.warn("result", result.data);
              props.fetchProjects(result.data);
               
            })
            .catch((ex) => {
                console.error(ex);
            });
  
        //setData(result.data);
      };
  
      fetchData();*/
    }, [props]);

    return(
        <main className={classes.content}>
        <div className={classes.toolbar}>
        <Typography variant="h6" gutterBottom>
        CoF (Consequence of Failure)
      </Typography>
            <PlainButton onClick={handleClickOpen}>
              <AddIcon className={classes.customButtonIcon}/>Create CoF
            </PlainButton>
            
            <AlertDialog open={openAlert} cancelAction={()=> setOpenAlert(false)} {...dialogProps}/>
            
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                <SearchIcon />
                </div>
                <InputBase
                name="searchText"                
                value={searchText}
                onChange={handleSearchInputChange}
                fullWidth
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'Search' }}
                />
            </div>
            <Dialog open={open} fullWidth  className={classes.modalDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                {isEditing ? (<span>Edit CoF</span>
                ): (<span>New CoF</span>)
                }   
            </DialogTitle>
                <DialogContent>                
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="CoF Name"
                    name="name"                
                    value={newCoF.name}
                    onChange={handleInputChange}
                    fullWidth
                /><TextField
                    autoFocus
                    margin="dense"
                    id="score"
                    label="CoF Score"
                    name="score"                
                    value={newCoF.score}
                    onChange={handleInputChange}
                    fullWidth
                />
                </DialogContent>
                
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                {isEditing ? (
                  <Button onClick={updateCoF} color="primary">
                    Update
                  </Button>
                ): (
                  <Button onClick={addCoF} color="primary">
                    Create
                  </Button>
                )}  
                
                </DialogActions>
            </Dialog>
        </div>
        
        <Grid container spacing={1} className={classes.listContainer}>
            {(coFs && coFs.length >0) ?                
              coFs.filter( f=> searchText == ""? true:f.name.indexOf(searchText) > -1).map(coF => 
                <Grid item key={coF.id} xs={12}>
                <Paper key={coF.id} className={classes.paper}>
                <Grid container  direction="row"
  justify="space-between" spacing={2}>
                
                <Grid item xs>
                    <Typography variant="h6" style={{fontSize:14,fontWeight:'bold'}} noWrap>{coF.name}</Typography> 
                    <Typography variant="h6" style={{fontSize:12,fontWeight:'normal'}} noWrap>{"Score: " + coF.score}</Typography>                 
                </Grid>
                <Grid item xs container justify="flex-end" alignItems="center">                  
                  <IconButton size="small" onClick={() => editCoF(coF)} color="primary">
                    <EditIcon  className={classes.iconButton2} />
                  </IconButton>
                  <IconButton size="small" onClick={() => deleteCoF(coF)} color="primary">
                    <DeleteIcon  className={classes.iconButton2} />
                  </IconButton>
                </Grid>
                </Grid>
            </Paper>
            </Grid>
              )
            : <Grid item xs={12} container  direction="column"
            justify="space-between" alignItems="center"><EmptyBox/><Typography  style={{margin:20,fontSize:20, color:'#777777'}}>Empty</Typography></Grid>}
          </Grid>
          </main>
    );
}

const mapStateToProps= (state) => {
  return {
    coFs: state.coFs,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCoF:(id) => {dispatch(deleteCoF(id))},
    createCoF:(c) => {dispatch(createCoF(c))},
    updateCoF:(c) => {dispatch(updateCoF(c))},
  }
}

export default withSnackbar(connect(mapStateToProps, mapDispatchToProps)(CoFSetupView));