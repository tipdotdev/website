import { Tailwind } from '@react-email/tailwind';
import React from 'react';
import config from '../../config';

export default function TwContainer(props:any) {
  return (
    <Tailwind
      config={config.tailwind as any}
    >
        {props.children}
    </Tailwind>
  );
};
