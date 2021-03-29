import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './css/Inicio.css';
import LoopOutlinedIcon from '@material-ui/icons/LoopOutlined';
import { IconButton, Snackbar } from '@material-ui/core';
import { chargeGuestUser, login } from '../Redux/Actions/Users';

import CardInfo from './CardInfo';
import Logo from './Logo';

const cards = [
  {
    title: 'Lo importante en un solo lugar',
    description:
      'Sabemos que puedes necesitar tus notas o tareas en cualquier momento o lugar, con NotatKy tendrás acceso a ellas desde donde quieras.',
    color: '#e76f51',
    img: 1,
  },
  {
    title: 'Aumenta tu productividad',
    description:
      'NotatKy te permite tomar notas de una forma muy sencilla, por lo tanto, confiamos en que tu productividad en el día a día aumentará.',
    color: '#e9c46a',
    img: 2,
  },
  {
    title: 'Sincroniza todos tus dispositivos',
    description:
      'Ya sea que estes en la sala de tu casa o en la computadora de tu oficina, tus notas se sincronizarán en todos tus dispositivos.',
    color: '#2a9d8f',
    img: 3,
  },
];

const Inicio = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token') || localStorage.getItem('token');

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (token) {
      history.push('/home');
    }
  });

  useEffect(() => {
    return () => {
      setOpenSnackbar(false);
    };
  }, []);

  const largeWidth = window.screen.width > 600;

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenSnackbar(true);
    dispatch(chargeGuestUser());
    setTimeout(() => {
      dispatch(login({
        email: 'admin@admin.com',
        password: 'aDmIn123'
      }, false));
    }, 2000);
  };

  return (
    <div className={largeWidth ? 'login-bg full-height row' : 'login-bg row'}>
      {largeWidth ? (
        <div className="inicio-nav row d-flex align-items-center">
          <div className="col-md-4 inicio-logo">
            <Logo />
          </div>
          <div className="col-md-3" />
          <div className="col-md-5 inicio-options">
            <div className="d-inline">
              <Link to="/login" className="inicio-link">
                INICIAR SESIÓN
              </Link>
              <p className="inicio-link2">|</p>
              <Link to="/sign-up" className="inicio-link">
                REGISTRARSE
              </Link>
            </div>
            <div className="d-inline">
              <button
                className="btn btn-outline-warning btn-round inicio-app px-4"
                onClick={handleSubmit}
                type="submit"
              >
                INGRESAR COMO INVITADO
              </button>
            </div>
            {/* <div className ="d-inline">
              <Icon name="world"/>
              <b className= "inicio-link">
                  ES | EN
              </b>
          </div> */}
          </div>
        </div>
      ) : (
        <div className="px-4 my-3 d-flex justify-content-between align-items-center">
          <img
            src="logo-wo-bg.png"
            alt="logo"
            width="60"
            height="60"
            className="logo-nav"
          />
          <div className="d-inline">
            <Link to="/login" className="inicio-link">
              INICIAR SESIÓN
            </Link>
            <p className="inicio-link2">|</p>
            <Link to="/sign-up" className="inicio-link">
              REGISTRARSE
            </Link>
          </div>
        </div>
      )}
      <div
        className={
          largeWidth
            ? 'd-flex row d-flex align-items-start'
            : 'd-flex row d-flex justify-content-center w-100 m-0'
        }
      >
        {cards.map((card) => (
          <div
            className={
              largeWidth
                ? 'col-md-4 d-flex justify-content-center align-items-center'
                : 'w-100 my-2 d-flex justify-content-center'
            }
          >
            <CardInfo
              image={`svg/card-img-${card.img}.svg`}
              title={card.title}
              description={card.description}
              color={card.color}
              largeWidth={largeWidth}
            />
          </div>
        ))}
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        message="Cargando..."
        action={(
          <IconButton
            className="btn"
            size="small"
            color="inherit"
          >
            <LoopOutlinedIcon className="loop-out" />
          </IconButton>
            )}
      />
    </div>
  );
};

export default Inicio;
