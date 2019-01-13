import React, { PureComponent } from "react";
import Page from "../Page";
import Header from "./Header";
import Content from "./Content";

export default class InfoView extends PureComponent {
  render() {
    return <Page Header={Header} Content={Content} />;
  }
}
