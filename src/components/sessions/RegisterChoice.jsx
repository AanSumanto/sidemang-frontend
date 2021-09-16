import React from 'react'
import {
    Card,
    Grid,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import history from 'history.js';
import clsx from 'clsx';

const useStyles = makeStyles(({ palette, ...theme }) => ({
    cardHolder: {
        background: '#1A2038',
    },
    card: {
        maxWidth: 500,
        background: '#1A2038',
        borderRadius: 12,
        margin: 'auto',
        textAlign: '-webkit-center',
        justifyContent: 'center',
        
    },
    media: {
        height: 160,
        width: 160,
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
      },
}))

const UserChoice = () => {
   
    const classes = useStyles();

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
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image="/assets/images/illustrations/user-pegawai.svg"
                                    title="user pegawai icon"
                                    onClick={() =>
                                        history.push('/session/signup-employee')
                                    }
                                />
                                <CardContent>
                                    <Typography className="text-white text-center" gutterBottom variant="h6" component="h2">
                                        Pegawai Kelurahan/Kecamatan                       
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </div>
                    </Grid>
                    
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <div className="p-8 flex justify-center items-center h-full">
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image="/assets/images/illustrations/user-masyarakat.svg"
                                    title="user pegawai icon"
                                    onClick={() =>
                                        history.push('/session/signup-public')
                                    }
                                />
                                <CardContent>
                                    <Typography className="text-white text-center" gutterBottom variant="h6" component="h2">
                                        Masyarakat Palembang
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </div>
                    </Grid>
                </Grid>
            </Card>            
        </div>
    )
}

export default UserChoice
