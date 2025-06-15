"use client";
import { CloudUpload, Loader2Icon, WandSparkles, X } from "lucide-react";
import React, { ChangeEvent, useContext } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import Constants from "@/data/Constants";

//@ts-ignore
import uuid4 from "uuid4";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/configs/firebaseConfig";
import { useAuthContext } from "@/app/provider";
import { useRouter } from "next/navigation"; // ✅ Correct for app/


function ImageUpload() {

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<any>();
  const [model, setModel] = useState<string>();
  const [description, setDescription] = useState<string>();
  const { user } = useAuthContext();
  const router=useRouter();
  const[loading,setLoading]=useState(false);
  const OnImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      console.log(files[0]);
      const imageUrl = URL.createObjectURL(files[0]);
      setFile(files[0]);
      setPreviewUrl(imageUrl);
    }
  };
  const OnConvertToCodeButtonClick = async () => {
    console.log("User from context:", user);
    console.log("User email:", user?.email);

    if (!file || !model || !description || !user?.email) {
      alert("Please make sure all fields are filled and you are logged in.");
      return;
    }
    const uid = uuid4();
    try {
      // Save image to Firebase
      setLoading(true);

      const fileName = Date.now() + ".png";
      const imageRef = ref(storage, "Wireframe_To_Code/" + fileName);
      await uploadBytes(imageRef, file);
      console.log("Image Uploaded...");

      const imageUrl = await getDownloadURL(imageRef);
      console.log("Image URL:", imageUrl);

      // Generate unique ID
      // const uid = uuid4();

      // Log data before sending
      const payload = {
        uid,
        description,
        imageUrl,
        model,
        email: user?.email,
      };
      console.log("Sending payload:", payload);

      // Send data to API
      const result = await axios.post("/api/wireframe-to-code", payload);

      // Log server response
      console.log("Server Response:", result.data);
    } catch (error: any) {
      console.error(
        "Error during POST request:",
        error.response?.data || error.message
      );
    }
    setLoading(false);
    router.push('/view-code/'+uid);
  };

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1  md:grid-cols-2 gap-10">
        {!previewUrl ? (
          <div className="p-7 border border-dashed rounded-md shadow-md flex flex-col items-center justify-center">
            <CloudUpload className="h-10 w-10" />

            <h2 className="font-bold text-lg">Upload Image</h2>
            <p className="text-gray-400">
              Click Button to Select Wireframe Image
            </p>
            <div className="p-5 border border-dashed w-full flex mt-7 justify-center">
              <label htmlFor="imageSelect">
                <h2 className="p-2 bg-primary text-white rounded-md px-5">
                  Select Image
                </h2>
              </label>
            </div>
            <input
              type="file"
              id="imageSelect"
              className="hidden"
              multiple={false}
              onChange={OnImageSelect}
            />
          </div>
        ) : (
          <div className="p-5 border border-dashed">
            <Image
              src={previewUrl}
              alt="preview"
              width={500}
              height={500}
              className="w-full h-[300px] object-contain"
            />
            <X
              className="flex justify-end w-full cursor-pointer"
              onClick={() => setPreviewUrl(null)}
            />
          </div>
        )}

        <div className="p-7 border shadow-md rounded-lg">
          <h2 className="font-bold text-lg">Select your AI Model </h2>
          <Select onValueChange={(value) => setModel(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              {Constants?.AiModelList.map((model, index) => (
                <SelectItem value={model.name} key={index}>
                  <div className="flex items-center gap-2">
                    <Image
                      src={model.icon}
                      alt={model.name}
                      width={25}
                      height={25}
                    />
                    <h2>{model.name}</h2>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <h2 className="font-bold text-lg mt-7">
            Enter description about your Image
          </h2>
          <Textarea
            className="mt-3  h-[200px] "
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Write about your Web page"
          />
        </div>
      </div>
      <div className="mt-10 flex items-center justify-center">
        <Button onClick={OnConvertToCodeButtonClick} disabled={loading}>
          {loading ?<Loader2Icon className='animate-spin'/>:
          <WandSparkles />}
          Convert to Code
        </Button>
      </div>
    </div>
  );
}

export default ImageUpload;
