
import React from 'react';
import Particles from 'react-particles-js';
import './AddParticles.css'
function ParticleBackground () {

return(
    <div id="particles">
      <Particles
    params={{
	    "particles": {
	        "number": {
	            "value": 160,
	            "density": {
	                "enable": true,
	                "value_area": 1500
	            }
	        },
          
          "polygon": {
            "enable": true,
            "nb_sides": 6
          },
	        "line_linked": {
	            "enable": true,
	            "opacity": 0.02
	        },
	        "move": {
	            "direction": "none",
	            "speed": 0.40,
              "random": true,
	        },
	        "size": {
	            "value": 1
	        },
	        "opacity": {
	            "anim": {
	                "enable": true,
	                "speed": 2,
	                "opacity_min": 0.10
	            }
	        }
	    },
	    "interactivity": {
        "detect_on": "canvas",
	        "events": {
            "onHover": {
              "enable": true,
              "mode": "bubble"
            },
	            "onclick": {
	                "enable": true,
	                "mode": "push"
	            }
	        },
	        "modes": {
	            "push": {
	                "particles_nb": 1
	            },
              "repulse": {
                "distance": 40,
                "duration": 1
              },
	        }
	    },
	    "retina_detect": true
	}} />
  
  </div>
  )
}
    {/* <ParticleBackground/> */}
    

export default ParticleBackground