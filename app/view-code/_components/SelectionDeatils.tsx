import React from "react";
import Image from "next/image";
import { RECORD } from "../[uid]/page";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Props {
  record: RECORD | null | undefined;
}

function SelectionDeatils({ record }: Props) {
  const imageSrc = record?.imageUrl?.trim();

  if (!imageSrc) {
    return <p className="text-gray-500 italic">No image available</p>;
  }

  return (
  <div className="p-5 bg-gray-100 h-[80vh] rounded-lg" >
    <h2 className="font-bold my-2">Wireframe :</h2>
      <Image
      src={imageSrc}
      alt="Generated UI Preview"
      width={500}
      height={300}
      className="rounded-lg object-contain h-[200px] w-full border border-dashed p-2 bg-white"
    />
    <h2 className=" font-bold  mt-4 mb-2">AI Model </h2>
    <Input defaultValue={record?.model}  disabled={true} className="bg-white"/>
     <h2 className=" font-bold  mt-4 mb-2">Description </h2>
    <Textarea defaultValue={record?.description}  disabled={true} className="bg-white h-[180px]"/>
   <Button>Regenerate Code</Button>
  </div>
  );
}

export default SelectionDeatils;
