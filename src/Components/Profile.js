import React, { useEffect, useState } from 'react'
import clsx from 'clsx';
import moment from 'moment';
import {FormControl, FormControlLabel, FormLabel, IconButton, Input, InputAdornment, InputLabel, Radio, RadioGroup, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Visibility} from '@material-ui/icons';
import {VisibilityOff} from '@material-ui/icons';

import "./css/Settings.css"

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        //width: '25ch',
      },
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    icon: {
      borderRadius: '50%',
      width: 16,
      height: 16,
      boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
      backgroundColor: '#f5f8fa',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
      '$root.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
      },
      'input:hover ~ &': {
        backgroundColor: '#ebf1f5',
      },
      'input:disabled ~ &': {
        boxShadow: 'none',
        background: 'rgba(206,217,224,.5)',
      },
    },
    checkedIcon: {
      backgroundColor: '#137cbd',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
      '&:before': {
        display: 'block',
        width: 16,
        height: 16,
        backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
        content: '""',
      },
      'input:hover ~ &': {
        backgroundColor: '#106ba3',
      },
    },
}));

function StyledRadio (props) {
    const classes = useStyles();
  
    return (
      <Radio
        className={classes.root}
        disableRipple
        color="default"
        checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
        icon={<span className={classes.icon} />}
        {...props}
      />
    );
}

