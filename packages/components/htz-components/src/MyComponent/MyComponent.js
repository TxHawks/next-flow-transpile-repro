// @flow
import React, { useState, } from 'react';
import type { Node, } from 'react';

type PropTypes = {
  initialCount: number,
};

MyComponent.defaultProps = { initialCount: 0, };

export default function MyComponent({ initialCount, }: PropTypes): Node {
  const [ count, setCount, ] = useState(initialCount);

  return (
    <section
      style={{
        alignItems: 'center',
        backgroundColor: '#ddd',
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
        width: '100%',
      }}
    >
      <div
        style={{
          alignItems: 'center',
          backgroundColor: '#fff',
          color: '#444',
          display: 'flex',
          flexBasis: '50%',
          flexGrow: 0,
          flexShrink: 0,
          fontFamily: 'sans-serif',
          fontSize: '36px',
          height: '50%',
          justifyContent: 'center',
          lineHeight: 1.2,
        }}
      >
        {count === 0
          ? 'You never clicked '
          : count === 1
            ? 'You clicked once '
            : `You clicked ${count} times `}
        <button type="button" onClick={() => setCount(count + 1)}>
          CLICK ME
        </button>
      </div>
    </section>
  );
}
