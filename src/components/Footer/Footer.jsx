import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
  render() {
    const { config } = this.props;
    return (
      <footer className="footer">
        <div className="columns">
          <section>
            <h4>CONTACT</h4>
            <ul>
              <li><a href="mailto:info@gum-lab.com">info@gum-lab.com</a></li>
              <li><a href="tel:+61450507086">+61 4 5050 7086 (Australia)</a></li>
              <li><a href="tel:+8613918614393">+86 139 1861 4393 (China)</a></li>
            </ul>
            <address>
              <strong>GUMLAB</strong>
              Armadale,<br />
              Melbourne AUS
            </address>
            <address>
              Jingan Qu,<br />
              Shanghai China
            </address>
          </section>
          <section>
            <h4>SERVICES</h4>
            <ul>
              <li>Animation</li>
              <li>Motion Graphic</li>
              <li>Video Production</li>
              <li>Video Content</li>
              <li>Creative Direction</li>
              <li>Artistic Direction</li>
            </ul>
          </section>
          <section>
            <h4>FOLLOW</h4>
            <ul>
              <li>
                <a href="https://www.behance.net/gumlab" target="_blank" rel="noopener noreferrer">Behance</a>
              </li>
              <li>
                <a href="https://www.instagram.com/gumlab" target="_blank" rel="noopener noreferrer">Instagram</a>
              </li>
              <li>
                <a href="https://vimeo.com/gumlab" target="_blank" rel="noopener noreferrer">Vimeo</a>
              </li>
              <li>
                <a href="http://www.xinpianchang.com/gumlab" target="_blank" rel="noopener noreferrer">Xinpianchang</a>
              </li>
            </ul>
          </section>
        </div>
        <div className="copyright">{config.copyright || ""}</div>
      </footer>
    );
  }
}

export default Footer;
