import { api } from "@/services/api";
import type { Detection, ImageAIResult } from "@/components/ai/AIResult";


interface RawDetection {

    species: string;

    confidence: number;

    boundingBox?: number[];

}



function normalizeDetections(
    data: RawDetection[]
): Detection[] {

    return data.map((item)=>({

        species:item.species,

        confidence:item.confidence,

        bbox:item.boundingBox as [
            number,
            number,
            number,
            number
        ]

    }));

}




export async function analyzeImage(

    file:File,

    originalUrl:string

):Promise<ImageAIResult>{



    const formData = new FormData();



    // FILE

    formData.append(
        "file",
        file
    );



    // TEMP OBSERVATION ID
    // change later when observation page is connected

    formData.append(
        "observationId",
        "1"
    );



    // GET LOGGED USER

    const storedUser =
        localStorage.getItem(
            "wildsight_user"
        );


    let uploadedBy = "1";


    if(storedUser){

        const user =
        JSON.parse(storedUser);


        uploadedBy =
        user.userId ||
        user.id ||
        "1";

    }



    formData.append(
        "uploadedBy",
        uploadedBy
    );



    formData.append(
        "capturedAt",
        new Date().toISOString()
    );



    formData.append(
        "imageQuality",
        "90"
    );




    const start =
    performance.now();




    const {data}=await api.post(

        "/api/uploaded-images/upload",

        formData,

        {

            headers:{

                "Content-Type":
                "multipart/form-data"

            }

        }

    );



    return {


        originalUrl,



        annotatedUrl:
        data.annotatedImage ||
        undefined,



        detections:
        normalizeDetections(
            data.detections || []
        ),



        processingTimeMs:

        Math.round(
            performance.now()-start
        ),



        model:

        data.model ||
        "YOLO + MobileNet"

    };

}





// ================= AUDIO =================



export interface AudioAIResult{


    audioUrl:string;

    species:string;

    confidence:number;

    detectedAt:string;

    status:
    "recognized" |
    "no_match";

    model:string;

}



export async function analyzeAudio(

file:File,

audioUrl:string

):Promise<AudioAIResult>{



    const formData =
    new FormData();



    formData.append(
        "file",
        file
    );



    const {data}=await api.post(

        "/api/uploaded-audio/upload",

        formData,

        {

            headers:{

                "Content-Type":
                "multipart/form-data"

            }

        }

    );



    return {


        audioUrl,


        species:
        data.species ||
        data.predictedSpecies ||
        "Unknown",



        confidence:
        data.confidence || 0,



        detectedAt:
        new Date()
        .toISOString(),



        status:
        "recognized",



        model:
        data.model ||
        "BirdNET"

    };

}