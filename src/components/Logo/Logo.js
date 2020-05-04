import React from 'react';

import classes from './Logo.module.css';
import burgerLogo from '../../assets/images/logo.png';

const Logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt='logo-pic' />
    </div>
);

export default Logo;