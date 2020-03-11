import DateFnUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import React, { SyntheticEvent, useState } from 'react';
import styled from 'styled-components';
import { DATE_FORMAT } from '../../constants';

interface ModalProps {
  open: boolean;
  onClose: React.MouseEventHandler;
  onNewBill: CallableFunction;
}

export interface DateModel {
  date: string;
  amount: string;
  hashtags: string;
  description: string;
}

const DatePicker = styled(KeyboardDatePicker)`
  width: 100%;
`;

const ModalTitleBar = styled(DialogTitle)`
  background: #7b1fa2;
  color: white;
`;

const ModalActionBar = styled(DialogActions)`
  && {
    padding: 18px 24px;
  }
`;

const ActionButton = styled(Button)`
  && {
    min-width: 84px;
  }
`;

const initialState = {
  date: String(new Date()),
  amount: '',
  hashtags: '',
  description: ''
};

const AddBillModal: React.FC<ModalProps> = props => {
  const { open, onClose, onNewBill } = props;
  const [state, setState] = useState<DateModel>(initialState);
  const handleDateChange = (date: Date | null) =>
    setState({ ...state, date: String(date || new Date()) });
  const handleTextChange = ({ target }: SyntheticEvent) =>
    setState({
      ...state,
      [(target as HTMLInputElement).id]: (target as HTMLInputElement).value
    });

  const isValid = () =>
    !!state.amount && !RegExp(/[^\d]/).test(state.amount) && !!state.hashtags;

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <ModalTitleBar id="form-dialog-title">Add a bill</ModalTitleBar>
      <DialogContent>
        <form>
          <MuiPickersUtilsProvider utils={DateFnUtils}>
            <DatePicker
              id="date"
              label="Date"
              format={DATE_FORMAT}
              margin="normal"
              value={new Date(state.date)}
              onChange={handleDateChange}
            />
          </MuiPickersUtilsProvider>
          <TextField
            id="amount"
            label="Amount"
            type="text"
            variant="standard"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">{'\u20B9'}</InputAdornment>
              )
            }}
            margin="normal"
            value={state.amount}
            required
            autoComplete="off"
            onChange={handleTextChange}
          />
          <TextField
            id="hashtags"
            label="#hashtags"
            type="text"
            variant="standard"
            fullWidth
            multiline
            rows="1"
            margin="normal"
            value={state.hashtags}
            required
            onChange={handleTextChange}
          />
          <TextField
            id="description"
            label="Description"
            type="text"
            variant="standard"
            fullWidth
            multiline
            rows="1"
            margin="normal"
            autoComplete="off"
            value={state.description}
            onChange={handleTextChange}
          />
        </form>
      </DialogContent>
      <ModalActionBar>
        <ActionButton onClick={onClose} color="primary" variant="outlined">
          Cancel
        </ActionButton>
        <ActionButton
          onClick={() => onNewBill(state)}
          color="primary"
          variant="contained"
          disabled={!isValid()}
        >
          Save
        </ActionButton>
      </ModalActionBar>
    </Dialog>
  );
};

export default AddBillModal;
