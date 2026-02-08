from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, Iterable, List, Tuple


@dataclass
class TeamStats:
    name: str
    played: int = 0
    wins: int = 0
    draws: int = 0
    losses: int = 0
    goals_for: int = 0
    goals_against: int = 0
    points: int = 0

    def goal_difference(self) -> int:
        return self.goals_for - self.goals_against


MatchResult = Tuple[str, int, int, str]


def _ensure_team(teams: Dict[str, TeamStats], name: str) -> TeamStats:
    if name not in teams:
        teams[name] = TeamStats(name=name)
    return teams[name]


def apply_match_result(teams: Dict[str, TeamStats], result: MatchResult) -> None:
    home_team, home_goals, away_goals, away_team = result
    home = _ensure_team(teams, home_team)
    away = _ensure_team(teams, away_team)

    home.played += 1
    away.played += 1
    home.goals_for += home_goals
    home.goals_against += away_goals
    away.goals_for += away_goals
    away.goals_against += home_goals

    if home_goals > away_goals:
        home.wins += 1
        away.losses += 1
        home.points += 3
    elif home_goals < away_goals:
        away.wins += 1
        home.losses += 1
        away.points += 3
    else:
        home.draws += 1
        away.draws += 1
        home.points += 1
        away.points += 1


def build_table(results: Iterable[MatchResult]) -> List[TeamStats]:
    teams: Dict[str, TeamStats] = {}
    for result in results:
        apply_match_result(teams, result)

    return sorted(
        teams.values(),
        key=lambda team: (team.points, team.goal_difference(), team.goals_for),
        reverse=True,
    )


def format_table(table: Iterable[TeamStats]) -> str:
    header = (
        "Equipo | PJ | G | E | P | GF | GC | DG | Pts\n"
        "------ | -- | - | - | - | -- | -- | -- | ---"
    )
    rows = []
    for team in table:
        rows.append(
            f"{team.name} | {team.played} | {team.wins} | {team.draws} | "
            f"{team.losses} | {team.goals_for} | {team.goals_against} | "
            f"{team.goal_difference()} | {team.points}"
        )
    return "\n".join([header, *rows])
