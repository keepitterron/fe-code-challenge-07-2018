import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';

export const toDate = file => {
  const date = new Date(file.key * 1000);
  return `${date.toLocaleDateString()} ${date.getHours()}:${date.getSeconds()}`;
};

export const FileListItem = ({ file, onDelete }) => (
  <div>
    <ListItem button onClick={() => (window.location = file.link)}>
      <ListItemAvatar>
        <Avatar>
          <InsertDriveFileIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={file.name} secondary={toDate(file)} />
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete" onClick={() => onDelete(file)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
    <Divider />
  </div>
);

export default class FileList extends React.Component {
  render() {
    const { files, onDelete } = this.props;

    return (
      <div>
        <Typography variant="title" style={{margin: '0.5rem 0'}}>
          {files.length ? 'Uploaded files list' : 'No files uploaded yet'}
        </Typography>
        <List>
          {files.map(file => <FileListItem key={file.key} file={file} onDelete={onDelete} />)}
        </List>
      </div>
    );
  }
}
