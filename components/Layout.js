import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './header';
import 'semantic-ui-css/semantic.min.css';

export default (props) => {
  return (
    <div>
      <Container>
        <Head>
          {/* <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
          ></link> */}
        </Head>
        <Header />
        {props.children}
      </Container>
    </div>
  );
};
