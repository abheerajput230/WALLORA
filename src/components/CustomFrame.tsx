"use client";
import { useState, type ChangeEvent } from "react";
const imageCategories = {
Sports: [
"https://i.pinimg.com/736x/06/c8/3e/06c83e4ee573251638b8ad16829e3f55.jpg",
"https://i.pinimg.com/736x/84/6c/e6/846ce648412f882ee61df34324900d91.jpg",
"https://i.pinimg.com/1200x/e8/4d/b4/e84db44722998f72ad72d57b950c0be1.jpg",
"https://i.pinimg.com/1200x/21/2f/cf/212fcf03c37b32353c98945e280bb780.jpg",
"https://i.pinimg.com/736x/f3/06/cd/f306cddc3120e87ff23375d67a629b4d.jpg",
"https://i.pinimg.com/736x/61/b1/81/61b18155979e5474f281d19d5d526beb.jpg",
"https://i.pinimg.com/736x/03/7c/99/037c99357287cb0f5435e31f13bb0f71.jpg",
"https://i.pinimg.com/1200x/80/22/08/80220895dda1b14edd2efd51384c1f2f.jpg",
"https://i.pinimg.com/736x/b6/74/a2/b674a2116e46fcfa7aadb4e1c19b0ab4.jpg",
"https://i.pinimg.com/1200x/25/e6/7e/25e67e2c51d9e42a7340ddbbfc744760.jpg",
"https://i.pinimg.com/736x/af/c0/c6/afc0c69a2fd88115c9e00c2302924c2a.jpg",
"https://i.pinimg.com/736x/8e/16/3d/8e163def380f6dcf0cb92ab288a022be.jpg",
"https://i.pinimg.com/736x/24/6f/c7/246fc7ceade578454acfd0232444df24.jpg",
"https://i.pinimg.com/736x/ba/6b/68/ba6b68284a11c0851ab7f5b629a1fade.jpg",
"https://i.pinimg.com/736x/2d/71/90/2d7190f62941f597fcda5a76f36f09e9.jpg",
],
MoviePosters: [
"https://i.pinimg.com/736x/c8/54/cc/c854ccce48c3dbbeb16a834046bce01c.jpg",
"https://i.pinimg.com/1200x/9d/2b/ae/9d2bae0d90fa6f420ada970fe9727bca.jpg",
"https://i.pinimg.com/736x/91/c8/f8/91c8f89c8b117553ad44dd29e983dc28.jpg",
"https://i.pinimg.com/736x/a0/39/47/a0394796b97678445deb1323f27ff97f.jpg",
"https://i.pinimg.com/1200x/37/62/75/37627587496965efcc0ae42ac9dff525.jpg",
"https://i.pinimg.com/736x/a3/b1/ac/a3b1acef9e1c6e6add483470789a94aa.jpg",
],
Gaming: [
"https://i.pinimg.com/736x/4b/65/af/4b65af5f05779610c6b9f3786a699d89.jpg",
"https://i.pinimg.com/736x/8b/90/ab/8b90ababc702e66b6d2056d1b7bfd972.jpg",
"https://i.pinimg.com/736x/6a/ef/69/6aef69e54da790b881ced28a7dddec48.jpg",
"https://i.pinimg.com/736x/7c/a8/ad/7ca8ad25c97b08ee64576dfd83d4f96c.jpg",
"https://i.pinimg.com/736x/f9/e5/fc/f9e5fc8b02fcb8b359ea4f59e36cb696.jpg",
],
Marvel: [
"https://i.pinimg.com/1200x/c8/54/cc/c854ccce48c3dbbeb16a834046bce01c.jpg",
"https://i.pinimg.com/736x/7f/dd/0d/7fdd0d775f74dc5b4c40e96445dd290a.jpg",
"https://i.pinimg.com/1200x/9d/60/76/9d60762c73b52e94fa44bf7a4206d6e7.jpg",
"https://i.pinimg.com/736x/32/83/98/3283989cd201dcee63c352f3fd537f73.jpg",
"https://i.pinimg.com/736x/28/f8/14/28f814b155cfd288705297396f63d4d2.jpg",
],
Cars: [
"https://i.pinimg.com/736x/e3/2c/81/e32c8103d46f8c2f485097b055835ed7.jpg",
"https://i.pinimg.com/736x/5d/4b/0e/5d4b0e392698e6a7fc83fb5f2318d51c.jpg",
"https://i.pinimg.com/736x/b0/e4/bc/b0e4bc43b9500a65bedce00998305d78.jpg",
"https://i.pinimg.com/736x/10/6e/aa/106eaacc242793c9472c9b424deca7d2.jpg",
"https://i.pinimg.com/736x/c2/2d/2c/c22d2cfb3503bf0740d2391db6c5d1fe.jpg"
],
Bikes: [
"https://i.pinimg.com/736x/a4/3f/c4/a43fc4df2c7a4af990e3104d634e9e47.jpg",
"https://i.pinimg.com/736x/69/59/ac/6959ac3865d9a3a27112e7f837a52350.jpg",
"https://i.pinimg.com/736x/8b/c0/fd/8bc0fd69dd8b0d51e6d6a0aa8893c9b8.jpg",
"https://i.pinimg.com/736x/26/3b/07/263b07b8c196cef7d75c44444cdf782f.jpg",
"https://i.pinimg.com/736x/44/49/6a/44496a78d049bcf211bdfac0371450a9.jpg",
],
GymQuotes: [
"https://i.pinimg.com/736x/7a/62/57/7a6257cdfb7abcb2bf8cdd2e8504c94a.jpg",
"https://i.pinimg.com/736x/57/8e/c0/578ec088275453906ae9ea96aba0436f.jpg",
"https://i.pinimg.com/736x/7a/dd/f4/7addf4a96bf7515be30c3d480120986b.jpg",
"https://i.pinimg.com/736x/34/a2/fc/34a2fc8c4ce265ce9a3c36c51a5c7c39.jpg",
"https://i.pinimg.com/1200x/6e/12/e8/6e12e8617d1229dd4e4f15b44bac0f8d.jpg",
],
Gods: [
"https://i.pinimg.com/736x/9b/59/4f/9b594f6a681626435fd2c2c1a7d26e38.jpg",
"https://i.pinimg.com/736x/0b/dc/24/0bdc2408f35b7d43bebf4032db75d701.jpg",
"https://i.pinimg.com/736x/6e/3b/f0/6e3bf0be385c8a9c30994c5d9c70bd18.jpg",
"https://i.pinimg.com/736x/5f/d9/3c/5fd93c99c0fe077c435bb3d591f76847.jpg",
"https://i.pinimg.com/736x/54/54/fa/5454fad23c2d693003f8601ca83ca018.jpg",
"https://i.pinimg.com/736x/37/35/82/373582cf2794233ad532bb754f330c15.jpg",
"https://i.pinimg.com/1200x/f6/2d/76/f62d769668b5b437748a9ba0cfcb973c.jpg",
"https://i.pinimg.com/736x/f0/b1/34/f0b1347feb4b4413a948c5e60b751c61.jpg",
"https://i.pinimg.com/736x/b9/5e/08/b95e08551d7f75300abd54c93ee18263.jpg",
"https://i.pinimg.com/736x/ff/43/a1/ff43a13864475275e2ba695fba84631a.jpg",
"https://i.pinimg.com/736x/3f/cf/c8/3fcfc82c53de668f96cbd900bfed5681.jpg",
"https://i.pinimg.com/736x/eb/9f/13/eb9f1306400d736a6be7a6d16633fe8f.jpg",
"https://i.pinimg.com/736x/5a/f6/83/5af683999c23e31dbbedf24f8e9874ac.jpg",
"https://i.pinimg.com/1200x/23/59/0a/23590a07fa8d2a97d6c5c3d298fde73c.jpg",
"https://i.pinimg.com/736x/d7/08/57/d708576bd0eed06eadd823e2ab3278be.jpg",
"https://i.pinimg.com/736x/f2/74/1c/f2741c0b5b8119a8061ce15b702ea24c.jpg",
"https://i.pinimg.com/736x/6e/98/64/6e9864bc6628b071ff9c2e7e21b93083.jpg",
"https://i.pinimg.com/736x/84/16/2a/84162a4f3f39d7f3d66be2f8cbb8d23b.jpg",
],
Anime: [
"https://i.pinimg.com/1200x/6b/5d/de/6b5dde9318c0c88f94464a03da18af2e.jpg",
"https://i.pinimg.com/736x/e6/6a/6a/e66a6a6ad2417a08d7007f8b5982047f.jpg",
"https://i.pinimg.com/1200x/a3/05/ac/a305ac07b881d736e20d73c2bc30ce1a.jpg",
"https://i.pinimg.com/736x/33/2d/2e/332d2e8b2d42fd2265e8758831971f21.jpg",
"https://i.pinimg.com/1200x/e4/b8/56/e4b856285e753b957e4c859540e756ea.jpg",
"https://i.pinimg.com/736x/a2/2e/05/a22e0507c7230c587bf4b93d09f2ade4.jpg",
"https://i.pinimg.com/736x/e3/7b/d7/e37bd7d91180c5dc06164db9e3f96351.jpg",
"https://i.pinimg.com/1200x/8f/b3/87/8fb38778dcbcca45ce5faebf496ea749.jpg",
"https://i.pinimg.com/736x/50/c0/7f/50c07fd4b98af69e737da734bbe72bcf.jpg",
"https://i.pinimg.com/736x/78/82/ee/7882eed5145beb875f13269564dae123.jpg",
],
Wallpaper: [
"https://i.pinimg.com/736x/5e/a2/e4/5ea2e4b5271ccb323fa2a7955577c725.jpg",
"https://i.pinimg.com/736x/b2/f9/ab/b2f9ab2648c3039bf91132481e6d683d.jpg",
"https://i.pinimg.com/736x/ed/53/60/ed536020749bf50efc81fd81cd920f1c.jpg",
"https://i.pinimg.com/736x/d4/cb/7b/d4cb7ba1990278d144cba511524903aa.jpg",
"https://i.pinimg.com/736x/59/10/3e/59103e74ad9f0f5a8babf3de65955515.jpg",
"https://i.pinimg.com/736x/2e/64/40/2e6440ce11ac1ccc469321346c179406.jpg",
"https://i.pinimg.com/736x/c8/f7/9f/c8f79f1bddbb5f10a584c639ef29fb90.jpg",
"https://i.pinimg.com/736x/81/47/5b/81475b623c9f6dcca13a27835111d228.jpg",
"https://i.pinimg.com/736x/8f/83/b2/8f83b27aca8da179e7eaf4f5fd243d06.jpg",
"https://i.pinimg.com/736x/ad/47/55/ad475517a4256b970b71abd6ad1035f8.jpg",
"https://i.pinimg.com/736x/7d/07/90/7d0790f4e214ead5d69c74bd69bef10a.jpg",
"https://i.pinimg.com/736x/9f/9f/4a/9f9f4aaa49a529d6df540cb1b683cb31.jpg",
"https://i.pinimg.com/736x/99/89/9a/99899a73df6b9f0ed7675f0625b875f1.jpg",
"https://i.pinimg.com/736x/8e/5a/e4/8e5ae48c600594e0d4f6ed6ff0446dab.jpg",
"https://i.pinimg.com/736x/c5/73/3b/c5733b129c19d1601a3d0fbb22665b3d.jpg",
"https://i.pinimg.com/736x/a5/c4/ba/a5c4ba95bf3140512c9b0cf70ca4868b.jpg",
"https://i.pinimg.com/736x/31/7c/e5/317ce500a3fb74943edccf909a690bd6.jpg",
"https://i.pinimg.com/1200x/b9/2f/ee/b92feede3fe4686d110d0c84394ea5fc.jpg",
"https://i.pinimg.com/736x/61/2b/4f/612b4f1142278ee6e091c2ab437684ea.jpg",
"https://i.pinimg.com/736x/2e/32/1c/2e321c04392f2fad2283bcf24a370c82.jpg",
"https://i.pinimg.com/736x/50/f7/4e/50f74e95c7f3a650187e0ccd31a43bfc.jpg",
"https://i.pinimg.com/736x/a4/60/30/a460303d287fa52395c727c8176a9162.jpg",
],
};


