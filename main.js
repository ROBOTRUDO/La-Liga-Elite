import { teams } from "./data/teams.js";
import { players } from "./data/players.js";
import { matches } from "./data/matches.js";

const tableBody = document.querySelector("#table-body");
const playersContainer = document.querySelector("#players");
const matchesPast = document.querySelector("#matches-past");
const matchesUpcoming = document.querySelector("#matches-upcoming");

const formClass = (result) => {
  if (result === "W") return "win";
  if (result === "D") return "draw";
  if (result === "-") return "pending";
  return "loss";
};

const renderTable = () => {
  tableBody.innerHTML = "";

  teams
    .slice()
    .sort((a, b) => b.points - a.points)
    .forEach((team, index) => {
      const goalDiff = team.goalsFor - team.goalsAgainst;
      const row = document.createElement("div");
      row.className = "table-row";
      row.innerHTML = `
        <span>${index + 1}</span>
        <span class="club">
          <span class="club-badge">${team.short}</span>
          <span>${team.name}</span>
        </span>
        <span>${team.played}</span>
        <span>${team.wins}</span>
        <span>${team.draws}</span>
        <span>${team.losses}</span>
        <span>${team.goalsFor}</span>
        <span>${team.goalsAgainst}</span>
        <span>${goalDiff > 0 ? "+" : ""}${goalDiff}</span>
        <span class="points">${team.points}</span>
        <span class="form">
          ${team.form
            .map(
              (result) =>
                `<span class="${formClass(result)}">${result}</span>`
            )
            .join("")}
        </span>
      `;

      tableBody.appendChild(row);
    });
};

const renderPlayers = () => {
  playersContainer.innerHTML = "";
  players.forEach((player) => {
    const card = document.createElement("article");
    card.className = "player-card";
    card.innerHTML = `
      <h3>${player.name}</h3>
      <p>Equipo: ${player.team}</p>
      <p>Puntos: <strong>${player.points}</strong></p>
    `;
    playersContainer.appendChild(card);
  });
};

const renderMatches = () => {
  matchesPast.innerHTML = "";
  matchesUpcoming.innerHTML = "";

  matches.past.forEach((match) => {
    const item = document.createElement("article");
    item.className = "match-card";
    item.innerHTML = `
      <div>
        <p class="match-date">${match.date}</p>
        <p class="match-teams">${match.home} vs ${match.away}</p>
      </div>
      <span class="match-score">${match.score}</span>
    `;
    matchesPast.appendChild(item);
  });

  matches.upcoming.forEach((match) => {
    const item = document.createElement("article");
    item.className = "match-card upcoming";
    item.innerHTML = `
      <div>
        <p class="match-date">${match.date}</p>
        <p class="match-teams">${match.home} vs ${match.away}</p>
      </div>
      <span class="match-score">${match.time}</span>
    `;
    matchesUpcoming.appendChild(item);
  });
};

renderTable();
renderPlayers();
renderMatches();
