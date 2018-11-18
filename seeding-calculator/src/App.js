import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      initialSeed: "0",
      drawOdds: "",
      team1Odds: "",
      team2Odds: "",
      team1SeedingAmount: "",
      team2SeedingAmount: "",
      drawSeedingAmount: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value});
  }

  calculateNewSeedingAmounts() {
    let team1Prob = this.getImpliedPercentage(this.state.team1Odds);
    let team2Prob = this.getImpliedPercentage(this.state.team2Odds);
    let drawProb = this.getImpliedPercentage(this.state.drawOdds);
    let totalProb = team1Prob + team2Prob + drawProb;
    let overkill = totalProb - 100;
    if (overkill < 0) {
      overkill = 0;
    }
    if (this.state.drawOdds !== "") {
      // draw allowed
      let sub = overkill / 3;
      let team1SeedingAmount = (team1Prob - sub) / 100 * this.state.initialSeed;
      let team2SeedingAmount = (team2Prob - sub) / 100 * this.state.initialSeed;
      let drawSeedingAmount = (drawProb - sub) / 100 * this.state.initialSeed;
      return [team1SeedingAmount, team2SeedingAmount, drawSeedingAmount];
    } else {
      // no draw
      let sub = overkill / 2;
      let team1SeedingAmount = (team1Prob - sub) / 100 * this.state.initialSeed;
      let team2SeedingAmount = (team2Prob - sub) / 100 * this.state.initialSeed;
      return [team1SeedingAmount, team2SeedingAmount, 0];
    }
  }

  getImpliedPercentage(odds) {
    if (odds.includes("+")) {
      odds = odds.slice(1, odds.length);
      odds = Number(odds);
      return 10000 / (odds + 100);
    } else if (odds.includes("-")) {
      odds = odds.slice(1, odds.length);
      odds = Number(odds);
      return odds * 100 / (odds + 100);
    } else {
      return 0;
    }
  }

  render() {
    debugger;
    let seedingAmount = this.calculateNewSeedingAmounts();
    return (
      <div className="App">
        <div className="initial-seeding-amount">
          Initial Seed Amount
          <input name="initialSeed" onChange={this.handleChange} value={this.state.initialSeed} type="text" />
        </div>
        <div className="odds-row">
          <div className="odds-row-elt">
            Team 1 Implied Prob %:
            <input name="team1Odds" onChange={this.handleChange} value={this.state.team1Odds} type="text" />
          </div>
          <div>
            {`Amount to Seed ${seedingAmount[0]}`}
          </div>
        </div>
        <div className="odds-row">
          <div className="odds-row-elt">
            Team 2 Implied Prob %:
            <input name="team2Odds" onChange={this.handleChange} value={this.state.team2Odds} type="text" />
          </div>
          <div>
            {`Amount to Seed ${seedingAmount[1]}`}
          </div>
        </div>
        <div className="odds-row">
          <div className="odds-row-elt">
            Draw Implied Prob %: (leave blank if N/A):
            <input name="drawOdds" onChange={this.handleChange} value={this.state.drawOdds} type="text" />
          </div>
          <div>
           {`Amount to Seed ${seedingAmount[2]}`}
          </div>
        </div>
          
          
        
      </div>
    );
  }
}

export default App;
