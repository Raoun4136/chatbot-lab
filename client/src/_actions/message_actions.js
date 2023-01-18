import { SAVE_MESSAGE, INIT_MESSAGE } from './types';

export function saveMessage(dataToSubmit) {
  return {
    type: SAVE_MESSAGE,
    payload: dataToSubmit,
  };
}

export function initMessage() {
  return {
    type: INIT_MESSAGE,
  };
}
