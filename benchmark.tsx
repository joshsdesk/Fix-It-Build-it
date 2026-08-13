import React from 'react';
import { renderToString } from 'react-dom/server';
import Services from './components/layout/Services';

const start = performance.now();
for(let i=0; i<10000; i++) {
   renderToString(<Services />);
}
const end = performance.now();
console.log(`Render time for 10000 renders: ${end - start}ms`);
