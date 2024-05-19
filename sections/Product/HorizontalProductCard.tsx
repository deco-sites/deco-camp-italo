export { default } from "../../components/product/HorizontalProductCard.tsx";
import Image from "apps/website/components/Image.tsx";

export function ErrorFallback({ error }: { error?: Error }) {
  return (
    <div class="w-full container py-8 flex flex-col gap-6 lg:py-10">
      <div class="bg-secondary flex flex-col md:flex-row p-2.5 gap-6">
        <div class="w-full md:w-1/4">
          <Image
            src="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4716/3bf19516-8478-4e78-9f3e-8554bc4145c3"
            width={372}
            height={372}
          />
        </div>

        <div class="flex-auto flex flex-col p-2 gap-6 lg:gap-2 w-full md:w-3/4">
          <h2>Culinaria brasileira</h2>
          <p>
            Conheça a diversidade de todos os pratos tipicos da culinaria e
            cultura brasileira
          </p>
          <a href="/culturas">Saiba Mais</a>
        </div>
      </div>
    </div>
  );
}

export function LoadingFallback() {
  return (
    <div class="w-full container py-8 flex flex-col gap-6 lg:py-10">
      <div class="bg-secondary flex flex-col md:flex-row p-2.5 gap-6">
        <div class="w-full md:w-1/4">
          <div class="skeleton animate-pulse w-full md:h-[22vw] h-80">
          </div>
        </div>

        <div class="flex-auto flex flex-col md:flex-row p-2 gap-6 w-full md:w-3/4">
          <div class="flex flex-col gap-5 md:w-3/4">
            <div class="skeleton animate-pulse w-full h-7"></div>
            <div class="skeleton animate-pulse w-full h-7"></div>
          </div>
          <div class="flex flex-col gap-5 md:w-1/4">
            <div class="skeleton animate-pulse w-full h-11"></div>
            <div class="skeleton animate-pulse w-full h-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
