const copyButtons = document.querySelectorAll("[data-copy]");

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fall back for browsers that block clipboard access on local files.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

for (const button of copyButtons) {
  const label = button.querySelector(".action-label");
  let resetTimer;

  button.addEventListener("click", async () => {
    try {
      await copyText(button.dataset.copy);
      button.classList.add("is-copied");
      if (label) label.textContent = "已复制";
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        button.classList.remove("is-copied");
        if (label) label.textContent = "复制";
      }, 1600);
    } catch {
      if (label) label.textContent = "复制失败";
    }
  });
}
