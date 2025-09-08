import React from 'react';

function Layout({ children }: { children: React.ReactNode }): JSX.Element {
  return <main className="weather-app wrapper">{children}</main>;
}

export default Layout;
