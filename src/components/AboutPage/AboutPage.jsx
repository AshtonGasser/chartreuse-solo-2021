import React from "react";
import ParticleBackground from "../ParticleBackground/ParticleBackground";
import AboutFlipCard from "../AboutFlipCard/AboutFlipCard";
import "./About.css";
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
import { node } from "prop-types";
// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div>
      <ParticleBackground />
      <div className="container">
        <div className="aboutText">
          {/* <Grid
                  style={{ paddingBottom: 0 }} 
                  xs={12} sm={6} md={4}>
                  <AboutFlipCard />
                </Grid> */}
          <h3>Technologies Used:</h3>
          <p>React.js</p>
          <p>Redux</p>
          <p>javaScrip</p>
          <p>node.js</p>
          <p>PostgresSQL</p>
          <p>Material-Ui</p>
          <p>moment-js</p>
          <p>particle-react</p>
          <p>Chart.js</p>
          <p>html</p>
          <p>express</p>
          <p>css</p>
        </div>
        <div className="aboutText">
          <h3>whats next?</h3>
          <p>
            I want to make this app totally interactive for the user, giving
            them the ability to mass upload ingredients, and share and rate
            their drinks.
          </p>
              <h3>special thanks</h3>
          <p>
            I want to thank my entire cohort and my instructor Dane for all of their support
            throughout our solo projects. Id also like to thank my family for
            helping make this journey through prime possible
          </p>
        </div>
      </div>
    </div>
  );
}
export default AboutPage;
