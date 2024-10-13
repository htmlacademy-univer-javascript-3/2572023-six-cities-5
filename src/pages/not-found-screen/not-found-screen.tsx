const centerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  flexDirection: 'column',
};

export function NotFoundScreen(): JSX.Element {
  return (
    <div style={centerStyle}>
      <h1>404 Not Found</h1>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <p>Oops! Looks like you've hit a page that doesn't exist.</p>
      <a href="/">Go back to the main page</a>
    </div>
  );
}
