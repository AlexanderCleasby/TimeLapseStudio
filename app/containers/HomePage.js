import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as ImagesActions from '../actions/images';

function mapStateToProps(state) {
  return {
    images: state.images
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ImagesActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
