import React from 'react';

const AboutPage = () => {
  return (
    <div className="container">
      <main>
        <span>🐢 🐝 🐢</span>
        <div
          style={{ maxWidth: "75%", marginTop: "1rem", textAlign: "center" }}
        >
          Example app built with the <a href="https://create.t3.gg">T3 stack</a> to highlight how the following features work{" "}:
        </div>
        <ul>
          <li>auth</li>
          <li>tRPC</li>
          <li>serverless cron jobs</li>
        </ul>
        <div className="buttons" style={{ marginTop: '1rem' }}>
          <a
            className="button button-filled"
            href="https://wasp-lang.dev/docs"
            target="_blank"
            rel="noreferrer noopener"
          >
            Find More Tutorials
          </a>
          <a
            className="button button-outline"
            href="https://discord.com/invite/rzdnErX"
            target="_blank"
            rel="noreferrer noopener"
          >
            Chat on Discord
          </a>
        </div>
      </main>
    </div>
  );
};
export default AboutPage;
