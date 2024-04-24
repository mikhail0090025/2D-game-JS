var currentGame;

const MetalOrePropability = 0.05; // Propability that stone will be replaced by metal ore while generating map
const GoldOrePropability = 0.00005; // Propability that stone will be replaced by gold ore while generating map
const StartWorldHeight = 12;
const ChanceChangeHeight = 0.4;
const MinGroundHeight = 5;
const MaxGroundHeight = 20;
const MaxAvailableHeight = 30; // Max available height for blocks
const blockSize = 12;