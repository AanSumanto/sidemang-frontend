import React, { useEffect, useState } from 'react'
import {
    Card,
    Grid,
    Button,
    CircularProgress,
} from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import useAuth from 'app/hooks/useAuth';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import history from 'history.js';

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

const JwtVerifyResetPassword = (props) => {
    const { verifyResetPassword, resetPasswordViaEmail } = useAuth();

    useEffect(() => {       
        if (props.match.path === "/resetPassword/:token") {
            verifyResetPassword(props.match.params.token);
        }

    }, [verifyResetPassword, props.match.path, props.match.params.token])

    
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [successful, setSuccessful] = useState(false);

    const [user, setUser] = useState({
        password: '',
        showPassword: false,
    })

    const handleChange = ({ target: { name, value } }) => {
        let temp = { ...user };
        temp[name] = value;
        setUser(temp);
    }

    const handleClickShowPassword = () => {
        setUser({ ...user, showPassword: !user.showPassword });
      };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await resetPasswordViaEmail(user.password)
            .then(() => {
                setMessage(message + 'Silahkan login dengan password baru anda');
                setSuccessful(true);
                setLoading(true);
            })
        } catch (e) {
            setMessage(e.message);
            setSuccessful(false);
            setLoading(false)
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
                            <h4 className="text-center">Masukkan Password baru anda</h4>
                            <ValidatorForm onSubmit={handleFormSubmit}>
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
                                    errorMessages={['Silahkan Masukkan Password Baru Anda']}
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

                                    <div className="flex flex-wrap items-center mb-4">
                                        <div className="relative">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                onClick={() =>
                                                    history.push('/session/signin')
                                                }
                                            >
                                                Update Password
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

                                        {message && (
                                            <div
                                                className={
                                                successful ? "alert text-green" : "alert text-error"
                                                }
                                                role="alert"
                                            >
                                                {message}
                                            </div>
                                        )}
                                    </div>

                                    {/* <div className="flex flex-wrap items-center mb-4">
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
                                </div> */}
                            </ValidatorForm>
                        </div>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

export default JwtVerifyResetPassword;
