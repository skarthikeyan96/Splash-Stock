import { createServerSupabaseClient, Session, User } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../components/layout";
import LoadingComponent from "../components/loading";

type UploadProps = {
  initialSession: Session,
  user: User
}
const UploadImage = (props: UploadProps) => {
  const [uploading, setUploading] = React.useState(false);

  const supabase = useSupabaseClient();

  const router = useRouter();
  
  const uploadImage = async (e: any) => {
    try {
      setUploading(true);
      
      const file = e.target.files[0];
      
      const fileName = `${file?.name}`;
      const filePath = `${fileName}`;

  
      const { data, error } = await supabase.storage
        .from("images")
        .upload(filePath, file, { upsert: true });

         if (error) {
        toast("upload failed");
      }

      if(data){
        toast("upload complete, redirecting...");
        var nameMatch = props.user.email?.match(/^([^@]*)@/);
        var name = nameMatch ? nameMatch[1] : null;
        const url = `https://drtpnmlhaicavlzmjgcb.supabase.co/storage/v1/object/public/images/${data.path}`
        // add a row to the table with image url and the respective user
        const { error } = await supabase.from('photoLibrary').insert({ userid: props.user.id, email: props.user.email, username: name, path: url })


        if(!error){
          router.push("/")
        }

        return toast(' something went worng.')
      }

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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};

export default UploadImage;
