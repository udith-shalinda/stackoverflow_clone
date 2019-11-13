import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import SearchIcon from '@material-ui/icons/Search';
import { Avatar, Button, Grid } from '@material-ui/core';
import {Link} from 'react-router-dom';
import AddBoxIcon from '@material-ui/icons/AddBox';
import {Redirect} from 'react-router'

//redux
import { connect } from 'react-redux'
import { setUserId,setUserToken } from '../../redux/actions/UserLogin';
import {changeTheamColor} from '../../redux/actions/color';




const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor:"grey"
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    color:'white'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  link:{
    textDecoration:'none',
    color:'white'
  }
}));






export function Header(props) {


  const classes = useStyles();
  const [isSearching,setIsSearch] = useState(false);
  const [searchInput,setSearchInput] = useState('');
  let colors = props.colorState.colors[props.colorState.colorCount];





  const search=prop =>  event =>{
    setIsSearch(true);
    setSearchInput(event.target.value);
  }
  const searchHandler = ()=>{
    if(isSearching){
      return(
        <Redirect to={'/search/'+searchInput} /> 
      );
    }else{
      return null;
    }
  }
  const handleTheame = ()=>{
    props.changeTheamColor((props.colorState.colorCount+1)%2);
  }

  const logginButtonHandler=()=>{ 
    if(props.userState.userId != null){
      return (
        <div>
          <Grid container>
            <Grid item>
              <IconButton>
                <Link to="/addQuestion" className={classes.link}>
                  <AddBoxIcon />
                </Link>
              </IconButton>
            </Grid>
            <Grid item>
              <Link to="/profile" className={classes.link}>
                <Avatar aria-label="recipe" className={classes.avatar}>
                  R
                </Avatar>
              </Link>
            </Grid>
          </Grid>
        </div>
      )
    }else{
      return(<div>
        <Link to="/login" className={classes.link}>
          <Button variant="contained"  
                        style={{color:'white', backgroundColor:colors.theamColor}} color="primary">Login</Button>
          </Link>
          <Link to="/signUp" className={classes.link}>
            <Button  variant="contained"
                         style={{color:'white', backgroundColor:colors.theamColor}}  color="primary">Sign up</Button>
          </Link>
      </div>)
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static"  style={{ backgroundColor:colors.theamColor}} color="primary">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link to="/home" className={classes.link}>
              Stackoverflow
            </Link>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={ search('sfs')}
            />
          </div>
          <IconButton>
            <InvertColorsIcon style={{ color:"white" }} onClick={handleTheame}/>
          </IconButton>
          {logginButtonHandler()}
          {searchHandler()}
        </Toolbar>
      </AppBar>
    </div>
  );
}


const mapStateToProps = state => {
  return { 
    userState: state.userId,
    colorState:state.colorState,
  };
};

export default connect(
  mapStateToProps,
  { setUserId,setUserToken,changeTheamColor}
)(Header)

// export default Header;