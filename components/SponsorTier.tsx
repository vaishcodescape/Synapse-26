interface SponsorTierProps {
    title: string;
    sponsors: { name: string }[];
    desktopCols?: 2 | 4;
}

export default function SponsorTier({
    title,
    sponsors,
    desktopCols = 4,
}: SponsorTierProps) {

    // Grid configuration
    const gridCols =
        desktopCols === 2
            ? "grid-cols-2 md:grid-cols-2"
            : "grid-cols-2 md:grid-cols-4";

    return (
        <section className="w-full flex flex-col items-center mt-14 md:mt-20 mb-10 px-4">

            <div
                className="
                    inline-flex
                    px-5 md:px-7
                    py-2
                    border border-white/50
                    text-white
                    text-xs md:text-sm
                    font-medium
                    uppercase
                    whitespace-nowrap
                    tracking-[0.05em]
                    mx-auto
                    rounded-[2px]
                    mb-10
                "
            >
                {title}
            </div>

            <div
                className={`
                    grid
                    ${gridCols}
                    gap-x-6 md:gap-x-14
                    gap-y-10 md:gap-y-14
                    justify-items-center
                    w-full
                    max-w-[800px]
                    mx-auto
                `}
            >
                {sponsors.map((s, i) => (
                    <div key={i} className="flex flex-col items-center">

                        {/* Sponsor box */}
                        <div
                            className="
                                w-[130px] h-[100px]
                                md:w-[150px] md:h-[120px]
                                bg-white
                                border border-[#333]
                                rounded-[6px]
                                shadow-sm
                                flex items-center justify-center
                                overflow-hidden
                            "
                        ></div>

                        {/* Name plate */}
                        <div
                            className="
                                mt-3 md:mt-4
                                px-3 py-0.5
                                min-w-[80px]
                                text-center
                                bg-transparent
                                border border-[#4A4A4A]
                                rounded-[2px]
                            "
                        >
                            <p className="text-[10px] md:text-[12px] text-white/90 font-medium leading-tight">
                                {s.name || "Name"}
                            </p>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
}