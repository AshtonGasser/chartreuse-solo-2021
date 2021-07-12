import React from 'react';
import ParticleBackground from '../ParticleBackground/ParticleBackground';
import AboutFlipCard from "../AboutFlipCard/AboutFlipCard"
import './About.css'
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
  Toolbar,
} from "@material-ui/core";
import { node } from 'prop-types';
// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div>
      <ParticleBackground/>
    <div className="container">
      <div className ="text">
      {/* <Grid
                  style={{ paddingBottom: 0 }} 
                  xs={12} sm={6} md={4}>
                  <AboutFlipCard />
                </Grid> */}
        <h3 >Technologies Used:</h3>
        <p>React.js</p>
        <p>javaScrip</p>
        <p>node.js</p>
        <p>PostgresSQL</p>
        <p>Material-Ui</p>
        <p>Chart.js</p>
        <p>html</p>
        <p>express</p>
        <p>css</p>
      </div>
    </div>
    </div>
  );
}
 export default AboutPage;
