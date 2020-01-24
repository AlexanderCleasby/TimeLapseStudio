import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as ImagesActions from '../actions/images';
import * as SettingsActions from '../actions/settings';

function mapStateToProps(state) {
  return {
    images: state.images.all,
    selectedImage: state.images.selected,
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...ImagesActions, ...SettingsActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
