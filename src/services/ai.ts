import { api } from "@/services/api";
import type { Detection, ImageAIResult } from "@/components/ai/AIResult";

/* ================= IMAGE ================= */

interface RawDetection {
  species: string;
  confidence: number;
  boundingBox?: number[];

  animalId?: string;
  existingAnimal?: boolean;
  similarity?: number;

  behavior?: string;
  possibleBehaviors?: string[];

  endangered?: boolean;
  speciesStatus?: string;
  category?: string;
  protectionLevel?: string;
  scientificName?: string;
kingdom?: string;
phylum?: string;
class?: string;
order?: string;
family?: string;
genus?: string;
}

function normalizeDetections(data: RawDetection[]): Detection[] {
  return data.map((item) => ({
    species: item.species,

    confidence: item.confidence,

    bbox: item.boundingBox as
      | [number, number, number, number]
      | undefined,

    animalId: item.animalId,

    existingAnimal: item.existingAnimal,

    similarity: item.similarity,

    behavior: item.behavior,

    possibleBehaviors: item.possibleBehaviors,

    endangered: item.endangered,

    speciesStatus: item.speciesStatus,

    category: item.category,

    protectionLevel: item.protectionLevel,

    scientificName: item.scientificName,

kingdom: item.kingdom,

phylum: item.phylum,

class: item.class,

order: item.order,

family: item.family,

genus: item.genus,
  }));
}

export async function analyzeImage(
  file: File,
  originalUrl: string
): Promise<ImageAIResult> {
  const formData = new FormData();

  formData.append("file", file);

  // Temporary observation id
  formData.append("observationId", "1");

  const storedUser = localStorage.getItem("wildsight_user");

  let uploadedBy = "1";

  if (storedUser) {
    const user = JSON.parse(storedUser);

    uploadedBy = String(user.userId ?? user.id ?? 1);
  }

  formData.append("uploadedBy", uploadedBy);

  formData.append(
    "capturedAt",
    new Date().toISOString()
  );

  formData.append("imageQuality", "90");

  const start = performance.now();

  const { data } = await api.post(
    "/api/uploaded-images/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return {
    originalUrl,

    annotatedUrl: data.annotatedImage,

    detections: normalizeDetections(
      data.detections || []
    ),

    processingTimeMs: Math.round(
      performance.now() - start
    ),

    model: data.model || "YOLO + MobileNetV2",
  };
}

/* ================= AUDIO ================= */

export interface AudioAIResult {
  audioUrl: string;

  species: string;

  confidence: number;

  category?: string;

  soundType?: string;

  conservationStatus?: string;

  environmentNoise?: string;

  noiseFiltered?: boolean;

  detectedAt: string;

  status: "recognized" | "no_match";

  model: string;
}

export async function analyzeAudio(
  file: File,
  audioUrl: string
): Promise<AudioAIResult> {
  const formData = new FormData();

  formData.append("file", file);

  const { data } = await api.post(
    "/api/uploaded-audio/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return {
    audioUrl,

    species:
      data.species ||
      data.predictedSpecies ||
      "Unknown",

    confidence: data.confidence || 0,

    category: data.category,

    soundType: data.soundType,

    conservationStatus:
      data.conservationStatus,

    environmentNoise:
      data.environmentNoise,

    noiseFiltered:
      data.noiseFiltered,

    detectedAt:
      new Date().toISOString(),

    status: "recognized",

    model:
      data.model || "BirdNET + CNN",
  };
}