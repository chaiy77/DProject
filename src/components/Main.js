import React, { useState } from 'react';

import pngImg from 'assets/images/pngImg.png';
import jpgImg from 'assets/images/jpgImg.jpg';
import svgImg from 'assets/images/svgImg.svg';

import { Flex } from '../common/components/base';

const Main = () => {
  const [count, setCount] = useState(0);

  return (
    <Flex
      height="100%"
      width="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      alignSelf="center"
    >
      <div style={{ fontSize: 24, fontWeight: 'bold' }}>
        The spectacle before us was indeed sublime
      </div>
      <div style={{ margin: '40px 0' }}>
        {count}
        <button
          type="button"
          onClick={() => {
            setCount(count + 1);
          }}
          style={{ width: '120px', height: '44px', margin: '0 24px' }}
        >
          Add
        </button>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '40px 0',
          width: '100%',
        }}
      >
        <img
          src={pngImg}
          alt="png"
          height="120px"
          width="120px"
          style={{ margin: '0 14px' }}
        />
        <img
          src={jpgImg}
          alt="png"
          height="120px"
          width="120px"
          style={{ margin: '0 14px' }}
        />
        <img
          src={svgImg}
          alt="png"
          height="120px"
          width="120px"
          style={{ margin: '0 14px' }}
        />
      </div>
    </Flex>
  );
};

export default Main;
