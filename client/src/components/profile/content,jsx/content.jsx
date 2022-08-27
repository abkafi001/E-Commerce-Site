import React from 'react';
import { Grid, List, ListItem, ListItemText, Card, CardHeader, CardMedia, CardContent, CardActions, Typography ,Button,  Container  } from '@material-ui/core';
import {AddShoppingCart , AccountCircle} from '@material-ui/icons';
import makeStyles from './style';
import logo from '../../../assets/profileLogo.png';


const Content=(person)=>{
    const classes=makeStyles();
    return(
        <> 
            <Grid
            className={classes.root}
            spacing={0}
            alignItems="center"
            justify="center"
            >
            <Card variant="outlined" className={classes.card}>
                <CardMedia image={logo} className={classes.media}>

                </CardMedia>
                <CardContent>
                    <List>
                        <ListItem style={{ padding: '10px 0' }}>
                            <ListItemText primary={"Customer Name :"} />
                            <Typography variant="body2">Sukanto Kumar Das</Typography>
                        </ListItem>
                        <ListItem style={{ padding: '5px 0' }}>
                            <ListItemText primary={"User Name :"} />
                            <Typography variant="body2">Debasish91</Typography>
                        </ListItem>
                        <ListItem style={{ padding: '5px 0' }}>
                            <ListItemText primary={"Password :"} />
                            <Typography variant="body2">12345678</Typography>
                        </ListItem>
                        <ListItem style={{ padding: '5px 0' }}>
                            <ListItemText primary={"Bank Account :"} />
                            <Typography variant="body2">2017331091</Typography>
                        </ListItem>
                        <ListItem style={{ padding: '20px 0' }}>
                            <ListItemText primary={"Balance :"} />
                            <Typography variant="h6">10,000$</Typography>
                        </ListItem>
                    </List>
                </CardContent>
                <CardActions alaignItem='center'>
                    <Button variant="contained" type="button" color="secondary" >Back</Button>
                </CardActions>
            </Card>
            </Grid>
        </>
    )
}
export default Content;