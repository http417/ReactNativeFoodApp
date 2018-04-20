import { connect } from 'react-redux';
import actions from '../../store/actions';
import SignUpScreen from '../screens/SignUpScreen';

const mapDispatchToProps = dispatch => ({
  signIn: (token) => {
    dispatch(actions.signIn(token));
  },
});

export default connect(null, mapDispatchToProps)(SignUpScreen);
