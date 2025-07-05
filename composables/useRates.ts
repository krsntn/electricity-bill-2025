export const useRates = () => {
  return Object.freeze({
    Small: {
      EnergyCharges: 0.2703,
      CapacityCharges: 0.0455,
      NetworkCharges: 0.1285,
      RetailCharges: 10,
    },
    Big: {
      EnergyCharges: 0.3703,
      CapacityCharges: 0.0455,
      NetworkCharges: 0.1285,
      RetailCharges: 10,
    },
    Incentive: [
      { min: 1, max: 200, rate: 0.25 },
      { min: 201, max: 250, rate: 0.245 },
      { min: 251, max: 300, rate: 0.225 },
      { min: 301, max: 350, rate: 0.21 },
      { min: 351, max: 400, rate: 0.17 },
      { min: 401, max: 450, rate: 0.145 },
      { min: 451, max: 500, rate: 0.12 },
      { min: 501, max: 550, rate: 0.105 },
      { min: 551, max: 600, rate: 0.09 },
      { min: 601, max: 650, rate: 0.075 },
      { min: 651, max: 700, rate: 0.055 },
      { min: 701, max: 750, rate: 0.045 },
      { min: 751, max: 800, rate: 0.04 },
      { min: 801, max: 850, rate: 0.025 },
      { min: 851, max: 900, rate: 0.01 },
      { min: 901, max: 1000, rate: 0.005 },
    ],
  });
};
