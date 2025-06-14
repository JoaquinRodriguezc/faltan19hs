import { getImageProps } from "next/image";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ClassValue } from "clsx";

function getBackgroundImage(srcSet = "") {
  const imageSet = srcSet
    .split(", ")
    .map((str) => {
      const [url, dpi] = str.split(" ");
      return `url("${url}") ${dpi}`;
    })
    .join(", ");
  return `image-set(${imageSet})`;
}

export default function Home() {
  const {
    props: { srcSet },
  } = getImageProps({ alt: "", width: 1200, height: 1200, src: "/field.jpg" });

  const backgroundImage = getBackgroundImage(srcSet);

  return (
    <main
      className=" relative h-screen w-screen bg-contain bg-no-repeat bg-center bg-green-900 flex items-center justify-center"
      style={{ backgroundImage }}
    >
      <Avatar className="absolute top-[50%] left-60 bg-[url(/lauti.png)] " />
      <Avatar className="absolute top-[50%] left-120 bg-[url(/jero.png)]" />
      <Avatar className="absolute top-[20%] left-120 bg-[url(/mati.png)]" />
      <Avatar className="absolute bottom-[10%] left-120 bg-[url(/joaco.png)]" />
      <Avatar name="EM" className="absolute top-[50%] left-180 bg-blue-500" />
      <Avatar className="absolute top-[20%] left-180 bg-[url(/giuli.png)]" />
      <Avatar className="absolute bottom-[10%] left-180 bg-[url(/agus.png)]" />
      {/* otro equipo */}

      <Avatar name="NN" className="absolute top-[50%] right-60  " />
      <Avatar name="NN" className="absolute top-[50%] right-120" />
      <Avatar name="NN" className="absolute top-[20%] right-120" />
      <Avatar name="NN" className="absolute bottom-[10%] right-120 " />
      <Avatar name="NN" className="absolute top-[50%] right-180" />
      <Avatar name="NN" className="absolute top-[20%] right-180 " />
      <Avatar name="NN" className="absolute bottom-[10%] right-180 " />
    </main>
  );
}

function Avatar({
  name,
  className = "",
}: {
  name?: string;
  className: string;
}) {
  return (
    <div
      className={cn(
        "w-20 flex justify-center items-center  bg-center bg-cover bg-no-repeat  -translate-y-1/2 h-20 bg-red-400 rounded-full",
        className
      )}
    >
      {name}
    </div>
  );
}
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
