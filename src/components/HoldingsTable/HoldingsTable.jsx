import { useMemo, useState } from "react";

export default function HoldingsTable({
  data,
  selected,
  setSelected,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
}) {
  const [showAll, setShowAll] = useState(false);

  const toggle = (coin) => {
    setSelected((prev) =>
      prev.includes(coin) ? prev.filter((x) => x !== coin) : [...prev, coin],
    );
  };

  const toggleSort = (field) => {
    if (field === sortField) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));

      return;
    }

    setSortField(field);

    setSortOrder("asc");
  };

  const allSelected = selected.length === data.length;

  const visibleData = useMemo(() => {
    return showAll ? data : data.slice(0, 6);
  }, [showAll, data]);

  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-md
      p-4
      "
    >
      {/* Heading */}

      <h2
        className="
        text-xl
        font-semibold
        mb-4
        "
      >
        Holdings
      </h2>

      <div
        className="
        overflow-x-auto
        "
      >
        <table
          className="
          w-full
          min-w-[950px]
          "
        >
          {/* Header */}

          <thead>
            <tr
              className="
              bg-slate-100
              text-gray-700
              text-sm
              "
            >
              <th className="p-4">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={() => {
                    if (allSelected) {
                      setSelected([]);

                      return;
                    }

                    setSelected(data.map((x) => x.coin));
                  }}
                />
              </th>

              <th className="text-left py-4">Asset</th>

              <th>Holdings</th>

              <th>Current Price</th>

              <th
                onClick={() => toggleSort("shortTerm")}
                className="
                cursor-pointer
                "
              >
                Short Term
                {sortField === "shortTerm" &&
                  (sortOrder === "asc" ? " ↑" : " ↓")}
              </th>

              <th
                onClick={() => toggleSort("longTerm")}
                className="
                cursor-pointer
                "
              >
                Long Term
                {sortField === "longTerm" &&
                  (sortOrder === "asc" ? " ↑" : " ↓")}
              </th>

              <th>Amount To Sell</th>
            </tr>
          </thead>

          {/* BODY */}

          <tbody>
            {visibleData.map((item) => {
              const checked = selected.includes(item.coin);

              return (
                <tr
                  key={item.coin}
                  className="
                    border-b
                    hover:bg-blue-50
                    transition
                    "
                >
                  {/* Checkbox */}

                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(item.coin)}
                    />
                  </td>

                  {/* Coin */}

                  <td>
                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        "
                    >
                      <img
                        src={item.logo}
                        alt={item.coin}
                        className="
                          h-8
                          w-8
                          rounded-full
                          "
                      />

                      <div>
                        <p
                          className="
                           font-semibold
                           "
                        >
                          {item.coin}
                        </p>

                        <p
                          className="
                           text-xs
                           text-gray-500
                           "
                        >
                          {item.coinName}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Holdings */}

                  <td>
                    <p>{item.totalHolding?.toFixed(4)}</p>

                    <p
                      className="
                        text-xs
                        text-gray-400
                        "
                    >
                      Avg ₹{item.averageBuyPrice?.toFixed(2)}
                    </p>
                  </td>

                  {/* Current */}

                  <td>₹{item.currentPrice?.toLocaleString()}</td>

                  {/* STCG */}

                  <td
                    className={
                      item.stcg.gain >= 0 ? "text-green-600" : "text-red-500"
                    }
                  >
                    ₹{Math.abs(item.stcg.gain).toFixed(2)}
                  </td>

                  {/* LTCG */}

                  <td
                    className={
                      item.ltcg.gain >= 0 ? "text-green-600" : "text-red-500"
                    }
                  >
                    ₹{Math.abs(item.ltcg.gain).toFixed(2)}
                  </td>

                  {/* Sell */}

                  <td>{checked ? item.totalHolding?.toFixed(4) : "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* VIEW ALL */}

      {data.length > 6 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="
          mt-4
          text-blue-600
          font-medium
          hover:underline
          "
        >
          {showAll ? "Show Less" : "View All"}
        </button>
      )}
    </div>
  );
}
