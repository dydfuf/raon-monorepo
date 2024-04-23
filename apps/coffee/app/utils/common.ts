import { IS_CLIENT } from "../constant/common";

export const scrollToTop = () => {
  if (IS_CLIENT) {
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  }
};
