import {
    LucideIcon
} from "lucide-react";


interface BiodiversityCardProps {

    title:string;

    value:number|string;

    icon:React.ReactNode;

    color:string;

}



export default function BiodiversityCard({

    title,

    value,

    icon,

    color

}:BiodiversityCardProps){


    return (

        <div
        className="
        bg-white
        rounded-2xl
        shadow-md
        p-6
        flex
        items-center
        justify-between
        border
        hover:shadow-lg
        transition
        "
        >


            <div>


                <p
                className="
                text-gray-500
                text-sm
                font-medium
                "
                >

                    {title}

                </p>



                <h2
                className="
                text-3xl
                font-bold
                mt-2
                text-gray-800
                "
                >

                    {value}

                </h2>


            </div>




            <div
            className={`
            ${color}
            text-white
            p-4
            rounded-full
            `}
            >

                {icon}


            </div>



        </div>

    );

}