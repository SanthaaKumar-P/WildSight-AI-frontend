import { motion } from 'framer-motion';
import { CheckCircle2, Cpu, Target, Timer, ImageIcon } from 'lucide-react';

export interface Detection {
  id?: string | number;
  species: string;
  scientificName?: string;
  confidence: number;
  bbox?: [number, number, number, number];
  thumbnail?: string;
  animalId?: string;
  existingAnimal?: boolean;
  similarity?: number;
}

export interface ImageAIResult {
  originalUrl: string;
  annotatedUrl?: string;
  detections: Detection[];
  processingTimeMs?: number;
  model?: string;
}

function ConfidenceBar({value}:{value:number}){
 const pct=value>1?Math.round(value):Math.round(value*100);
 return <div className="flex gap-2 items-center">
 <div className="flex-1 h-2 bg-muted rounded overflow-hidden">
 <motion.div initial={{width:0}} animate={{width:`${pct}%`}} className="h-full bg-primary"/>
 </div><span>{pct}%</span></div>
}

export function AIResult({result}:{result:ImageAIResult}){
 return <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-5">
 <div className="glass rounded-3xl p-5">
 <CheckCircle2 className="inline text-success"/> Detection complete
 <span className="ml-4"><Cpu className="inline h-4"/> {result.model}</span>
 <span className="ml-4"><Timer className="inline h-4"/> {result.processingTimeMs} ms</span>
 </div>

 <div className="grid md:grid-cols-2 gap-4">
 <img src={result.originalUrl} className="w-full max-h-96 object-contain"/>
 {result.annotatedUrl?<img src={result.annotatedUrl} className="w-full max-h-96 object-contain"/>:<div>No annotated image</div>}
 </div>

 <div className="grid md:grid-cols-3 gap-4">
 {result.detections.map((d,i)=><div key={i} className="glass rounded-xl p-4">
 <ImageIcon/>
 <h3 className="font-bold">{d.species}</h3>
 <p>Animal ID: <b>{d.animalId||'Not Identified'}</b></p>
 <p>{d.existingAnimal?'Existing Animal Found':'New Animal Identified'}</p>
 {d.similarity!==undefined&&<p>Similarity: {d.similarity}%</p>}
 <ConfidenceBar value={d.confidence}/>
 <p className="text-xs">bbox: {d.bbox?.join(', ')}</p>
 </div>)}
 </div>

 <table className="w-full text-sm glass">
 <thead><tr><th>#</th><th>Species</th><th>Animal ID</th><th>Status</th><th>Confidence</th></tr></thead>
 <tbody>{result.detections.map((d,i)=><tr key={i}>
 <td>{i+1}</td><td>{d.species}</td><td>{d.animalId||'-'}</td>
 <td>{d.existingAnimal?'Existing':'New'}</td><td><ConfidenceBar value={d.confidence}/></td>
 </tr>)}</tbody>
 </table>
 </motion.div>
}
