import Dispatcher from '../app/dispatcher';

describe('dispatcher', () => {

  test('register adds a callback as a listener', done => {
    const teststr = "test";
    const dispatcher = new Dispatcher();
    dispatcher.register((action) => {
      if (action === teststr) {
        done();
      }
    });

    dispatcher.dispatch(teststr);
  });

  test('unregister removes a callback as a listener', done => {
    const teststr = "test";
    const dispatcher = new Dispatcher();
    const token = dispatcher.register((action) => {
      if (action === teststr) {
        throw new Error('unregistered dispatcher called');
      }
    });

    dispatcher.unregister(token);
    dispatcher.dispatch(teststr);
    setTimeout(() => done(), 1000);
  });

});
