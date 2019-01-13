import React from 'react';
import { SnackbarProvider } from 'notistack';

export default function NotifyWrapper(props) {
  return (
    <SnackbarProvider
      maxSnack={5}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      {props.children}
    </SnackbarProvider>
  );
}

// Use
// `import {withSnackbar} from 'notistack';`
// ...
// This provide `enqueueSnackbar(message, options)` in component props.
// Options:
// 	* `.variant`: oneOf(['default', 'error', 'success', 'warning', 'info'])
// 	* `.autoHideDuration`: number (ms)
// ...
// `export default withSnackbar(MyCompnent);`
