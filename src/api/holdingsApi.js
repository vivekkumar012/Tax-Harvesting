import holdings from "../mock/holding.json";

export const getHoldings = () =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(holdings)
        }, 500)
    })