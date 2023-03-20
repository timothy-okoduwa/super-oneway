import React from 'react';
// import Alert from 'react-bootstrap/Alert';
// import Button from 'react-bootstrap/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { useLocation } from 'react-router-dom';
import './Alertss.css';

import CloseIcon from '@mui/icons-material/Close';
const Alerts = () => {
  const [open, setOpen] = React.useState(true);

  const location = useLocation();
  const isHiddenPage2 =
    location.pathname === '/admin' ||
    location.pathname === '/paidupload' ||
    location.pathname.startsWith('/createvplus38725') ||
    location.pathname === '/dashboard' ||
    location.pathname.startsWith('/freeupdate/') ||
    location.pathname.startsWith('/paidupdate/') ||
    location.pathname === '/freeupload';
  return (
    <>
      {isHiddenPage2 ? null : (
        <Box style={{ overflowX: 'hidden' }}>
          <Collapse in={open} style={{ overflowX: 'hidden' }}>
            <Alert
              className="alsiod"
              severity="info"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              // sx={{ mb: 1 }}
            >
              <div style={{ textAlign: 'center', fontSize: '13px' }}>
                TO BECOME A CONTRIBUTOR TODAY!{' '}
                <a
                  href="https://vestarplus.com"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  CLICK TO JOIN🏆!
                </a>{' '}
              </div>
            </Alert>
          </Collapse>
        </Box>
      )}
    </>
  );
};

export default Alerts;
