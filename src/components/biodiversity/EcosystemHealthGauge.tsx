import {
    Activity,
    HeartPulse
} from "lucide-react";


interface Props {

    ecosystemHealth:number;

    overallScore:number;

    status:string;

}



export default function EcosystemHealthGauge({

    ecosystemHealth,

    overallScore,

    status

}:Props){



    const getStatusColor = ()=>{

        if(status==="Healthy")
            return "text-green-600";


        if(status==="Moderate Concern")
            return "text-yellow-600";


        if(status==="Vulnerable")
            return "text-orange-600";


        return "text-red-600";

    };



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
            mb-6
            "
            >

                <HeartPulse
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

                    Ecosystem Health Monitoring

                </h2>


            </div>






            <div
            className="
            flex
            justify-center
            items-center
            "
            >



                <div
                className="
                w-48
                h-48
                rounded-full
                border-[18px]
                border-green-500
                flex
                flex-col
                justify-center
                items-center
                "
                >


                    <Activity
                    className="
                    text-green-600
                    w-8
                    h-8
                    "
                    />


                    <h1
                    className="
                    text-4xl
                    font-bold
                    mt-2
                    "
                    >

                        {ecosystemHealth}

                    </h1>


                    <span
                    className="
                    text-gray-500
                    "
                    >

                        /100

                    </span>


                </div>



            </div>






            <div
            className="
            mt-6
            space-y-3
            "
            >



                <div
                className="
                flex
                justify-between
                bg-gray-50
                rounded-xl
                p-4
                "
                >

                    <span>
                        Overall Biodiversity Score
                    </span>


                    <b>
                        {overallScore}
                    </b>


                </div>






                <div
                className="
                flex
                justify-between
                bg-gray-50
                rounded-xl
                p-4
                "
                >

                    <span>
                        Conservation Status
                    </span>


                    <b
                    className={getStatusColor()}
                    >

                        {status}

                    </b>


                </div>



            </div>



        </div>

    );

}