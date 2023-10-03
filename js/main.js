import { updateGlobalDimensions } from "./updateGlobalDimensions.js";
import { languageController } from "./language.js";
import { linksController } from "./links.js";

window.addEventListener("resize", updateGlobalDimensions);

window.addEventListener("DOMContentLoaded", () => {
  updateGlobalDimensions();
  languageController();
  linksController();
});
