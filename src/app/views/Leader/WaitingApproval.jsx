import { Grid, Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import Waiting from "./Waiting";
import WaitingSalaryIncrease from "./WaitingSalaryIncrease";
import WaitingPropose from "./WaitingPropose";
import WaitingPromote from "./WaitingPromote";

const WaitingApproval = ({ t }) => {
    const [tabApproval, setTabApproval] = useState(1);

    const handleChangeTab = (e, newTab) => {
        setTabApproval(newTab);
    };

    return (
        <div className="analytics m-sm-30">
            <Grid container spacing={2} justify="space-between">
                <Grid item xs={12}>
                    <Tabs
                        value={tabApproval}
                        onChange={handleChangeTab}
                        variant="fullWidth"
                        indicatorColor="primary"
                    >
                        <Tab value={1} label="Chờ duyệt" />
                        <Tab value={2} label="Chờ duyệt tăng lương" />
                        <Tab value={3} label="Chờ duyệt đề xuất" />
                        <Tab value={4} label="Chờ duyệt thăng chức" />
                    </Tabs>
                </Grid>
                <Grid item xs={12}>
                    {tabApproval === 1 ? (
                        <Waiting />
                    ) : tabApproval === 2 ? (
                        <WaitingSalaryIncrease />
                    ) : tabApproval === 3 ? (
                        <WaitingPropose />
                    ) : (
                        tabApproval === 4 && <WaitingPromote />
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

export default WaitingApproval;
