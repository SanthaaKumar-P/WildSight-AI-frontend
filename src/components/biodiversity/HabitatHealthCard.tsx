import {
    Trees,
    ShieldCheck,
    AlertTriangle
} from "lucide-react";


interface Props {

    averageQuality:number;

    healthyCount:number;

    vulnerableCount:number;

    criticalCount:number;

}



export default function HabitatHealthCard({

    averageQuality,

    healthyCount,

    vulnerableCount,

    criticalCount

}:Props){


    return (

        <div
        className="
        bg-white
        rounded-2xl
        shadow-md
        p-6
        border
        "
        >


            <div
            className="
            flex
            items-center
            gap-3
            mb-5
            "
            >

                <Trees
                className="
                text-green-600
                w-7
                h-7
                "
                />


                <h2
                className="
                text-xl
                font-bold
                "
                >

                    Habitat Health Assessment

                </h2>


            </div>




            <div
            className="
            grid
            grid-cols-2
            gap-4
            "
            >


                <div
                className="
                bg-green-50
                rounded-xl
                p-4
                "
                >

                    <p
                    className="
                    text-gray-500
                    text-sm
                    "
                    >

                        Habitat Quality

                    </p>


                    <h3
                    className="
                    text-3xl
                    font-bold
                    text-green-700
                    "
                    >

                        {averageQuality}%

                    </h3>


                </div>





                <div
                className="
                bg-blue-50
                rounded-xl
                p-4
                "
                >

                    <p
                    className="
                    text-gray-500
                    text-sm
                    "
                    >

                        Healthy

                    </p>


                    <h3
                    className="
                    text-3xl
                    font-bold
                    text-blue-700
                    "
                    >

                        {healthyCount}

                    </h3>


                </div>



            </div>






            <div
            className="
            mt-5
            space-y-3
            "
            >


                <div
                className="
                flex
                items-center
                justify-between
                bg-yellow-50
                p-3
                rounded-lg
                "
                >

                    <div
                    className="
                    flex
                    gap-2
                    items-center
                    "
                    >

                        <AlertTriangle
                        className="
                        text-yellow-600
                        "
                        />

                        <span>
                            Vulnerable
                        </span>

                    </div>


                    <b>
                        {vulnerableCount}
                    </b>


                </div>





                <div
                className="
                flex
                items-center
                justify-between
                bg-red-50
                p-3
                rounded-lg
                "
                >

                    <div
                    className="
                    flex
                    gap-2
                    items-center
                    "
                    >

                        <ShieldCheck
                        className="
                        text-red-600
                        "
                        />


                        <span>
                            Critical
                        </span>


                    </div>


                    <b>
                        {criticalCount}
                    </b>


                </div>



            </div>



        </div>

    );

}