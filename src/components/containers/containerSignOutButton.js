import { connect } from 'react-redux';
import actions from '../../store/actions';
import SignOutButton from '../widgets/SignOutButton';

const mapDispatchToProps = dispatch => ({
  signOut: () => {
    dispatch(actions.signOut());
  },
});

export default connect(null, mapDispatchToProps)(SignOutButton);
