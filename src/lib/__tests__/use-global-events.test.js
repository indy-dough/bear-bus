import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { useGlobalEvent } from '../../index';

describe('useGlobalEvent', () => {
  it('should handle callback', () => {
    const callback = jest.fn();

    function TestHook() {
      const emitter = useGlobalEvent('test', callback);

      return <div onClick={() => emitter()}>test click</div>;
    }

    render(<TestHook />);
    fireEvent.click(screen.getByText('test click'));

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not handle callback', () => {
    const callback = jest.fn();

    function TestHook() {
      useGlobalEvent('test', callback);
      const emitter = useGlobalEvent('test1');

      return <div onClick={() => emitter()}>test click</div>;
    }

    render(<TestHook />);
    fireEvent.click(screen.getByText('test click'));

    expect(callback).toHaveBeenCalledTimes(0);
  });
});
