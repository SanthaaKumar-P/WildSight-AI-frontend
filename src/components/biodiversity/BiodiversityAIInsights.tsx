import {
    Brain,
    Trees,
    ShieldCheck,
    Sparkles,
    TrendingUp
} from "lucide-react";


interface Props {

    diversityScore:number;

    habitatQuality:number;

    ecosystemHealth:number;

    status:string;

}



export default function BiodiversityAIInsights({

    diversityScore,

    habitatQuality,

    ecosystemHealth,

    status

}:Props){



    const biodiversityCondition =

        diversityScore >= 75

        ?

        "Biodiversity level is healthy with strong species diversity across monitored ecosystems."

        :

        "Biodiversity diversity is moderate. Additional conservation actions are recommended.";





    const habitatObservation =

        habitatQuality >= 75

        ?

        "Habitat conditions are suitable for supporting wildlife populations and maintaining ecosystem balance."

        :

        "Habitat degradation risk detected. Restoration activities should be prioritized.";





    const ecosystemObservation =

        ecosystemHealth >= 75

        ?

        "Ecosystem shows stable environmental conditions with good ecological resilience."

        :

        "Ecosystem stress detected. Increased monitoring is required.";





    const recommendation =

        status === "Healthy"

        ?

        "Continue regular biodiversity monitoring and maintain existing conservation strategies."

        :

        "Increase habitat restoration, species protection and ecological monitoring.";





    return (

        <div
        className="
        bg-white
        rounded-2xl
        shadow-md
        border
        p-6
        "
        >



            {/* Header */}

            <div
            className="
            flex
            items-center
            gap-3
            mb-6
            "
            >

                <Brain
                className="
                text-green-600
                w-8
                h-8
                "
                />


                <div>

                    <h2
                    className="
                    text-2xl
                    font-bold
                    "
                    >

                        AI Biodiversity Insights

                    </h2>


                    <p
                    className="
                    text-gray-500
                    text-sm
                    "
                    >

                        AI-generated ecosystem assessment based on biodiversity analytics.

                    </p>

                </div>


            </div>





            <div
            className="
            space-y-6
            "
            >



                {/* Biodiversity */}

                <div
                className="
                flex
                gap-4
                "
                >

                    <div
                    className="
                    bg-green-100
                    p-3
                    rounded-full
                    h-fit
                    "
                    >

                        <TrendingUp
                        className="
                        text-green-600
                        "
                        />

                    </div>


                    <div>

                        <h3
                        className="
                        font-semibold
                        text-lg
                        "
                        >

                            Biodiversity Status

                        </h3>


                        <p
                        className="
                        text-gray-600
                        mt-1
                        "
                        >

                            {biodiversityCondition}

                        </p>


                        <p
                        className="
                        text-sm
                        text-gray-500
                        mt-2
                        "
                        >

                            Diversity Score:
                            <b> {diversityScore}</b>

                        </p>


                    </div>


                </div>







                {/* Habitat */}

                <div
                className="
                flex
                gap-4
                "
                >

                    <div
                    className="
                    bg-blue-100
                    p-3
                    rounded-full
                    h-fit
                    "
                    >

                        <Trees
                        className="
                        text-blue-600
                        "
                        />

                    </div>


                    <div>

                        <h3
                        className="
                        font-semibold
                        text-lg
                        "
                        >

                            Habitat Assessment

                        </h3>


                        <p
                        className="
                        text-gray-600
                        mt-1
                        "
                        >

                            {habitatObservation}

                        </p>


                        <p
                        className="
                        text-sm
                        text-gray-500
                        mt-2
                        "
                        >

                            Habitat Quality:
                            <b> {habitatQuality}</b>

                        </p>


                    </div>


                </div>







                {/* Ecosystem */}

                <div
                className="
                bg-yellow-50
                border
                border-yellow-200
                rounded-xl
                p-5
                "
                >

                    <div
                    className="
                    flex
                    gap-2
                    items-center
                    mb-2
                    "
                    >

                        <Sparkles
                        className="
                        text-yellow-600
                        "
                        />


                        <h3
                        className="
                        font-semibold
                        "
                        >

                            AI Ecosystem Observation

                        </h3>


                    </div>


                    <p
                    className="
                    text-gray-700
                    "
                    >

                        {ecosystemObservation}

                    </p>


                </div>







                {/* Recommendation */}

                <div
                className="
                bg-green-50
                border
                border-green-200
                rounded-xl
                p-5
                "
                >

                    <div
                    className="
                    flex
                    items-center
                    gap-2
                    mb-2
                    "
                    >

                        <ShieldCheck
                        className="
                        text-green-600
                        "
                        />


                        <h3
                        className="
                        font-semibold
                        text-green-700
                        "
                        >

                            Conservation Recommendation

                        </h3>


                    </div>


                    <p
                    className="
                    text-gray-700
                    "
                    >

                        {recommendation}

                    </p>


                </div>



            </div>



        </div>

    );

}