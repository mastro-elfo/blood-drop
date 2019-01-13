import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ActionIcon from '@material-ui/icons/Edit';
import Header from '../Header';

class DonationHeader extends PureComponent {
  render() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    return (
      <Header
        title="Scheda donazione"
        action={()=>push(`/donation/edit/${id}`)}
        actionTitle="Modifica donazione"
        actionIcon={<ActionIcon />}
      />
    );
  }
}

export default withRouter(DonationHeader);
