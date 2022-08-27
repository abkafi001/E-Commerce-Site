import {makeStyles} from '@material-ui/core/styles';


export default makeStyles(() => ({
    root: {
      // maxWidth: 345, original width style
      maxWidth: '100%',
      borderRadius: '16px',
      backgroundColor:"646FD4",
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
      backgroundColor:"646FD4",
    },
    cardActions: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    cardContent: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }));