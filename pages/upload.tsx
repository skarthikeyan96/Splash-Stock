import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../components/layout";
import LoadingComponent from "../components/loading";
import { v4 as uuidv4 } from 'uuid';

const UploadImage = () => {
  const [uploading, setUploading] = React.useState(false);

  const supabase = useSupabaseClient();
  const user = useUser();

  const router = useRouter();
  
  const uploadImage = async (e: any) => {
    try {
      setUploading(true);
      console.log(e.target.files[0]);

      const file = e.target.files[0];
      const fileExtension = file.name.split(".").pop();
      const fileName = `${file?.name}`;
      const filePath = `${fileName}`;

      console.log(filePath)
      console.log(user?.id)
      const { data, error } = await supabase.storage
        .from("images")
        .upload(filePath, file, { upsert: true });

    //   const { data, error } = await supabase
    //     .storage
    //     .from('avatars')
    //     .upload(user?.id + "/" + uuidv4(), file)

    //   const { data, error } = await supabase.storage
    //     .from("avatars")
    //     .upload("public/" + file?.name, file as File);

      if (error) {
        toast("upload failed");
      }

      if(data){
        toast("upload complete, redirecting...");

        router.push("/")
      }

      // console.log(data)
    } catch (error: any) {
      toast(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Layout>
      <div className="rounded-md p-4 pt-12 bg-white border flex items-center justify-center flex-col w-1/4">
        <div className="mb-8">
          <h4 className="font-medium text-lg text-center">
            Upload your images
          </h4>
        </div>

        <label className="text-white bg-gray-800 hover:bg-gray-900  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-full text-center cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={uploadImage}
            className="hidden"
          />
          {uploading ? <div className="flex "><LoadingComponent/><p> Uploading...</p> </div>: <p> Upload </p> }
        </label>
      </div>

      <Toaster />
    </Layout>
  );
};

export default UploadImage;
