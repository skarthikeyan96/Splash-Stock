import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

// for concatentating the classes
function concat(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ImageComponent = (props: any) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
      <Image
        fill
        style={{ objectFit: "cover" }}
        src={props.url}
        alt=""
        className={concat(
          "group-hover:opacity-75 duration-700 ease-in-out",
          isLoading
            ? "grayscale blur-2xl scale-110"
            : "grayscale-0 blur-0 scale-100"
        )}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
};

const Home: NextPage = (props: any) => {
  const CDN = `https://drtpnmlhaicavlzmjgcb.supabase.co/storage/v1/object/public/images/`;
  const user = useUser();
  const [images, setImages] = useState<any>([]);
  const [loadImages, setLoadImages] = useState(false);

  const supabase = useSupabaseClient();
  async function getImages() {
    setLoadImages(true)
    const { data, error } = await supabase.storage.from("images").list("",{
      limit: 99999
    });

      if (data !== null) {
      setImages(data);
    } else {
      console.log(error);
    }

    setLoadImages(false)

  }

  useEffect(() => {
    // if (user) {
      getImages();
    // }
  }, []);

  console.log(images);

  return (
    <div className={styles.container}>
      <Head>
        <title> Splash Stock </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {loadImages ? <p> Loading ... </p> : images.map((image: any) => {
              return <div key={image.name}> <ImageComponent url={CDN + image.name} /> </div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
