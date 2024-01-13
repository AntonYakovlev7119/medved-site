// ============= Админ панель/управление содержимым страниц =============

const section_select = document.querySelector("#section_select");
const cms_form = document.querySelector("form.cms_managment");
const section_title = document.querySelector("h2.title");
const textarea = document.querySelector("#cms_text_area");

section_select.addEventListener("change", async (elem) => {
  const data = await fetch(`/admin/cms?section=${elem.target.value}`).then(
    (response) => response.json()
  );
  section_title.innerText = data.title;
  textarea.value = data.content;
  cms_form.action = `/admin/cms_data_update?section=${elem.target.value}`;
});
