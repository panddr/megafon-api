import socketClient from 'socket.io-client';

export function setupRealtime(store, actions) {
  const io = socketClient();

  io.on('event-change', (change) => {
    let state = store.getState();
    // if (!change.old_val) {
    //   store.dispatch(actions.addEventSuccess(change.new_val));
    // } else if (!change.new_val) {
    //   store.dispatch(actions.deleteEventSuccess(change.old_val));
    // } else {
    //   store.dispatch(actions.editEventSuccess(change.new_val));
    // }
    if (!change.old_val) {
      store.dispatch(actions.startAnsweringSuccess(change.new_val));
      // store.dispatch(actions.startHelpingSuccess(change.new_val));
      // store.dispatch(actions.initStateSuccess(change.new_val));
    } else if (!change.new_val) {
      store.dispatch(actions.startAnsweringSuccess(change.old_val));
      // store.dispatch(actions.startHelpingSuccess(change.old_val));
      // store.dispatch(actions.initStateSuccess(change.old_val));
    } else {
      store.dispatch(actions.startAnsweringSuccess(change.new_val));
      // store.dispatch(actions.startHelpingSuccess(change.new_val));
      // store.dispatch(actions.initStateSuccess(change.new_val));
    }
  });

  return io;
}
