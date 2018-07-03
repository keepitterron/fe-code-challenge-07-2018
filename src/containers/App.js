import React from 'react';
import { connect } from 'react-redux';
import UploadFile from '../components/UploadFile';
import FileList from '../components/FileList';
import Loader from '../components/Loader';
import SnackBar from '../components/SnackBar';
import { removeFile, allFiles, resetUpload, uploadFile } from '../actions';

class App extends React.Component {

  componentWillMount() {
      this.props.dispatch(allFiles());
  }

  onFileUpload = (event) => {
    const files = event.target.files;
    if(!files.length) return;

    this.props.dispatch(uploadFile(files[0]));

    event.target.value = '';
  }

  render() {
      return (
        <div>
          <UploadFile onFileUpload={this.onFileUpload} />
          {this.props.isFetching && <Loader />}
          <SnackBar isOpen={this.props.isError} onClose={() => this.props.dispatch(resetUpload())} />
          <FileList files={this.props.files} onDelete={file => this.props.dispatch(removeFile(file))} />
        </div>
      );
  }
}

const mapStateToProps = (state) => ({
  files: state.items,
  isFetching: state.isFetching,
  isError: state.isError,
})

export default connect(mapStateToProps)(App)
