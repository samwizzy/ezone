import React from 'react';
import { CircularProgress } from '@material-ui/core';
import Container from './Container';
import Circle from './Circle';
import Wrapper from './Wrapper';

const LoadingIndicator = () => (
  <Wrapper>
    <Circle />
    <Circle rotate={30} delay={-1.1} />
    <Circle rotate={60} delay={-1} />
    <Circle rotate={90} delay={-0.9} />
    <Circle rotate={120} delay={-0.8} />
    <Circle rotate={150} delay={-0.7} />
    <Circle rotate={180} delay={-0.6} />
    <Circle rotate={210} delay={-0.5} />
    <Circle rotate={240} delay={-0.4} />
    <Circle rotate={270} delay={-0.3} />
    <Circle rotate={300} delay={-0.2} />
    <Circle rotate={330} delay={-0.1} />
  </Wrapper>
);

export const CircleLoader = () => (
  <Container>
    <CircularProgress thickness={2.0} />
  </Container>
);

export default CircleLoader;
