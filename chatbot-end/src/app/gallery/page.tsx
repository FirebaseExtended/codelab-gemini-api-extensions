import Image from "next/image";

export default function Gallery() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Image
              src="/image-1.jpg"
              alt="Image 1"
              width={200}
              height={200}
            />
            <Image
              src="/image-2.jpg"
              alt="Image 2"
              width={200}
              height={200}
            />
          </div>
          <div className="flex gap-4">
            <Image
              src="/image-3.jpg"
              alt="Image 3"
              width={200}
              height={200}
            />
            <Image
              src="/image-4.jpg"
              alt="Image 4"
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Image
              src="/image-5.jpg"
              alt="Image 5"
              width={200}
              height={200}
            />
            <Image
              src="/image-6.jpg"
              alt="Image 6"
              width={200}
              height={200}
            />
          </div>
          <div className="flex gap-4">
            <Image
              src="/image-7.jpg"
              alt="Image 7"
              width={200}
              height={200}
            />
            <Image
              src="/image-8.jpg"
              alt="Image 8"
              width={200}
              height={200}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button className="rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <span className="text-lg font-semibold">Upload</span>
        </button>
      </div>
    </main>
  );
}

