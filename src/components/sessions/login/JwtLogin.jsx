import React, { useState } from 'react'
import {
    Card,
    Checkbox,
    FormControlLabel,
    Grid,
    Button,
    CircularProgress,
} from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import history from 'history.js';
import clsx from 'clsx';
import useAuth from 'app/hooks/useAuth';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRef } from 'react';

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
}))

const JwtLogin = () => {
    const [loading, setLoading] = useState(false);
    const [user, setuser] = useState({
        username: '',
        email: '',
        password: '',
        showPassword: false,
    })
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');
    const { reCaptcha } = useRef();

    const { login } = useAuth();
    const classes = useStyles();

    const handleChange = ({ target: { name, value } }) => {
        let temp = { ...user };
        temp[name] = value;
        setuser(temp);
    }

    const handleClickShowPassword = () => {
        setuser({ ...user, showPassword: !user.showPassword });
      };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleFormSubmit = async (e) => {
        if (!token){
            setMessage('Verifikasi Captcha Terlebih Dahulu!');
            return;
        }
        e.preventDefault();
        setMessage('');
        setLoading(true)
        try {
            await login(user.username, user.password);
            history.push('/');
        } catch (e) {
            setMessage(e.message);
            setLoading(false);
        }
    }

    return (
        <div
            className={clsx(
                'flex justify-center items-center  min-h-full-screen',
                classes.cardHolder
            )}
        >
            <Card className={classes.card}>
                <Grid container>
                    <Grid item lg={5} md={5} sm={5} xs={12}>                    
                        <div className="p-8 flex justify-center items-center h-full">
                            <img
                                className="w-200"
                                src="/assets/images/illustrations/Logo-sidemang.svg"
                                alt=""
                            />
                        </div>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <div className="p-8 h-full bg-light-gray relative">
                            <h3 className="text-center">LOGIN</h3>
                            <ValidatorForm 
                                // ref={user}
                                onSubmit={handleFormSubmit}>
                                <TextValidator
                                    inputProps={{ style: { textTransform: "lowercase" } }}
                                    className="mb-6 w-full"
                                    variant="outlined"
                                    size="small"
                                    label="Username"
                                    onChange={handleChange}
                                    type="username"
                                    name="username"
                                    value={user.username}
                                    validators={['required']}
                                    errorMessages={[
                                        'Kolom ini harus di isi',
                                    ]}
                                />
                                <TextValidator
                                    className="mb-3 w-full"
                                    label="Password"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    name="password"
                                    type={user.showPassword ? 'text': 'password'}
                                    value={user.password || ''}
                                    validators={['required']}
                                    errorMessages={['Kolom ini harus di isi']}
                                    InputProps={{
                                        endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            >
                                            {user.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }}
                                />
                                <FormControlLabel
                                    className="mb-3 min-w-288"
                                    name="agreement"
                                    onChange={handleChange}
                                    control={
                                        <Checkbox
                                            // ref={agreement}
                                            size="small"
                                            onChange={({
                                                target: { checked },
                                            }) =>
                                                handleChange({
                                                    target: {
                                                        name: 'agreement',
                                                        value: checked,
                                                    },
                                                })
                                            }
                                            checked={user.agreement || false}
                                        />
                                    }
                                    label="Ingatkan saya"
                                />
                                <div>
                                    <ReCAPTCHA
                                    ref={reCaptcha}
                                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" //localhost
                                    // sitekey="6Leh4f0bAAAAANL2KRcZHSxefTo5_YhbhIjrAK9p"
                                    onChange={token => setToken(token)}
                                    onExpired={e => setToken('')}
                                    /> 
                                </div>
                                <br></br>
                                
                                {message && (
                                    <p className="text-error">{message}</p>
                                )}

                                <div className="flex flex-wrap items-center mb-4">
                                    <div className="relative">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                        >
                                            Masuk
                                        </Button>
                                        {loading && (
                                            <CircularProgress
                                                size={24}
                                                className={
                                                    classes.buttonProgress
                                                }
                                            />
                                        )}
                                    </div>
                                    <span className="mr-2 ml-5">atau</span>
                                    <Button
                                        className="capitalize text-primary"
                                        onClick={() =>
                                            history.push('/session/user-choice')
                                            // history.push('/session/signup')
                                        }
                                    >
                                        Daftar
                                    </Button>
                                </div>
                                
                                <Button
                                    className="text-primary"
                                    onClick={() =>
                                        history.push('/session/forgot-password')
                                    }
                                >
                                    Lupa password?
                                </Button>
                            </ValidatorForm>
                        </div>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

export default JwtLogin
