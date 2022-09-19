# Odds Dashboard

Odds Dashboard is a single page application designed to show betting odds and scores in an easy to read format.

## Architecture

The project is built using a MERN stack (MongoDb, Express, React, Node);

To elaborate, React presents the frontend views to the user; the Node server backend uses Express as its api structure and stores data in MongoDb.

## Sports Data

All sports data (odds/scores/metadata) that is stored and presented to the user is fetched from 'the odds-api' (https://the-odds-api.com/).  This service provides sports betting data from bookmakers around the world.

### Data Freshness

We have multiple jobs running at different times to refresh our sports data.
- Games: runs daily to save future game data to our database
- Odds: runs daily to refresh existing odds data for games already in our database
- Scores: runs every minute whenever games are live

### Odds

In addition to showing the current score of a game, we show three different odds markets per game (if applicable): h2h (moneyline), spreads (points handicaps), totals (over/under).

### Supported Sports

Currently we support three sports: NFL, NCAAF, MLB.

## Backlog

### Features
- ability to choose which bookmaker's odds are displayed
- support for more sports

### Technical
- refactor backend db logic with dates/timezones
- refactor backend uri api logic