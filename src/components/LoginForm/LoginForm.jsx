import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { MuiThemeProvider, createMuiTheme, withStyles, } from "@material-ui/core/styles";
import ParticleBackground from '../ParticleBackground/ParticleBackground';
import'./LoginForm.css'
function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const classes = useStyles();
  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <div>
    <ParticleBackground/>
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
    <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography  component="h1" variant="h5">
          Sign in
        </Typography>
    <form className={classes.form} onSubmit={login}>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
      <CssTextField
          htmlFor="username"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username:"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
      </div>
      <div>
        <CssTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            color="secondary"
            name="password"
            label="Password:"
            htmlFor = "Password"
            type="password"
            id="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
           
      </div>
     
      <FormControlLabel
            control={<Checkbox value="remember" className ="formcss"  />}
            label="Remember me"
            className ="formcss"
          />
      <div>
      <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            name="submit"
            value="Log In"
            className={classes.submit}
          >
            Sign In
          </Button>
      </div>
    </form>
    </div>
    </Container>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  palette: {
    background: {
      default: "#333333"
    },
    text: {
      primary: "white"
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#666666",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#666666'
  },

}));
const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#DFFF00',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#DFFF00',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#DFFF00',
      },
    },
    '& .MuiInputBase-input': {
      color: 'white',
    },
  },
})(TextField);
export default LoginForm;
