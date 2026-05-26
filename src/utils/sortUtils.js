export const sortHoldings = (
    data,
    field,
    order
) => {

    return [...data].sort((a, b) => {

        let first;
        let second;

        if (field === "shortTerm") {
            first = a.stcg.gain
            second = b.stcg.gain
        }

        else {
            first = a.ltcg.gain
            second = b.ltcg.gain
        }

        return order === "asc"
            ? first - second
            : second - first

    })

}