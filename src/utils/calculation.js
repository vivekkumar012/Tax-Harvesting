export const getNetGain = (profits, losses) =>
    profits - losses;

export const getRealisedGain = (capital) => {

    const st =
        getNetGain(
            capital.stcg.profits,
            capital.stcg.losses
        );

    const lt =
        getNetGain(
            capital.ltcg.profits,
            capital.ltcg.losses
        );

    return st + lt;
};

export const calculateHarvested = (
    base,
    selectedAssets
) => {

    const updated =
        JSON.parse(JSON.stringify(base));

    selectedAssets.forEach(asset => {

        const st = asset.stcg.gain;
        const lt = asset.ltcg.gain;

        if (st > 0)
            updated.stcg.profits += st;
        else
            updated.stcg.losses += Math.abs(st);

        if (lt > 0)
            updated.ltcg.profits += lt;
        else
            updated.ltcg.losses += Math.abs(lt);

    })

    return updated;

};