import React, { useState } from 'react';
import { useEffect } from 'react';
import "./test.css";

const Tests = () => {
    const [ZombieShirt, setZombieShirt] = useState(0);
    const [ZombieHead, setZombieHead] = useState(0);
    const [ZombieEye, setZombieEye] = useState(0);

    const TT = () => {
        setZombieShirt(4)
        setZombieHead(5)
        setZombieEye(2)
    }

    useEffect(() => {
      TT();
    }, [])
    
    return (
        <div class="zombie-char">
        <div class="zombie-loading zombieParts" ></div>
        <div class="zombieParts" class="partsVisible">
          <img class="left-feet" src="zombieparts/right-feet-1@2x.png" alt="zombie" />  
          <img class="right-feet" src="zombieparts/right-feet-1@2x.png" alt="zombie" />  
    
          <img class="left-leg" src="zombieparts/left-leg-1@2x.png" alt="zombie" />  
          <img class="right-leg" src="zombieparts/right-leg-1@2x.png" alt="zombie" />  
    
          <img class="left-thigh" src="zombieparts/left-thigh-1@2x.png" alt="zombie" />  
          <img class="right-thigh" src="zombieparts/right-thigh-1@2x.png" alt="zombie" />
    
          <img class="left-forearm" src="zombieparts/left-forearm-1@2x.png" alt="zombie" />  
          <img class="right-forearm" src="zombieparts/right-forearm-1@2x.png" alt="zombie" />
    
          <img class="right-upper-arm" src="zombieparts/right-upper-arm-1@2x.png" alt="zombie" />  
    
          <img class="torso" src="zombieparts/torso-1@2x.png" alt="zombie" />
    
          <img class="cat-legs" src="zombieparts/catlegs.png" alt="zombie" />            
          
          <img class="shirt" src={`zombieparts/shirt-${ZombieShirt}@2x.png`} alt="zombie" />  
    
          <img class="left-upper-arm" src="zombieparts/left-upper-arm-1@2x.png" alt="zombie" />  
    
          <img class="left-forearm" src="zombieparts/left-forearm-1@2x.png" alt="zombie" />  
          <img class="right-forearm" src="zombieparts/right-forearm-1@2x.png" alt="zombie" />
    
          <img class="left-hand" src="zombieparts/hand1-1@2x.png" alt="zombie" />  
          <img class="right-hand" src="zombieparts/hand-2-1@2x.png" alt="zombie" />
              
          <img class="head" src={`zombieparts/head-${ZombieHead}@2x.png`} alt="zombie" />
          <img class="eye" src={`zombieparts/eyes-${ZombieEye}@2x.png`} alt="zombie" />
          <img class="mouth" src="zombieparts/mouth-1@2x.png" alt="zombie" />
        </div>
    
        <div class="hideNameFieldClass">
          <div class="card-header bg-dark">
            {/* <strong>{{zombieName}}</strong> */}
          </div>
          {/* <small>{{currentZombieDescription}}</small> */}
        </div>
      </div>
    )
};

export default Tests;