import { getImageProps } from "next/image";

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
      className=" relative h-screen w-screen bg-cover bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage }}
    >
      <h1 className=" absolute text-4xl  font-bold text-white drop-shadow">
        FALTAN 19 HORAS
      </h1>
    </main>
  );
}
