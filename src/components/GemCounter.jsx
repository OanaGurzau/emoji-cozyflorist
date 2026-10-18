import Image from "next/image";

export default function GemCounter({
  icon,
  title,
  subtitle,
  subtitle2,
  value,
  setValue,
  max
}) {

  return (
    <div className="flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-3">

        <Image
          src={icon}
          alt={title}
          width={38}
          height={38}
          className="object-contain"
        />

        <div>
          <h4 className="font-semibold text-[#21443B] text-[15px]]">
            {title}
          </h4>

          <div className="flex items-center gap-3 text-xs text-[#7A8B83]">
              <p>{subtitle}</p>
              <span>•</span>
              <p>{subtitle2}</p>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        <button
          onClick={() =>
            setValue(prev => Math.max(0, prev - 1))
          }
          className="
            w-8
            h-8
            rounded-full
            border
            border-[#D8E6D1]
            bg-white
          "
        >
          -
        </button>

        <span className="w-5 text-center font-semibold">
          {value}
        </span>

        <button
          onClick={() =>
            setValue(prev => Math.min(max, prev + 1))
          }
          className="
            w-8
            h-8
            rounded-full
            border
            border-[#D8E6D1]
            bg-white
          "
        >
          +
        </button>

      </div>

    </div>
  );
}