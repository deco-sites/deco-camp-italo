import Image from "apps/website/components/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import Header from "../components/ui/SectionHeader.tsx";

interface Props {
  /**
   * @title Título
   */
  label?: string;
  /**
   * @title Cadastre pelo menos 3 imagens
   * @minItems 3
   */
  images: ImageWidget[];
  /**
   * @ignore
   */
  quantity: number;
}

export default function PartialImageGallery({
  label,
  images,
  quantity: quantity = 3,
}: Props) {
  return (
    <div
      class={`w-full container py-8 flex flex-col gap-6 lg:py-10`}
    >
      <Header
        title={label || ""}
      />
      <div class="flex gap-5">
        {images.slice(0, quantity)?.map((image) => {
          return (
            <div class="w-1/3">
              <Image
                src={image}
                width={300}
                height={300}
                class={`bg-base-100 rounded w-full duration-200 hover:scale-110`}
                sizes="(max-width: 640px) 50vw, 20vw"
                decoding="async"
                loading="lazy"
              />
            </div>
          );
        })}
      </div>

      <div>
        {images.length > quantity && (
          <div>
            <button
              {...usePartialSection({
                mode: "replace",
                props: { images, quantity: quantity + 1 },
              })}
              class="bg-secondary p-4 rounded"
            >
              ver mais +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
