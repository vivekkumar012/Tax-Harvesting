import { useMemo } from "react";
import {
    calculateHarvested,
    getRealisedGain
}
    from "../utils/calculation";

export default function useHarvestCalculation(
    capital,
    holdings,
    selected
) {

    return useMemo(() => {

        const selectedAssets =
            holdings.filter(
                item => selected.includes(item.coin)
            )

        const harvested =
            calculateHarvested(
                capital,
                selectedAssets
            )

        const before =
            getRealisedGain(capital)

        const after =
            getRealisedGain(harvested)

        return {

            harvested,

            before,

            after,

            savings:
                before > after
                    ? before - after
                    : 0

        }

    }, [
        capital,
        holdings,
        selected
    ])

}