import { Grid } from "@material-ui/core";
import { Breadcrumb } from "egret";
import React from "react";
import { Helmet } from "react-helmet";

const HomePage = ({ t }) => {
  const title = t('Dashboard.dashboard')
  return (
    <div className="analytics m-sm-30">
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}></Grid>
      </Grid>
    </div>
  );
}
export default HomePage;
