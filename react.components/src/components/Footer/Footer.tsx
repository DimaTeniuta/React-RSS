import React from 'react';
import classes from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.gitHub}>
          <a
            className={classes.gitHubLink}
            target="_blank"
            href="https://github.com/DimaTeniuta"
            rel="noreferrer"
          ></a>
        </div>
        <div className={classes.year}>2022</div>
        <div>
          <a
            className={classes.rssLink}
            target="_blank"
            href="https://rs.school/js/"
            rel="noreferrer"
          ></a>
        </div>
      </div>
    </footer>
  );
}
