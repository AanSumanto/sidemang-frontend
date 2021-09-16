import React, { useState, useRef } from 'react';
import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
} from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import useAuth from 'app/hooks/useAuth';
import history from 'history.js';
import ReCAPTCHA from 'react-google-recaptcha';

const useStyles = makeStyles(({ palette, ...theme }) => ({
  cardHolder: {
    background: '#1A2038',
  },
  card: {
    maxWidth: 800,
    borderRadius: 12,
    margin: '1rem',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const JwtRegisterEmployee = () => {
  const [state, setState] = useState({});
  const classes = useStyles();
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const reCaptcha = useRef();
  const [successful, setSuccessful] = useState(false);
  const { register } = useAuth();
  const [values, setValues] = useState({
    showPassword: false,
  });

  const handleChange = ({ target: { name, value, values } }) => {
    const temp = { ...values };
    temp[name] = value;
    setValues(temp);
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = async (e) => {
    if (!token) {
      setMessage('Verifikasi Captcha Terlebih Dahulu!');
      return;
    }
    e.preventDefault();
    setMessage('');
    setSuccessful(false);
    try {
      await register(
        state.name,
        state.nip,
        state.nik,
        state.username,
        state.email,
        state.password,
      ).then(() => {
        const message = 'User Berhasil Di Buat! Silahkan cek folder inbox atau spam Email anda';
        setMessage(message);
        setSuccessful(true);
      });
    } catch (e) {
      setMessage(e.message);
      setSuccessful(false);
    }
  };

  const {
 name, nip, nik, username, email, agreement,
} = state;

  return (
    <div
      className={clsx(
        'flex justify-center items-center  min-h-full-screen',
        classes.cardHolder,
      )}
    >
      <Card className={classes.card}>
        <Grid container>
          <Grid item lg={5} md={5} sm={5} xs={12}>
            <div className="p-8 flex justify-center bg-light-gray items-center h-full">
              <img
                className="w-full"
                src="/assets/images/illustrations/Logo-sidemang.svg"
                alt=""
              />
            </div>
          </Grid>
          <Grid item lg={7} md={7} sm={7} xs={12}>
            <h3 className="text-center">
              Daftar Akun Pegawai Kelurahan / Kecamatan
            </h3>
            <div className="p-8 h-full">
              <ValidatorForm onSubmit={handleFormSubmit}>
                <TextValidator
                  className="mb-6 w-full"
                  variant="outlined"
                  size="small"
                  label="Nama"
                  onChange={handleChange}
                  type="text"
                  name="name"
                  value={name || ''}
                  validators={['required']}
                  errorMessages={['Kolom ini harus diisi']}
                />
                <TextValidator
                  className="mb-6 w-full"
                  variant="outlined"
                  size="small"
                  label="NIP/NRNPNSD"
                  onChange={handleChange}
                  type="tel"
                  InputProps={{ maxLength: 16 }}
                  name="nip"
                  value={nip || ''}
                  validators={['required']}
                  errorMessages={['Kolom ini harus diisi']}
                />
                <TextValidator
                  className="mb-6 w-full"
                  variant="outlined"
                  size="small"
                  label="NIK"
                  onChange={handleChange}
                  type="tel"
                  InputProps={{ maxLength: 16 }}
                  name="nik"
                  value={nik || ''}
                  validators={['required']}
                  errorMessages={['Kolom ini harus diisi']}
                />
                <TextValidator
                  inputProps={{ style: { textTransform: 'lowercase' } }}
                  className="mb-6 w-full"
                  variant="outlined"
                  size="small"
                  label="Username"
                  onChange={handleChange}
                  type="text"
                  name="username"
                  value={username || ''}
                  validators={['required']}
                  errorMessages={['Kolom ini harus diisi']}
                />
                <TextValidator
                  className="mb-6 w-full"
                  variant="outlined"
                  size="small"
                  label="Email"
                  onChange={handleChange}
                  type="email"
                  name="email"
                  value={email || ''}
                  validators={['required', 'isEmail']}
                  errorMessages={['Kolom ini harus diisi', 'email tidak valid']}
                />
                <TextValidator
                  className="mb-4 w-full"
                  label="Password"
                  variant="outlined"
                  size="small"
                  onChange={handleChange}
                  name="password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password || ''}
                  validators={['required']}
                  errorMessages={['Kolom ini harus diisi']}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControlLabel
                  className="mb-4"
                  name="agreement"
                  onChange={(e) => handleChange({
                      target: {
                        name: 'agreement',
                        value: e.target.checked,
                      },
                    })}
                  control={
                    <Checkbox size="small" checked={agreement || false} />
                  }
                  label="Saya telah membaca dan menyetujui persyaratan layanan."
                />

                {message && (
                  <div
                    className={
                      successful ? 'alert text-green' : 'alert text-error'
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                )}

                <div>
                  <ReCAPTCHA
                    ref={reCaptcha}
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // localhost
                    // sitekey="6Leh4f0bAAAAANL2KRcZHSxefTo5_YhbhIjrAK9p"
                    onChange={(token) => setToken(token)}
                    onExpired={(e) => setToken('')}
                  />
                </div>

                <br />
                <div className="flex items-center">
                  <Button
                    className="capitalize"
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Daftar
                  </Button>

                  <span className="mx-2 ml-5">atau</span>
                  <Link to="/session/signin">
                    <Button className="capitalize text-primary">Masuk</Button>
                  </Link>
                </div>

                <br />
                <Button
                  className="text-primary"
                  onClick={() => history.push('/session/signup-public')}
                >
                  Daftar Akun Masyarakat
                </Button>
              </ValidatorForm>
            </div>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default JwtRegisterEmployee;
