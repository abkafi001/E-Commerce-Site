import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    card:{
        minWidth: 400,
        // display: "flex",
        // flexDirection : "column",
        alignItems: "center"
    },
    root: {
        // maxWidth: 345, original width style
        maxWidth: "100%",
        maxHeight: "100vh",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    media: {
        // flex : 1,
        // width: 180,
        height: 180,
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    cartActions: {
        justifyContent: 'space-between',
    },
    buttons: {
        display: 'flex',
        alignItems: 'center',
    },
}));