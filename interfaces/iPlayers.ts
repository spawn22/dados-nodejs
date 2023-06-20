interface IPlayers {
  save(): string;
  _id: string;
  firstName: string;
  lastName: string;
  email: string | any;
  password: string | any;
  date: string;
  totalGames: number;
  gamesWon: number;
  winRate: number;
  playHistory: [];
}

export default IPlayers;
