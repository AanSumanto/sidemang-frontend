import React, { useState } from 'react'
import { Card, Grid, Button } from '@material-ui/core'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import useAuth from 'app/hooks/useAuth'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    cardHolder: {
        background: '#1A2038',
    },
    card: {
        maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
    },
}))

const ForgotPassword = () => {
    const [user, setUser] = useState({
        email: '',
    })
    const classes = useStyles();
    const [message, setMessage] = useState('');
    const [successful, setSuccessful] = useState(false);
    const { requestResetPassword } = useAuth();

    // const handleChange = ({ target: { name, value } }) => {
    //     setUser({
    //         ...user,
    //         [name]: value,
    //     })
    // };

    const handleChange = ({ target: { name, value } }) => {
        let temp = { ...user };
        temp[name] = value;
        setUser(temp);
    }


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setSuccessful(false);
        try {
            await requestResetPassword(user.email)
            .then(() => {
                const message = "Link Reset Password sudah di kirim ke email anda, Silahkan cek folder Inbox atau spam email anda";
                setMessage(message);
                setSuccessful(true);
            });            
        } catch (error) {
              setMessage(error.message);
                setSuccessful(false);
        };
    };

    const { email } = user;

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
                                className="w-full"
                                src="/assets/images/illustrations/Logo-sidemang.svg"
                                alt=""
                            />
                        </div>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <div className="p-8 h-full bg-light-gray relative">
                            <ValidatorForm onSubmit={handleFormSubmit}>
                                <TextValidator
                                    className="mb-6 w-full"
                                    variant="outlined"
                                    label="Email"
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    size="small"
                                    value={email || ''}
                                    validators={['required', 'isEmail']}
                                    errorMessages={[
                                        'Silahkan isi email anda',
                                        'Email Tidak Valid',
                                    ]}
                                />

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
                                <br></br>

                                <div className="flex items-center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        Reset Password
                                    </Button>
                                    <span className="ml-4 mr-2">atau</span>
                                    <Link to="/session/signin">
                                        <Button className="capitalize  text-primary">
                                            Masuk
                                        </Button>
                                    </Link>
                                </div>
                            </ValidatorForm>
                        </div>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

export default ForgotPassword
