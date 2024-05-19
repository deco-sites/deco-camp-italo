import { useState } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/compat";
import Icon from "../components/ui/Icon.tsx";
import { invoke } from "deco-sites/deco-camp-italo/runtime.ts";
import { getProductLikes } from "deco-sites/deco-camp-italo/sdk/LikesForProduct.ts";
import { ComponentType } from "preact";
import { Bounce, toast, ToastContainer } from "react-toastify";
import ToastStyle from "../components/ToastStyle.tsx";
import { sendEventPostScore } from "../components/Analytics.tsx";
import { useId } from "../sdk/useId.ts";

const REFRESH_TIMEOUT = 30 * 1000; // 30 segundos

export default function LikeCount(productid) {
  const likesproduct = useSignal<LikesForProduct | null>(null);
  const fetchLikes = async () => {
    if (!productid) return;

    const result = await getProductLikes({
      productId: productid,
    });
    if (result === null) {
      return;
    }
    likesproduct.value = result;
    count.value = result;
    setTimeout(fetchLikes, REFRESH_TIMEOUT);
  };

  useEffect(() => {
    fetchLikes();
  }, [productid]);

  const count = useSignal(0);
  const [icone, setIcon] = useState("Mood");
  const [color, setColor] = useState("text-gray-400");

  const Toast = ToastContainer as ComponentType;

  const increment = async () => {
    try {
      const response = await invoke["deco-sites/deco-camp-italo"].actions
        .AddLikes({ productId: productid.productid });
      if (response === "ok") {
        count.value++;
        if (color === "text-gray-400") {
          setColor("text-base");
        }
        if (icone === "Mood" || count.value > 0) {
          setIcon("MoodCheck");
        }

        const produtoClicado = localStorage.getItem(`produto_clicado`);
        if (!produtoClicado) {
          localStorage.setItem(`produto_clicado`, productid.productid);
        } else {
          if (!produtoClicado.includes(productid.productid)) {
            localStorage.setItem(
              `produto_clicado`,
              `${produtoClicado},${productid.productid}`,
            );
          }
        }

        toast.success("Obrigado por curtir", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        });

        sendEventPostScore({
          name: "post_score",
          params: {
            score: count.value,
            level: 5,
            character: String(productid),
          },
        });
      }
    } catch (error) {
      console.error("Error");
    }
  };

  const id = useId();

  return (
    <div>
      <button
        class={`flex items-center ${color}`}
        id="btnMood"
        onClick={increment}
      >
        <Icon id={icone} size={24} />
        <span class="ml-1 text-sm">({count.value})</span>
      </button>
      <ToastStyle />
      <Toast />
    </div>
  );
}
