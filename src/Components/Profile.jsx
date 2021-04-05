import React from 'react';
import clsx from 'clsx';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Visibility,
  HighlightOffOutlined,
  VisibilityOff,
  Menu,
} from '@material-ui/icons';

import './css/Settings.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow:
      'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
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
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
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

function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}

const Profile = ({
  closeSnackbar,
  darkMode,
  editing,
  editionMode,
  error,
  handleChange,
  handleErrors,
  handlePasswordChange,
  handlePasswordSubmit,
  handleSubmit,
  information,
  largeWidth,
  mouseEnter,
  mouseLeave,
  password,
  setDrawerOpen,
  snackbar,
  user,
  visibilityPassword,
  visiblePassword,
}) => {
  const classes = useStyles();
  const superSmallWidth = window.screen.width < 350;

  return (
    <div className="user-profile pro m-4 row">
      <h1
        className="display-1 settings-title"
        style={darkMode ? { height: '20%' } : null}
      >
        {!largeWidth && (
          <IconButton
            onClick={() => setDrawerOpen(true)}
            style={{ color: 'inherit' }}
            className="btn mb-1 p-0"
            iconStyle={{ width: '35px', height: '40px', marginRight: '5px' }}
          >
            <Menu style={{ color: 'inherit' }} />
          </IconButton>
        )}
        &nbsp;Editar perfil
      </h1>
      <div
        className="pt-4 info-cont-settings"
        style={
          darkMode && largeWidth ? { overflowY: 'auto', height: 550 } : null
        }
      >
        <div>
          <h1
            className="display-6 profile-section"
            onMouseEnter={(e) => mouseEnter(e)}
            onMouseLeave={(e) => mouseLeave(e)}
          >
            {superSmallWidth ? 'Datos personales' : 'Información personal'}
            {largeWidth ? (
              !(editing === 'PersonalInformation') && (
                <button
                  className="btn btn-round mx-3 btn-sm btn-outline-primary profile-edit"
                  onClick={() => editionMode('PersonalInformation')}
                  type="button"
                >
                  Editar
                </button>
              )
            ) : !(editing === 'PersonalInformation') ? (
              <button
                className="btn btn-round mx-3 btn-sm btn-primary"
                onClick={() => editionMode('PersonalInformation')}
                type="button"
              >
                Editar
              </button>
            ) : (
              <button
                className="btn btn-round mx-3 btn-sm btn-danger"
                onClick={() => editionMode('')}
                type="button"
              >
                Cancelar
              </button>
            )}
          </h1>
          <hr />
          {editing === 'PersonalInformation' ? (
            <form className={classes.root} noValidate autoComplete="off">
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
                id="ocupation-textfield"
                label="Ocupación"
                value={information.ocupation}
                name="ocupation"
                onChange={handleChange}
              />
              <br />
              <FormControl component="fieldset" className="my-3">
                <FormLabel component="legend">Género</FormLabel>
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
              <br />
              <button
                className="btn w-25 btn-success btn-update"
                onClick={handleSubmit}
                type="submit"
              >
                Actualizar datos
              </button>
              {largeWidth && (
                <button
                  className="btn w-25 btn-outline-danger"
                  onClick={() => editionMode('')}
                  type="button"
                >
                  Cancelar
                </button>
              )}
            </form>
          ) : (
            <>
              <div className="d-flex flex-row">
                <h4 className="d-inline mr-3">
                  Nombre y apellido:&nbsp;&nbsp;&nbsp;
                </h4>
                <p>{`${user.name} ${user.lastname}`}</p>
              </div>
              <div className="d-flex flex-row align-items-center mb-3">
                <h4 className="d-inline mr-3 mb-0">
                  Ocupación:&nbsp;&nbsp;&nbsp;
                </h4>
                <p>
                  {!user.ocupation ? (
                    <button
                      className="btn btn-round my-1 btn-sm btn-outline-primary"
                      onClick={() => {
                        editionMode('PersonalInformation');
                        setTimeout(() => {
                          document
                            .getElementById('ocupation-textfield')
                            .focus();
                        }, 1000);
                      }}
                      type="button"
                    >
                      Agrega una ocupación
                    </button>
                  ) : (
                    user.ocupation
                  )}
                </p>
              </div>
              {user.gender && (
                <div className="d-flex flex-row">
                  <h4 className="d-inline mr-3">Género:&nbsp;&nbsp;&nbsp;</h4>
                  <p>
                    {user.gender === 'male'
                      ? 'Masculino'
                      : user.gender === 'female'
                        ? 'Femenino'
                        : 'Otro'}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        <div className="mt-3">
          <h1
            className="display-6 profile-section"
            onMouseEnter={(e) => mouseEnter(e)}
            onMouseLeave={(e) => mouseLeave(e)}
          >
            {largeWidth ? 'Información de contacto' : 'Contacto'}
            {largeWidth ? (
              !(editing === 'ContactInformation') && (
                <button
                  className="btn btn-round mx-3 btn-sm btn-outline-primary profile-edit"
                  onClick={() => editionMode('ContactInformation')}
                  type="button"
                >
                  Editar
                </button>
              )
            ) : !(editing === 'ContactInformation') ? (
              <button
                className="btn btn-round mx-3 btn-sm btn-primary"
                onClick={() => editionMode('ContactInformation')}
                type="button"
              >
                Editar
              </button>
            ) : (
              <button
                className="btn btn-round mx-3 btn-sm btn-danger"
                onClick={() => editionMode('')}
                type="button"
              >
                Cancelar
              </button>
            )}
          </h1>
          <hr />
          {editing === 'ContactInformation' ? (
            <form className={classes.root} noValidate autoComplete="off">
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
                id="phone-textfield"
                label="Número de teléfono"
                value={information.phone}
                name="phone"
                onChange={handleChange}
                type="number"
              />
              <br />
              <button
                type="submit"
                className="btn w-25 btn-success btn-update"
                onClick={handleSubmit}
              >
                Actualizar datos
              </button>
              {largeWidth && (
                <button
                  type="button"
                  className="btn w-25 btn-outline-danger"
                  onClick={() => editionMode('')}
                >
                  Cancelar
                </button>
              )}
            </form>
          ) : (
            <div>
              <div className="d-flex flex-row">
                <h4 className="d-inline mr-3">
                  Correo electrónico:&nbsp;&nbsp;&nbsp;
                </h4>
                <p>{user.email}</p>
              </div>
              <div className="d-flex flex-row align-items-center mb-3">
                <h4 className="d-inline mr-3 mb-0">
                  Celular:&nbsp;&nbsp;&nbsp;
                </h4>
                <p>
                  {!user.phone ? (
                    <button
                      className="btn btn-round my-1 btn-sm btn-outline-primary"
                      onClick={() => {
                        editionMode('ContactInformation');
                        setTimeout(() => {
                          document.getElementById('phone-textfield').focus();
                          document.getElementById('phone-textfield').click();
                        }, 1000);
                      }}
                      type="button"
                    >
                      Agrega un celular
                    </button>
                  ) : (
                    user.phone
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="mt-3">
          <h1
            className="display-6 profile-section"
            onMouseEnter={(e) => mouseEnter(e)}
            onMouseLeave={(e) => mouseLeave(e)}
          >
            Contraseña
            {largeWidth ? (
              !(editing === 'password') && (
                <button
                  className="btn btn-round mx-3 btn-sm btn-outline-primary profile-edit"
                  onClick={() => editionMode('password')}
                  type="button"
                >
                  Editar
                </button>
              )
            ) : !(editing === 'password') ? (
              <button
                className="btn btn-round mx-3 btn-sm btn-primary"
                onClick={() => editionMode('password')}
                type="button"
              >
                Editar
              </button>
            ) : (
              <button
                className="btn btn-round mx-3 btn-sm btn-danger"
                onClick={() => editionMode('')}
                type="button"
              >
                Cancelar
              </button>
            )}
          </h1>
          <hr />
          {editing === 'password' ? (
            <form className={classes.root} noValidate autoComplete="off">
              <FormControl className="w-75">
                <InputLabel htmlFor="actual-password">
                  Contraseña actual
                </InputLabel>
                <Input
                  id="actual-password"
                  type={visiblePassword.password ? 'text' : 'password'}
                  endAdornment={(
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => visibilityPassword('password')}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {visiblePassword.password ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )}
                  value={password.current}
                  name="current"
                  onChange={handlePasswordChange}
                />
              </FormControl>
              <FormControl className="w-75" error={error.password}>
                <InputLabel htmlFor="actual-password">
                  Contraseña nueva
                </InputLabel>
                <Input
                  id="new-password"
                  type={visiblePassword.newPassword ? 'text' : 'password'}
                  endAdornment={(
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => visibilityPassword('newPassword')}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {visiblePassword.newPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )}
                  value={password.new1}
                  name="new1"
                  inputProps={{
                    onBlur: handleErrors
                  }}
                  onChange={handlePasswordChange}
                />
                <FormHelperText>
                  {error.password && 'La contraseña debe tener al menos seis caracteres'}
                </FormHelperText>
              </FormControl>
              <FormControl className="w-75">
                <InputLabel htmlFor="actual-password">
                  Repite la nueva contraseña
                </InputLabel>
                <Input
                  id="new-password"
                  type={visiblePassword.newPassword ? 'text' : 'password'}
                  endAdornment={(
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => visibilityPassword('newPassword')}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {visiblePassword.newPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )}
                  value={password.new2}
                  name="new2"
                  onChange={handlePasswordChange}
                />
              </FormControl>
              <br />
              <button
                className="btn w-25 btn-success btn-update"
                disabled={error.password}
                onClick={handlePasswordSubmit}
                type="submit"
              >
                Modificar contraseña
              </button>
              {largeWidth && (
                <button
                  type="submit"
                  className="btn w-25 btn-outline-danger"
                  onClick={() => editionMode('')}
                >
                  Cancelar
                </button>
              )}
            </form>
          ) : null}
        </div>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        message={snackbar.message}
        action={(
          <>
            <IconButton className="btn" size="small" color="inherit" onClick={closeSnackbar}>
              <HighlightOffOutlined fontSize="small" />
            </IconButton>
          </>
        )}
      />
    </div>
  );
};

export default Profile;
