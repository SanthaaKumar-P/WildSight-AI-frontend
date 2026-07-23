import { useEffect, useState } from "react";
import { 
    getDashboardSummary,
    getSpeciesDistribution,
    getCategoryDistribution
} from "../services/analyticsService";


function Analytics() {


    const [dashboard,setDashboard] = useState<any>(null);
    const [species,setSpecies] = useState<any[]>([]);
    const [categories,setCategories] = useState<any[]>([]);



    useEffect(()=>{


        getDashboardSummary()
        .then(res=>{
            console.log("Dashboard:",res.data);
            setDashboard(res.data);
        })
        .catch(err=>{
            console.error(err);
        });



        getSpeciesDistribution()
        .then(res=>{
            console.log("Species:",res.data);
            setSpecies(res.data);
        });



        getCategoryDistribution()
        .then(res=>{
            console.log("Categories:",res.data);
            setCategories(res.data);
        });



    },[]);




    return (

        <div className="p-8 space-y-8">


            <h1 className="text-3xl font-bold">
                Wildlife Analytics Dashboard 🐾
            </h1>



            {/* SUMMARY CARDS */}

            <div className="grid grid-cols-4 gap-5">


                <Card
                title="Observations"
                value={dashboard?.totalObservations}
                />


                <Card
                title="Images"
                value={dashboard?.totalImages}
                />


                <Card
                title="Audio"
                value={dashboard?.totalAudio}
                />


                <Card
                title="Species"
                value={dashboard?.totalSpecies}
                />


            </div>




            {/* DETECTION SUMMARY */}


            <div className="grid grid-cols-5 gap-5">


                <Card
                title="Birds"
                value={dashboard?.birdDetections}
                />


                <Card
                title="Mammals"
                value={dashboard?.mammalDetections}
                />


                <Card
                title="Reptiles"
                value={dashboard?.reptileDetections}
                />


                <Card
                title="Amphibians"
                value={dashboard?.amphibianDetections}
                />


                <Card
                title="Insects"
                value={dashboard?.insectDetections}
                />


            </div>




            {/* SPECIES LIST */}


            <div>

                <h2 className="text-xl font-bold mb-3">
                    Species Distribution
                </h2>


                {
                    species.map((s,index)=>(

                        <div 
                        key={index}
                        className="border p-3 rounded mb-2">

                            {s.species}
                            :
                            {s.count}

                        </div>

                    ))
                }


            </div>





            {/* CATEGORY LIST */}


            <div>

                <h2 className="text-xl font-bold mb-3">
                    Category Distribution
                </h2>


                {
                    categories.map((c,index)=>(

                        <div
                        key={index}
                        className="border p-3 rounded mb-2">

                            {c.category}
                            :
                            {c.count}

                        </div>

                    ))
                }


            </div>


        </div>

    );

}




function Card(
{
    title,
    value
}:{
    title:string;
    value:any;
}){


return (

<div className="
bg-white
shadow
rounded-xl
p-5
">

<h3 className="text-gray-500">
{title}
</h3>


<p className="text-3xl font-bold">
{value ?? 0}
</p>


</div>

)

}



export default Analytics;