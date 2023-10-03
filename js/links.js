export const linksController = () => {
  const links = document.querySelectorAll(".main__links-item");
  const linksMainBtn = document.querySelector(".main__links-btn");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      links.forEach((link) => link.classList.remove("main__links-item_active"));
      link.classList.add("main__links-item_active");
    });
  });

  linksMainBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const currentLink = [...links].find((link) =>
      link.classList.contains("main__links-item_active")
    );

    window.open(currentLink.href, "_blank");
  });
};
