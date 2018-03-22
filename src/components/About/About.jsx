import React, { Component } from "react";
import Cover from "../Cover/Cover";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import config from "../../../data/SiteConfig";
import "./About.css";

export default class About extends Component {

  render() {
    const { cover } = this.props;
    return (
      <div>
        <Cover cover={cover} fadein fixed />
        <Header />
        <div className="about">
          <h1>GUMLAB</h1>
          <h3>FROM OFFICES IN MELBOURNE AND SHANGHAI, GUMLAB WORKS WITH A BROAD RANGE OF CLIENTS IN THE ADVERTISING, BROADCAST, FILM AND ENTERTAINMENT INDUSTRIES.</h3>
          <h3>WE TAKE OUR WORK SERIOUSLY, BUT NOT OURSELVES. THIS ATTITUDE IS REFLECTED IN OUR WORKPLACE, WHERE WE STRIVE DAILY TO CREATE AN ENVIRONMENT THAT BREEDS A CULTURE OF EXCELLENCE, WHILE REMAINING FUN, COLLABORATIVE, AND EGO-FREE.</h3>
        </div>
        <Footer config={config} />
        <Cover cover={cover} fixed />
      </div>
    );
  }
}
