
const MobileFooter = () => {
  return (
    <div id="mobile-footer">
      <span style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>
        To see the source code, visit our{' '}
        <a
          href='https://github.com/wasp-lang/wasp/tree/main/examples'
          target='_blank'
          rel='noreferrer'
          style={{ color: '#fc0' }}
        >
          GitHub repo
        </a>
        .
      </span>
      <span style={{ marginLeft: '10px' }}>🚀</span>
    </div>
  );
};

export default MobileFooter;