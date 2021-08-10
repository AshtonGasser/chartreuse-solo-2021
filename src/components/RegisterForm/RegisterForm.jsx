import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ParticleBackground from '../ParticleBackground/ParticleBackground';
import './register.css'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
      },
    });
  }; // end registerUser
  const classes = useStyles();
  return (
    <div>
      <ParticleBackground/>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{color:"white"}}>
          Sign up
        </Typography>
    <form className={classes.form} onSubmit={registerUser} noValidate>
      <h2 style = {{color: 'white', textAlign: "center"}}></h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <CssTextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CssTextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>
            </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            name="submit"
            value="Register"
          >
            Sign Up
          </Button>
          <Grid container justify-content="flex-end">
            <Grid item>
              <Link href="#" variant="body2" style ={{color: "white"}}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
    </form>
    </div>
    </Container>
    </div>
  );
}
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
      '-webkit-text-fill-color': 'white',
      '-webkit-box-shadow': '0 0 0 50px #333333 inset'
    },
    '& .MuiFormLabel-root': {
      color: 'white',
    }
  }
})(TextField);
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#666666",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default RegisterForm;
