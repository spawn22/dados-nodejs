export const rollDices = () => {
    const dice1: number = Math.floor(Math.random() * 6) + 1;
    const dice2: number = Math.floor(Math.random() * 6) + 1;
    const veredict: string = dice1 + dice2 === 7 ? 'win' : 'lose';

    return {
        dice1,
        dice2,
        rollScore: dice1 + dice2,
        veredict
    }
}