import React, { useState } from "react";
import Title from "../components/Title";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import data from "../components/prova.json";
import Button from "@mui/material/Button";
import ProgressBar from "../components/ProgressBar";
import BatteryTempChart from "../components/BatteryTempChart";
import Card from "@mui/material/Card";
// @ts-ignore
import Mappa from "../assets/MappaTmp.png";
import LapTime from "../components/LapTimesTable";

const commonPaperProps = {
  sx: {
    p: 2,
    display: "flex",
    flexDirection: "column",
    height: 200,
  },
  elevation: 3,
};

interface BatteryTemp {
  date: string;
  min: number;
  max: number;
  mean: number;
}

export default function Stats() {
  const barWidth = "250";
  const [percentage, setPercentage] = useState(0);
  const initialBatteryTempData: BatteryTemp[] = [];

  const handleFillProgressBar = () => {
    // Simulate progress by increasing the percentage
    if (percentage < 100) {
      setPercentage(percentage + 1);
    }
  };

  return (
    // @ts-ignore
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "400px",
              width: "100%",
            }}
          >
            <img src={Mappa} alt="RTLogo" className="RTLogo" />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "400px",
              width: "100%",
            }}
          >
            <h2>Lap Times</h2>
            <LapTime />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "300px",
              width: "100%",
            }}
          >
            <h2 color="primary">Battery Temperature Chart</h2>
            <BatteryTempChart initialData={initialBatteryTempData} />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "300px",
              width: "100%",
            }}
          ></Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "300px",
              width: "100%",
            }}
          >
            <h2 color="primary">Battery Temperature Chart</h2>
            <BatteryTempChart initialData={initialBatteryTempData} />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "300px",
              width: "100%",
            }}
          >
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "250px",
                width: "10%", // Imposta "100%" per coprire tutta la larghezza
              }}
            >
              <ProgressBar percentage={percentage} />
              <p>{`${percentage}%`}</p>
            </Paper>
            <Button variant="contained" onClick={handleFillProgressBar}>
              Fill
            </Button>
          </Card>
        </Grid>
      </Grid>

      {/*
            {data.items.map((item, index) => (
                <Grid key={index} item xs={12} md={4} lg={3}>
                    <Paper {...commonPaperProps}>
                        <Title>{item.title}</Title>
                        <Typography component="p" variant="h4">
                            {item.value}
                        </Typography>
                    </Paper>
                </Grid>
            ))}
            */}
    </React.Fragment>
  );
}
