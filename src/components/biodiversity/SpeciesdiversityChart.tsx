import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";



interface Props{

    data:any[];

}



export default function SpeciesDiversityChart({

    data

}:Props){


    return (

        <div
        className="
        bg-white
        rounded-2xl
        shadow-md
        p-6
        "
        >


            <h2
            className="
            text-xl
            font-bold
            mb-5
            "
            >

                🌱 Species Diversity Analysis

            </h2>



            <ResponsiveContainer
            width="100%"
            height={300}
            >


                <BarChart
                data={data}
                >


                    <CartesianGrid
                    strokeDasharray="3 3"
                    />


                    <XAxis
                    dataKey="speciesName"
                    />


                    <YAxis/>


                    <Tooltip/>


                    <Bar
                    dataKey="diversityScore"
                    fill="#16a34a"
                    />


                </BarChart>


            </ResponsiveContainer>


        </div>

    );

}