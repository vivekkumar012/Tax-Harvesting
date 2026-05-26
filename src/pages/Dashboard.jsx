import { useEffect, useMemo, useState } from "react";

import { getCapitalGains } from "../api/capitalGainsApi";

import { getHoldings } from "../api/holdingsApi";

import CapitalGainCard from "../components/CapitalGainCard/CapitalGainCard";

import HoldingsTable from "../components/HoldingsTable/HoldingsTable";

import TaxHarvestInfo from "../components/TaxHarvestInfo/TaxHarvestInfo";

import useHarvestCalculation from "../hooks/useHarvestCalculation";

export default function Dashboard() {
  const [capital, setCapital] = useState(null);

  const [holdings, setHoldings] = useState([]);

  const [selected, setSelected] = useState([]);

  const [sortField, setSortField] = useState("");

  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    async function loadData() {
      try {
        const [capitalData, holdingsData] = await Promise.all([
          getCapitalGains(),
          getHoldings(),
        ]);

        setCapital(capitalData);

        setHoldings(holdingsData);
      } catch (error) {
        console.log(error);
      }
    }

    loadData();
  }, []);

  const sortedData = useMemo(() => {
    if (!sortField) return holdings;

    return [...holdings].sort((a, b) => {
      const first = sortField === "shortTerm" ? a.stcg.gain : a.ltcg.gain;

      const second = sortField === "shortTerm" ? b.stcg.gain : b.ltcg.gain;

      return sortOrder === "asc" ? first - second : second - first;
    });
  }, [holdings, sortField, sortOrder]);

  const harvest = useHarvestCalculation(
    capital || {
      stcg: {
        profits: 0,
        losses: 0,
      },

      ltcg: {
        profits: 0,
        losses: 0,
      },
    },

    holdings,

    selected,
  );

  if (!capital) {
    return (
      <div
        className="
       min-h-screen
       flex
       justify-center
       items-center
       "
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      className="
     max-w-7xl
     mx-auto
     px-4
     py-6
     "
    >
      <div
        className="
       mb-4
       "
      >
        <h1
          className="
         text-3xl
         font-bold
         "
        >
          Tax Harvesting
        </h1>

        <p
          className="
         text-blue-600
         text-sm
         mt-1
         "
        >
          How it works?
        </p>
      </div>

      <TaxHarvestInfo />

      <div
        className="
       grid
       lg:grid-cols-2
       gap-6
       mb-8
       "
      >
        <CapitalGainCard title="Pre Harvesting" gains={capital} />

        <CapitalGainCard
          title="After Harvesting"
          gains={harvest.harvested}
          blue
          savings={harvest.savings}
        />
      </div>

      <HoldingsTable
        data={sortedData}
        selected={selected}
        setSelected={setSelected}
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
    </div>
  );
}
