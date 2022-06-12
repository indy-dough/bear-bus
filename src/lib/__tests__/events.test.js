import { Events } from '../../index';

describe('Events', () => {
  it('should handle callback', () => {
    const events = new Events();
    const callback = jest.fn();

    events.on('test', callback);
    events.emit('test');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not handle callback', () => {
    const events = new Events();
    const callback = jest.fn();

    events.on('test', callback);
    events.off('test', callback);
    events.emit('test');
    expect(callback).toHaveBeenCalledTimes(0);
  });

  it('should handle only appropriate callback', () => {
    const events = new Events();
    const callback = jest.fn();
    const callback1 = jest.fn();

    events.on('test', callback);
    events.on('test1', callback1);
    events.emit('test');
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback1).toHaveBeenCalledTimes(0);
  });

  it('should handle several callbacks', () => {
    const events = new Events();
    const callback = jest.fn();
    const callback1 = jest.fn();

    events.on('test', callback);
    events.on('test', callback1);
    events.emit('test');
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback1).toHaveBeenCalledTimes(1);
  });

  it('should off several callbacks', () => {
    const events = new Events();
    const callback = jest.fn();
    const callback1 = jest.fn();

    events.on('test', callback);
    events.on('test', callback1);
    events.off('test');
    events.emit('test');
    expect(callback).toHaveBeenCalledTimes(0);
    expect(callback1).toHaveBeenCalledTimes(0);
  });

  it('should not fail with no callbacks', () => {
    const events = new Events();

    expect(() => events.emit('test')).not.toThrow();
  });

  it('should not fail with no on before off', () => {
    const events = new Events();
    const callback = jest.fn();

    expect(() => events.off('test', callback)).not.toThrow();
  });
});
