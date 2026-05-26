export const getCapitalGains = () =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                stcg: {
                    profits: 1540,
                    losses: 743
                },

                ltcg: {
                    profits: 1200,
                    losses: 650
                }
            });
        }, 500);
    });