const Profile = ({editing, editionMode, handleChange, handleSubmit, information, mouseEnter, mouseLeave, user, visibilityPassword, visiblePassword}) => {

    const classes = useStyles();

    return (
        <div className= "user-profile m-5 row">
            <h1 className="display-1 settings-title">Editar perfil</h1>
                <div className="pt-5 h-100">
                    <div>
                        <h1 
                            className="display-6 profile-section" 
                            onMouseEnter={(e) => mouseEnter(e)}
                            onMouseLeave={(e) => mouseLeave(e)}
                        >
                            Información personal
                            {
                                !(editing === "PersonalInformation") && 
                                <button 
                                    className="btn btn-round mx-3 btn-sm btn-outline-primary profile-edit"
                                    onClick={() => editionMode("PersonalInformation")}
                                >
                                    Editar
                                </button>
                            }
                        </h1>
                        <hr/>
                        {
                            editing === "PersonalInformation"
                            ? <form 
                                className={classes.root} 
                                noValidate 
                                autoComplete="off"
                            >
                                <TextField 
                                    className="w-75" 
                                    id="outlined-basic" 
                                    label="Nombre"
                                    value={information.name}
                                    name="name"
                                    onChange={handleChange}
                                />
                                <TextField 
                                    className="w-75" 
                                    id="outlined-basic" 
                                    label="Apellido"
                                    value={information.lastname}
                                    name="lastname"
                                    onChange={handleChange}
                                />
                                <TextField 
                                    className="w-75" 
                                    id="outlined-basic" 
                                    label="Ocupación"
                                    value={information.ocupation}
                                    name="ocupation"
                                    onChange={handleChange}
                                />
                                <br/>
                                <FormControl
                                    component="fieldset" 
                                    className="my-3"
                                >
                                    <FormLabel component="legend">
                                        Género
                                    </FormLabel>
                                    <RadioGroup 
                                        defaultValue={user.gender} 
                                        aria-label="gender" 
                                        name="gender"
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel 
                                            value="female" 
                                            control={<StyledRadio />} 
                                            label="Femenino" 
                                        />
                                        <FormControlLabel 
                                            value="male" 
                                            control={<StyledRadio />} 
                                            label="Masculino" 
                                        />
                                        <FormControlLabel 
                                            value="other" 
                                            control={<StyledRadio />} 
                                            label="Otro" 
                                        />
                                    </RadioGroup>
                                </FormControl>
                                <br/>
                                <button 
                                    className="btn w-25 btn-outline-success"
                                    onClick={handleSubmit}
                                >
                                    Actualizar datos
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn w-25 btn-outline-danger"
                                    onClick={() => editionMode("")}
                                >
                                    Cancelar
                                </button>
                            </form>
                            : <>
                                <div className="d-flex flex-row">
                                    <h4 className="d-inline mr-3">
                                        Nombre y apellido:&nbsp;&nbsp;&nbsp;
                                    </h4>
                                    <p>
                                        {`${user.name} ${user.lastname}`}
                                    </p>
                                </div>
                                <div className="d-flex flex-row">
                                    <h4 className="d-inline mr-3">
                                        Ocupación:&nbsp;&nbsp;&nbsp;
                                    </h4>
                                    <p>
                                        {user.ocupation}
                                    </p>
                                </div>
                                <div className="d-flex flex-row">
                                    <h4 className="d-inline mr-3">
                                        Género:&nbsp;&nbsp;&nbsp;
                                    </h4>
                                    <p>
                                        {user.gender === "male" ? "Masculino" : user.gender === "female" ? "Femenino" : "Otro"}
                                    </p>
                                </div>
                            </>
                                            
                        }
                    </div>
                    <div className="mt-3">
                        <h1
                            className="display-6 profile-section" 
                            onMouseEnter={(e) => mouseEnter(e)}
                            onMouseLeave={(e) => mouseLeave(e)}
                        >
                            Información de contacto
                            {
                                !(editing === "ContactInformation") && 
                                <button 
                                    className="btn btn-round mx-3 btn-sm btn-outline-primary profile-edit"
                                    onClick={() => editionMode("ContactInformation")}
                                >
                                    Editar
                                </button>
                            }
                        </h1>
                        <hr/>
                        {
                            editing === "ContactInformation"
                            ? <form 
                                className={classes.root} 
                                noValidate 
                                autoComplete="off"
                            >
                                <TextField 
                                    className="w-75" 
                                    id="outlined-basic" 
                                    label="Correo electrónico"
                                    value={information.email}
                                    name="email"
                                    onChange={handleChange}
                                />
                                <TextField 
                                    className="w-75 mb-4" 
                                    id="outlined-basic" 
                                    label="Número de teléfono"
                                    value={information.phone}
                                    name="phone"
                                    onChange={handleChange}
                                />
                                <br/>
                                <button 
                                    type="submit" 
                                    className="btn w-25 btn-outline-success"
                                    onClick={handleSubmit}
                                >
                                    Actualizar datos
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn w-25 btn-outline-danger"
                                    onClick={() => editionMode("")}
                                >
                                    Cancelar
                                </button>
                            </form>
                            : <div>
                                <div className="d-flex flex-row">
                                    <h4 className="d-inline mr-3">
                                        Correo electrónico:&nbsp;&nbsp;&nbsp;
                                    </h4>
                                    <p>{user.email}</p>
                                </div>
                                <div className="d-flex flex-row align-items-center">
                                    <h4 className="d-inline mr-3 mb-0">
                                        Celular:&nbsp;&nbsp;&nbsp;
                                    </h4>
                                    <p>
                                        {
                                            !user.phone 
                                            ? <button className="btn btn-round my-1 btn-sm btn-outline-primary">Agrega un celular</button> 
                                            : user.phone
                                        }
                                    </p>
                                </div>          
                            </div>
                        }
                    </div>
                    <div className="mt-3">
                    <h1 
                        className="display-6 profile-section"
                        onMouseEnter={(e) => mouseEnter(e)}
                        onMouseLeave={(e) => mouseLeave(e)}
                    >
                        Contraseña
                        {
                            !(editing === "password") && 
                            <button 
                                className="btn btn-round mx-3 btn-sm btn-outline-primary profile-edit"
                                onClick={() => editionMode("password")}
                            >
                                Editar
                            </button>
                        }
                    </h1>
                    <hr/>
                    {
                        editing === "password"
                            ? <form 
                                className={classes.root} 
                                noValidate 
                                autoComplete="off"
                            >
                                <FormControl className="w-75">
                                    <InputLabel htmlFor="actual-password">Contraseña actual</InputLabel>
                                    <Input 
                                        id="actual-password"
                                        type={visiblePassword.password ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => visibilityPassword('password')}
                                                onMouseDown={(e) => e.preventDefault()}
                                            >
                                                {visiblePassword.password ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <FormControl className="w-75">
                                    <InputLabel htmlFor="actual-password">Contraseña nueva</InputLabel>
                                    <Input 
                                        id="new-password"
                                        type={visiblePassword.newPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => visibilityPassword('newPassword')}
                                                onMouseDown={(e) => e.preventDefault()}
                                            >
                                                {visiblePassword.newPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <FormControl className="w-75">
                                    <InputLabel htmlFor="actual-password">Repite la nueva contraseña</InputLabel>
                                    <Input 
                                        id="new-password"
                                        type={visiblePassword.newPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => visibilityPassword('newPassword')}
                                                onMouseDown={(e) => e.preventDefault()}
                                            >
                                                {visiblePassword.newPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <br/>
                                <button className="btn w-25 btn-success">
                                    Modificar contraseña
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn w-25 btn-outline-danger"
                                    onClick={() => editionMode("")}
                                >
                                    Cancelar
                                </button>
                            </form>
                            : null
                    }   
                </div>
            </div>
        </div>
    )
}

export default Profile
