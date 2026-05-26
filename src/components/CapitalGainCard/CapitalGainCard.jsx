import { getNetGain, getRealisedGain } from "../../utils/calculation";

export default function CapitalGainCard({
  title,
  gains,
  blue = false,
  savings = 0,
}) {
  const shortTermNet = getNetGain(gains.stcg.profits, gains.stcg.losses);

  const longTermNet = getNetGain(gains.ltcg.profits, gains.ltcg.losses);

  const realised = getRealisedGain(gains);

  return (
    <div
      className={`
      rounded-3xl
      p-6
      shadow-lg
      transition-all
      duration-300

      ${blue ? "bg-blue-600 text-white" : "bg-slate-900 text-white"}
      `}
    >
      <h2 className="text-xl font-bold mb-6">{title}</h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Short Term */}

        <div>
          <h3 className="font-semibold mb-3">Short Term</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Profits</span>

              <span>₹{gains.stcg.profits.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Losses</span>

              <span>₹{gains.stcg.losses.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-semibold">
              <span>Net Gain</span>

              <span>₹{shortTermNet.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Long Term */}

        <div>
          <h3 className="font-semibold mb-3">Long Term</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Profits</span>

              <span>₹{gains.ltcg.profits.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Losses</span>

              <span>₹{gains.ltcg.losses.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-semibold">
              <span>Net Gain</span>

              <span>₹{longTermNet.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 mt-6 pt-6">
        <p className="text-sm opacity-80">Realised Capital Gains</p>

        <h1 className="text-3xl font-bold mt-2">₹{realised.toFixed(2)}</h1>
      </div>

      {savings > 0 && (
        <div
          className="
          mt-5
          rounded-xl
          bg-white/10
          px-4
          py-3
          text-yellow-300
          font-semibold
          "
        >
          🎉 You're going to save ₹{savings.toFixed(2)}
        </div>
      )}
    </div>
  );
}
