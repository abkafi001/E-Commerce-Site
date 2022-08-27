import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  bakk : {
    backgroundColor : '#ff0000',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },title: {
    marginTop: '2%',
    marginBottom: '2%',
    textAlign	: 'center',
  },
  root: {
    flexGrow: 1,
  },
}));