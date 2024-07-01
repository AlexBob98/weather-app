import React from 'react';

function Layout({ children }: {children: JSX.Element}): JSX.Element {
  return <main className="weather-app wrapper">{children}</main>;
}

export default Layout;
