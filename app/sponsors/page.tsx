import HeroSection from "@/components/HeroSection";
import SponsorTier from "@/components/SponsorTier";
import Footer from "@/components/ui/Footer";

export default function SponsorsPage() {
    // Tier Data
    const tierTitle = Array(2).fill({ name: "Name" });
    const tierGov = Array(8).fill({ name: "Name" });
    const tierSilver = Array(8).fill({ name: "Name" });
    const tierPronite = Array(8).fill({ name: "Name" });
    const tierInaugural = Array(8).fill({ name: "Name" });

    // Single Partner Categories
    const singlePartners = [
        "Platinum Partner",
        "Innovation Partner",
        "Career Partner",
        "Fitness Partner",
        "Hiring Partner",
        "Medical Partner",
        "Education Partner",
        "Cinema Partner",
        "Fun Partner",
        "Events Partner",
        "Associate Partner",
        "Official Merchandise Partner",
        "Motor Partner",
        "Media Partner",
        "Radio Partner",
        "Food Partner"
    ];

    return (
        <main className="bg-black text-white flex flex-col items-center min-h-screen w-full overflow-x-hidden">
            {/* HERO SECTION */}
            <HeroSection />

            {/* MAIN CONTENT CONTAINER */}
            <div className="w-full flex flex-col items-center gap-y-2 md:gap-y-6 pb-40">

                {/* 1. Title & Co Title (2 boxes) */}
                <SponsorTier
                    title="Title & Co Title"
                    desktopCols={2}
                    sponsors={tierTitle}
                />

                {/* 2. Government Partner (8 boxes) */}
                <SponsorTier
                    title="Government Partner"
                    desktopCols={4}
                    sponsors={tierGov}
                />

                {/* 3. Silver Partner (8 boxes) */}
                <SponsorTier
                    title="Silver Partner"
                    desktopCols={4}
                    sponsors={tierSilver}
                />

                {/* 4. Pronite Partner (8 boxes) */}
                <SponsorTier
                    title="Pronite Partner"
                    desktopCols={4}
                    sponsors={tierPronite}
                />

                {/* 5. Co-Title of Inaugural Night and Energy Partner (8 boxes) */}
                <SponsorTier
                    title="Co-Title of Inaugural Night and Energy Partner"
                    desktopCols={4}
                    sponsors={tierInaugural}
                />

                {/* 6. Single Slots (1 box each) */}
                <div className="flex flex-col items-center w-full mt-4 md:mt-8 gap-y-12 md:gap-y-16">
                    {singlePartners.map((category, index) => (
                        <div key={index} className="flex flex-col items-center w-full">
                            {/* Header */}
                            <div className="w-[200px] md:w-[260px] py-1.5 md:py-2 px-4 flex items-center justify-center 
                                          bg-[#1a1a1a] border border-[#4A4A4A] 
                                          text-white font-medium tracking-wide text-[14px] md:text-[16px] mb-8 md:mb-12 uppercase">
                                {category}
                            </div>

                            {/* Single Box - WHITE UPDATED */}
                            <div className="flex flex-col items-center">
                                <div className="w-[130px] h-[100px] md:w-[150px] md:h-[120px] 
                                              bg-white border border-[#333] 
                                              rounded-[6px] shadow-sm flex items-center justify-center overflow-hidden">
                                    {/* Placeholder */}
                                </div>

                                <div className="mt-3 md:mt-4 px-3 py-0.5 min-w-[80px] text-center
                                              bg-transparent border border-[#4A4A4A] rounded-[2px]">
                                    <p className="text-[10px] md:text-[12px] text-white/90 font-medium leading-tight">
                                        Name
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
