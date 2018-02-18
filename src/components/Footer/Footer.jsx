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
              <li><a href="tel:+8613918614393">+86 13918614393 (China)</a></li>
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
            <h4>SERVICE</h4>
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
                <a href="#" target="_blank">Facebook</a></li>
              <li>
                <a href="#" target="_blank">Behance</a></li>
              <li>
                <a href="#" target="_blank">Vimeo</a></li>
              <li>
                <a href="#" target="_blank">Instagram</a></li>
            </ul>
          </section>
        </div>
        <div className="copyright">{config.copyright || ""}</div>
      </footer>
    );
  }
}

export default Footer;
