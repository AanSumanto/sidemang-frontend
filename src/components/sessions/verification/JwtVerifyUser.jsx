import React from 'react'
import {
    Card,
    Grid,
  
} from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import useAuth from 'app/hooks/useAuth';
import { Link } from 'react-router-dom';

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

const JwtVerifyUser = (props) => {
    const classes = useStyles();
    const { verifyUser } = useAuth();

    if (props.match.path === "/confirm/:confirmationCode") {
        verifyUser(props.match.params.confirmationCode);
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
                        <header className="jumbotron">
                            <h3>
                                <strong>Account confirmed!</strong>
                            </h3>
                        </header>
                            <Link to={"/session/signin"}
                              className="text-primary"
                            >
                                Please Login
                            </Link>
                        </div>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

export default JwtVerifyUser;
