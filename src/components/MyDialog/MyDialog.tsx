import { useContext } from 'react';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';

import { GlobalContext } from '@core';

import CloseIcon from '@assets/icons/ic_close.svg?react';

const BootstrapDialog = styled(Dialog)(
  ({ theme }) => (
    {
      '& .MuiPaper-root': {
        minWidth: 375,
        borderRadius: 8
      },
      '& .MuiDialogTitle-root': {
        padding: theme.spacing(2),
        fontSize: '0.875rem',
        lineHeight: '1.5rem',
        fontWeight: 700,
        letterSpacing: '0.02em',
        backgroundColor: 'var(--neutral-40)'
      },
      '& .MuiDialogContent-root': {
        textAlign: 'center',
        padding: theme.spacing(8, 2),
        fontSize: '0.875rem',
        lineHeight: '1.5rem',
        fontWeight: 700,
        letterSpacing: '0.02em'
      },
      '& .MuiDialogActions-root': {
        backgroundColor: 'var(--neutral-40)',
        padding: theme.spacing(1.5),
        justifyContent: 'center',
        '& .MuiButtonBase-root': {
          borderRadius: theme.spacing(1),
          padding: theme.spacing(2, 4),
          fontSize: '1rem',
          fontWeight: 700,
          letterSpacing: '0.02em',
          lineHeight: '1.5rem'
        }
      }
    }
  ));

/**
 * 客製的對話框元件
 */
export const MyDialog = () => {

  const { dialogPayload, dispatch } = useContext(GlobalContext);

  // 當使用者按下取消按鈕時要做的事情
  const handleReject = () => {
    if ( dialogPayload.rejectAction ) {
      dialogPayload.rejectAction();
    }
    closeDialog();
  };

  // 當使用者按下確定按鈕時要做的事情
  const handleAccept = () => {
    if ( dialogPayload.acceptAction ) {
      dialogPayload.acceptAction();
    }
    closeDialog();
  };

  // 關閉對話框時要做的事情
  const closeDialog = () => {
    dispatch({ type: 'SET_DIALOG', payload: { display: false } });
  };

  return (
    <BootstrapDialog
      onClose={ handleReject }
      open={ dialogPayload.display }
    >
      <DialogTitle>{ dialogPayload.title }</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={ handleReject }
        sx={ {
          position: 'absolute',
          right: 8,
          top: 8
        } }
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <p>{ dialogPayload.content }</p>
      </DialogContent>
      <DialogActions>
        { dialogPayload.showReject && (
          <Button
            className="secondary"
            autoFocus={ dialogPayload.autoFocus === 'reject' }
            onClick={ handleReject }
          >
            <span className="title">{ dialogPayload.rejectLabel ?? '取消' }</span>
          </Button>
        ) }
        <Button
          className="primary"
          autoFocus={ dialogPayload.autoFocus === 'accept' } onClick={ handleAccept }
        >
          { dialogPayload.acceptLabel ?? '確定' }
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};
