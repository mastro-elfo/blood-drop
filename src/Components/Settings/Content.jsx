import React, { Component } from 'react';
import { remote } from 'electron';
import { prefix } from 'prefix-si';
import { copyFile } from 'fs';
import { homedir } from 'os';
import { join } from 'path';
import { withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
// import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudDownload from '@material-ui/icons/CloudDownload';
import Save from '@material-ui/icons/Save';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Column from '../Column';
// import { ReadAll } from '../../Actions/Record';
import { Path } from '../../Actions/Database';

class SettingsContent extends Component {
  state = {
    cloudDownload: false,
    saveBackup: false,
    loadBackup: false,
    confirmLoadBackup: false,
    confirmCloudDownload: false,
    fetchCloudDownload: false,
    cloudDownloadList: null,
  };

  componentDidMount() {}

  render() {
    const { classes } = this.props;
    const {
      cloudDownload,
      saveBackup,
      loadBackup,
      confirmLoadBackup,
      confirmCloudDownload,
      fetchCloudDownload,
      cloudDownloadList
    } = this.state;

    return (
      <Column>
        <List>
          <ListItem>
            <ListItemText primary="Scarica backup" secondary="Coming soon..." />
            <ListItemSecondaryAction>
              <IconButton
                title="Scarica backup dal server"
                onClick={this.handleConfirmCloudDownload}
                disabled={cloudDownload}
              >
                <CloudDownload />
                {cloudDownload && (
                  <CircularProgress color="secondary" className={classes.Absolute} />
                )}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText primary="Salva backup" secondary="" />
            <ListItemSecondaryAction>
              <IconButton
                title="Salva backup locale"
                onClick={this.handleSaveBackup}
                disabled={saveBackup}
              >
                <Save />
                {saveBackup && <CircularProgress color="secondary" className={classes.Absolute} />}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText primary="Importa backup" secondary="" />
            <ListItemSecondaryAction>
              <IconButton
                title="Importa backup locale"
                onClick={this.handleConfirmBackupImport}
                disabled={loadBackup}
              >
                <ArrowUpward />
                {loadBackup && <CircularProgress color="secondary" className={classes.Absolute} />}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>

        <Dialog open={confirmLoadBackup} onClose={this.handleCancelBackupImport}>
          <DialogTitle>Importare il backup?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Se si decide di continuare i dati attualmente in memoria verranno sovrascritti. Si
              consiglia di creare un backup prima di continuare.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button title="Clicca per annullare" onClick={this.handleCancelBackupImport}>
              Annulla
            </Button>
            <Button title="Clicca per confermare" onClick={this.handleChooseBackupImport}>
              Conferma
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={confirmCloudDownload} onClose={this.handleCancelCloudDownload}>
          <DialogTitle>Scaricare il backup?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Se si decide di continuare i dati attualmente in memoria verranno sovrascritti. Si
              consiglia di creare un backup prima di continuare.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button title="Clicca per annullare" onClick={this.handleCancelCloudDownload}>
              Annulla
            </Button>
            <Button title="Clicca per confermare" onClick={this.handleFetchCloudDownload}>
              Conferma
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={fetchCloudDownload} onClose={this.handleCancelCloudDownload}>
          <DialogTitle>Scegliere il backup da scaricare</DialogTitle>
          <DialogContent>
            {cloudDownloadList === null ? (
              <CircularProgress color="secondary" />
            ) : cloudDownloadList.length === 0 ? (
              <DialogContentText>Non ci sono backup dispobibili sul server</DialogContentText>
            ) : (
              <List />
            )}
            {}
          </DialogContent>
          <DialogActions>
            <Button title="Clicca per annullare" onClick={this.handleCancelCloudDownload}>
              Annulla
            </Button>
          </DialogActions>
        </Dialog>
      </Column>
    );
  }

  handleConfirmCloudDownload = () => {
    this.setState({
      cloudDownload: true,
      confirmCloudDownload: true,
      cloudDownloadList: null,
    });
  };

  handleCancelCloudDownload = () => {
    this.setState({
      cloudDownload: false,
      confirmCloudDownload: false,
      fetchCloudDownload: false,
    });
  };

  handleFetchCloudDownload = () => {
    this.setState({
      fetchCloudDownload: true,
      confirmCloudDownload: false,
    });
    // TODO: Fetch backups from cloud
    this.setState({
      cloudDownloadList: [],
    });
  };

  handleCloudDownload = backup => {
    // TODO: download and import backup
  };

  handleConfirmBackupImport = () => {
    this.setState({
      loadBackup: true,
      confirmLoadBackup: true,
    });
  };

  handleCancelBackupImport = () => {
    this.setState({
      loadBackup: false,
      confirmLoadBackup: false,
    });
  };

  handleChooseBackupImport = () => {
    this.setState({
      confirmLoadBackup: false,
    });
    remote.dialog.showOpenDialog(
      {
        properties: ['openFile'],
        title: 'Seleziona un file',
        defaultPath: homedir(),
      },
      filepaths => {
        if (filepaths && filepaths.length) {
          this.handleBackupImport(filepaths[0]);
        } else {
          this.setState({
            loadBackup: false,
          });
        }
      },
    );
  };

  handleBackupImport = filename => {
    copyFile(filename, Path, 0, err => {
      const { enqueueSnackbar } = this.props;
      if (err) {
        console.error(err);
        enqueueSnackbar(err.message, { variant: 'error' });
      } else {
        enqueueSnackbar('Backup importato', { variant: 'success' });
      }
      this.setState({
        loadBackup: false,
      });
    });
  };

  handleSaveBackup = () => {
    remote.dialog.showSaveDialog(
      {
        properties: ['openFile', 'promptToCreate', 'createDirectory'],
        title: 'Seleziona un file',
        defaultPath: join(homedir(), 'blood-drop.backup'),
      },
      filename => {
        if (filename) {
          copyFile(Path, filename, 0, err => {
            const { enqueueSnackbar } = this.props;
            if (err) {
              console.error(err);
              enqueueSnackbar(err.message, { variant: 'error' });
            } else {
              enqueueSnackbar('Backup creato', { variant: 'success' });
            }
            this.setState({
              saveBackup: false,
            });
          });
        } else {
          this.setState({
            saveBackup: false,
          });
        }
      },
    );
  };
}

const styles = theme => ({
  ListSubheader: {
    background: 'white',
  },
  Absolute: {
    position: 'absolute',
  },
});

export default withSnackbar(withStyles(styles)(SettingsContent));
