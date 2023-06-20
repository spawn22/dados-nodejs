import IPlayers from "../interfaces/iPlayers";
import { Player } from "../models/Players";

class UpdatePlayerName {
  private id: string;
  private firsName: string;
  private lastName: string;

  constructor(id: string, firsName: string, lastName: string) {
    this.id = id;
    this.firsName = firsName;
    this.lastName = lastName;
  }

  async updatePlayerName() {
    const update = {
      firstName: this.firsName,
      lastName: this.lastName,
    };
    const player: IPlayers = await Player.findOneAndUpdate({_id: this.id}, update) as IPlayers;
    return player;
  }
}

export default UpdatePlayerName;
