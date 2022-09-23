import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="as">
          <a
            className="footer__gitHubLink"
            target="_blank"
            href="https://github.com/DimaTeniuta"
            rel="noreferrer"
          ></a>
        </div>
        <div className="footer__year">2022</div>
        <div>
          <a
            className="footer__rssLink"
            target="_blank"
            href="https://rs.school/js/"
            rel="noreferrer"
          ></a>
        </div>
      </div>
    </footer>
  );
}
