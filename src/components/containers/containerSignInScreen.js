import { connect } from 'react-redux';
import actions from '../../store/actions';
import SignInScreen from '../screens/SignInScreen';

const mapDispatchToProps = dispatch => ({
  signIn: (token) => {
    dispatch(actions.signIn(token));
  },
});

export default connect(null, mapDispatchToProps)(SignInScreen);
