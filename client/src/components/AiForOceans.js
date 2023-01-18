function AiForOceans() {
  const iframePart = () => {
    return {
      __html:
        '<iframe src="https://studio.code.org/s/oceans/lessons/1/levels/1" width=100%" height="100%"></iframe>',
    };
  };
  return (
    <>
      <div
        style={{
          margin: 'auto',
          position: 'relative',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
        }}
        dangerouslySetInnerHTML={iframePart()}
      />
    </>
  );
}

export default AiForOceans;
