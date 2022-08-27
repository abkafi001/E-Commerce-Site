import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    root: {
        // maxWidth: 345, original width style
        maxWidth: '100%',
        borderRadius: '16px'
    },
    media: {
        height: 260,
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