export default function FramePreview() {
const [rotation1, setRotation1] = useState(0); 
const [selectedImage1, setSelectedImage1] = useState(imageCategories.Sports[0]);
const [frameColor1, setFrameColor1] = useState("#000000");
const [imageSource, setImageSource] = useState<"category" | "custom">("category");
const [bgColor, setBgColor] = useState("#e5e7eb");
const [fitMode, setFitMode] = useState("fill");
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedCategory, setSelectedCategory] = useState<keyof typeof imageCategories>("Sports");
const [customImageUrl, setCustomImageUrl] = useState("");
const [customImageError, setCustomImageError] = useState("");
const currentPrice = imageSource === "category" ? 199 : 249;
const [isDmOpen, setIsDmOpen] = useState(false);
const [dmImage, setDmImage] = useState("");
const [actionError, setActionError] = useState("");
const frameOptions = [
{ name: "Black", color: "#000000" },
{ name: "Brown", coor: "#8B5E3C" },
{ name: "Silver", color: "#C0C0C0" },
{ name: "Gold", color: "#D4AF37" },
{ name: "White", color: "#FFFFFF" },
{ name: "Matte Black", color: "#2C2C2C" },
{ name: "Dark Wood", color: "#5B4636" },
{ name: "Light Wood", color: "#A67C52" },
{ name: "Gray", color: "#374151" },
{ name: "Charcoal", color: "#1F2937" },
];
const bgOptions = [
{ name: "Gray Wall", color: "#e5e7eb" },
{ name: "White Wall", color: "#ffffff" },
{ name: "Dark Wall", color: "#111827" },
{ name: "Cream Wall", color: "#fef3c7" },
{ name: "Light Gray", color: "#f3f4f6" },
{ name: "Lavender", color: "#ede9fe" },
{ name: "Cyan Light", color: "#ecfeff" },
{ name: "Green Light", color: "#f0fdf4" },
{ name: "Warm White", color: "#fff7ed" },
{ name: "Black Wall", color: "#000000" },
];
const setCurrentFrameColor = (color: string) => {
setFrameColor1(color);
};
const setCurrentImage = (img: string) => {
setSelectedImage1(img);
};
const applyCustomImage = () => {
const url = customImageUrl.trim();
if (!url) {
setCustomImageError("Please enter an image URL.");
return;
    }
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
        throw new Error("Invalid protocol");
      }
      setCurrentImage(url);
      setImageSource("custom");
      setCustomImageError("");
    } catch {
      setCustomImageError("Enter a valid http(s) image URL.");
    }
  };
  const applyUploadedImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setCustomImageError("Please upload a valid image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setCurrentImage(reader.result);
        setImageSource("custom");
        setCustomImageError("");
      }
    };
    reader.onerror = () => {
      setCustomImageError("Could not read the uploaded image.");
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };
  const loadImage = (src: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Image load failed"));
      img.src = src;
    });
  const drawFittedImage = (
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    const imageRatio = image.width / image.height;
    const frameRatio = width / height;
    if (fitMode === "fill") {
      ctx.drawImage(image, x, y, width, height);
      return;
    }
    if (fitMode === "cover") {
      let drawWidth = width;
      let drawHeight = height;
      let drawX = x;
      let drawY = y;
      if (imageRatio > frameRatio) {
        drawHeight = height;
        drawWidth = height * imageRatio;
        drawX = x - (drawWidth - width) / 2;
      } else {
        drawWidth = width;
        drawHeight = width / imageRatio;
        drawY = y - (drawHeight - height) / 2;
      }

      ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
      return;
    }
    const containRatio = Math.min(width / image.width, height / image.height);
    const containWidth = image.width * containRatio;
    const containHeight = image.height * containRatio;
    const containX = x + (width - containWidth) / 2;
    const containY = y + (height - containHeight) / 2;
    ctx.drawImage(image, containX, containY, containWidth, containHeight);
  };

  const renderFrameCanvas = async () => {
    const frameWidth = 630;
    const frameHeight = 891;
    const border = 42;

    const outputSize = 1260;
    const canvas = document.createElement("canvas");
    canvas.width = outputSize;
    canvas.height = outputSize;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas is not available");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, outputSize, outputSize);

    const img = await loadImage(selectedImage1);
    const rad = (rotation1 * Math.PI) / 180;

    ctx.save();
    ctx.translate(outputSize / 2, outputSize / 2);
    ctx.rotate(rad);

    ctx.fillStyle = frameColor1;
    ctx.fillRect(-frameWidth / 2, -frameHeight / 2, frameWidth, frameHeight);

    const innerX = -frameWidth / 2 + border;
    const innerY = -frameHeight / 2 + border;
    const innerWidth = frameWidth - border * 2;
    const innerHeight = frameHeight - border * 2;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(innerX, innerY, innerWidth, innerHeight);

    ctx.save();
    ctx.beginPath();
    ctx.rect(innerX, innerY, innerWidth, innerHeight);
    ctx.clip();
    drawFittedImage(ctx, img, innerX, innerY, innerWidth, innerHeight);
    ctx.restore();
    ctx.restore();

    return canvas;
  };

  const handleDownloadFrame = async () => {
    setActionError("");
    try {
      const canvas = await renderFrameCanvas();
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpeg", 1.0);
      link.download = "custom-frame.jpg";
      link.click();
    } catch {
      setActionError("Download failed. Try with an uploaded image.");
    }
  };

  const handleOrderNow = () => { window.open("https://www.instagram.com/poster_arena/", "_blank"); }; const handleDmClick = () => { window.open("https://www.instagram.com/poster_arena/", "_blank"); };


  return (

    <div
      className="min-h-screen  transition-all duration-300"
      style={{ backgroundColor: bgColor }}
    >

      {/* FLOATING BUTTON */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed top-6 xs:top-2 right-6 z-50 xs:px-4 xs:text-[10px] bg-gradient-to-r from-red-600 to-red-600 text-white px-6 py-3 xs:py-1  rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 font-semibold"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 xs:hidden" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
        Customize
      </button>

     
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto transform transition-all duration-300 scale-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-6 rounded-t-2xl flex justify-between items-center z-10">
                <div>
                  <h2 className="text-2xl font-bold">Customize Your Frames</h2>
                  <p className="text-purple-100 text-sm mt-1">Choose your perfect frames and backgrounds</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-8 space-y-8">

                {/* FRAME STYLE */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-purple-600 to-blue-600 rounded-full"></div>
                    <h3 className="font-bold text-lg text-gray-800">Frame Style</h3>
                  </div>

                  <div className="grid grid-cols-8 xs:grid-cols-3 gap-3">
                    {frameOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentFrameColor(option.color)}
                        className={`
                          flex flex-col items-center gap-3 p-4 border-2 rounded-xl transition-all duration-200
                          ${frameColor1 === option.color
                            ? "border-purple-600 bg-purple-50 shadow-lg scale-105"
                            : "border-gray-200 hover:border-purple-300 hover:shadow-md"}
                        `}
                      >
                        <div
                          className="w-16 h-16 rounded-lg shadow-md ring-2 ring-white"
                          style={{ backgroundColor: option.color }}
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {option.name}
                        </span>
                        {frameColor1 === option.color && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                

                {/* CUSTOM IMAGE URL */}
                <div>
                  <div className="flex items-center  xs:flex-col gap-2 mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-purple-600 to-blue-600 rounded-full"></div>
                    <h3 className="font-bold text-lg  text-gray-800">Use Image URL or Upload</h3>
                  </div>
                  <div className="flex xs:flex-col text-gray-800 gap-3">
                    <input
                      type="url"
                      value={customImageUrl}
                      onChange={(e) => setCustomImageUrl(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") applyCustomImage();
                      }}
                      placeholder="https://example.com/your-image.jpg"
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
                    />
                    <button
                      type="button"
                      onClick={applyCustomImage}
                      className="px-5 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg transition-all duration-200"
                    >
                      Apply to Frame
                    </button>
                  </div>
                  <div className="mt-3 flex xs:flex-col items-center gap-3">
                    <span className="text-sm text-gray-500">or</span>
                    <label
                      htmlFor="custom-image-upload"
                      className="px-5 py-3 rounded-xl font-semibold bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200 transition-all duration-200 cursor-pointer"
                    >
                      Upload Image
                    </label>
                    <input
                      id="custom-image-upload"
                      type="file"
                      accept="image/*"
                      onChange={applyUploadedImage}
                      className="hidden"
                    />
                  </div>
                  {customImageError && (
                    <p className="text-sm text-red-600 mt-2">{customImageError}</p>
                  )}
                </div>
                <img
                src={selectedImage1}
                alt="Selected by user"
                className="h-20 w-14 rounded-md border border-purple-300 object-cover"
              />

                {/* IMAGE GALLERY */}
               
                {/* WALL BACKGROUND */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
                    <h3 className="font-bold text-lg text-gray-800">Wall Background</h3>
                  </div>

                  <div className="grid xs:grid-cols-3 grid-cols-8 gap-3">
                    {bgOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => setBgColor(option.color)}
                        className={`
                          flex flex-col items-center gap-3 p-4 border-2 rounded-xl transition-all duration-200
                          ${bgColor === option.color
                            ? "border-blue-600 bg-blue-50 shadow-lg scale-105"
                            : "border-gray-200 hover:border-blue-300 hover:shadow-md"}
                        `}
                      >
                        <div
                          className="w-16 h-16 rounded-lg shadow-md ring-2 ring-white"
                          style={{ backgroundColor: option.color }}
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {option.name}
                        </span>
                        {bgColor === option.color && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* FIT MODE CONTROL */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-purple-600 to-blue-600 rounded-full"></div>
                    <h3 className="font-bold text-lg text-gray-800">Image Fit</h3>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setFitMode("fill")}
                      className={`flex-1 px-6 py-3 border-2 rounded-xl font-medium transition-all duration-200 ${fitMode === "fill"
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent shadow-lg"
                        : "border-gray-200 text-gray-700 hover:border-purple-300"
                        }`}
                    >
                      Fit
                    </button>

                    <button
                      onClick={() => setFitMode("cover")}
                      className={`flex-1 px-6 py-3 border-2 rounded-xl font-medium transition-all duration-200 ${fitMode === "cover"
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent shadow-lg"
                        : "border-gray-200 text-gray-700 hover:border-purple-300"
                        }`}
                    >
                      Fill
                    </button>
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-gray-50 px-8 py-4 rounded-b-2xl border-t border-gray-200">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                >
                  Apply Changes
                </button>
              </div>
            </div>
          </div>
        </>
      )}



      {/* MAIN */}
      <div className="flex max-w-full xs:flex-col  mx-auto">
        <div className="w-1/2 xs:w-full sticky xs:relative xs:top-4 top-0 xs:max-h-[660px] h-screen flex xs:flex-col justify-center items-center gap-8 xs:gap-4 p-8">
          <div className="flex flex-col items-center gap-4">
            <div
              className="p-[14px] shadow-2xl transition-all duration-300"
              style={{
                width: "210px",
                height: "297px",
                backgroundColor: frameColor1,
                transform: `rotate(${rotation1}deg)`
              }}
            >
              <div className="bg-white w-full h-full p-[0px] flex items-center justify-center overflow-hidden">
                <img
                  src={selectedImage1}
                  alt=""
                  className="w-full h-full"
                  style={{
                    objectFit: fitMode as "fill" | "cover" | "contain",
                    objectPosition: "center"
                  }}
                />
              </div>
            </div>

            {/* ROTATION 1 */}
            <div className="w-[210px] text-black">
              <p className="text-sm font-semibold mb-1 text-center">
                Rotate Frame
              </p>
              <input
                type="range"
                min="0"
                max="360"
                value={rotation1}
                onChange={(e) => setRotation1(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-xs text-black mt-1 text-center">
                {rotation1}°
              </div>
            </div>
            <div className="w-[290px] rounded-xl border border-gray-300 bg-white p-3 text-center">
              <p className="text-sm text-gray-700">Price</p>
              <p className="text-2xl font-bold text-black">Rs {currentPrice}</p>
              <p className="text-xs text-gray-500 mt-1">
                {imageSource === "category"
                  ? "Category image selected"
                  : "Uploaded/custom image selected"}
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
               
                <button
                  type="button"
                  className="rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-2 text-xs font-semibold text-white hover:opacity-90 transition"
                  onClick={handleDownloadFrame}
                >
                  Download
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50 transition"
                  onClick={handleDmClick}
                >
                  DM
                </button>
              </div>
              {actionError && (
                <p className="mt-2 text-xs text-red-600">{actionError}</p>
              )}
            </div>
          </div>


        </div>



        {/* GALLERY */}
        <div className="w-1/2 xs:w-full p-8 xs:p-2 overflow-y-auto h-screen">

          <h2 className="text-xl font-semibold mb-4 text-black">
            Image Categories
          </h2>

          {/* Category Tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {(Object.keys(imageCategories) as Array<keyof typeof imageCategories>).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-4 py-2 rounded-lg font-medium transition-all duration-200
                  ${selectedCategory === category
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
                `}
              >
                {category}
              </button>
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            {selectedCategory} Collection
          </h3>

         

          <div className="grid grid-cols-5 gap-4">
            {imageCategories[selectedCategory].map((img, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedImage1(img);
                  setImageSource("category");
                }}
                className={`
                  w-full aspect-[1/1.414] object-cover cursor-pointer border-4 rounded transition hover:scale-105
                  ${selectedImage1 === img
                    ? "border-purple-600 shadow-xl"
                    : "border-transparent hover:border-purple-300"}
                `}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover rounded"
                />
              </button>
            ))}
          </div>

        </div>


      </div>

      {isDmOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => setIsDmOpen(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="w-full max-w-md rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src="https://i.pravatar.cc/100?img=12"
                    alt="Dummy profile"
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Poster Praise Support</p>
                    <p className="text-xs text-green-600">Online</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="rounded-md px-2 py-1 text-sm text-gray-600 hover:bg-gray-100"
                  onClick={() => setIsDmOpen(false)}
                >
                  Close
                </button>
              </div>

              <div className="space-y-3 bg-gray-50 px-4 py-4">
                <p className="max-w-[85%] rounded-xl bg-white px-3 py-2 text-sm text-gray-700 shadow">
                  Hi, I want to order this frame.
                </p>
                <div className="ml-auto w-fit max-w-[85%] rounded-xl bg-blue-600 px-2 py-2 shadow">
                  <img
                    src={dmImage || selectedImage1}
                    alt="Frame sent in DM"
                    className="h-48 w-36 rounded-md border border-blue-300 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </div>

  );

}




