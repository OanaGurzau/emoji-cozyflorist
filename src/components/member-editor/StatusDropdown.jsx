export default function StatusDropdown({
    status,
    setStatus
})
{
    return(
        <div className="space-y-2 mb-4">

            <label className="text-sm font-semibold text-[#21443B]">
              Status
            </label>

            <select value={status} onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-[#DDECCF] rounded-xl px-4 py-3 bg-white " >
              <option value="Eligible">Eligible</option>
              <option value="Waiting Period">Waiting Period</option>
              <option value="Discord Required">Discord Required</option>
            </select>

        </div>

    )
}
