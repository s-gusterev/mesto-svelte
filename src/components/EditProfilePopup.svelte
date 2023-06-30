<script>
  import PopupWithForm from './PopupWithForm.svelte';
  export let isOpen = false;
  export let onClose;
</script>

<PopupWithForm
  title="Редактировать профиль"
  btnText="Сохранить"
  name="profile"
  {isOpen}
  {onClose}
>
  <label class="popup__label" for="input-name">
    <input
      class="popup__input"
      type="text"
      name="name"
      id="input-name"
      required
      placeholder="Имя"
      minLength="2"
      maxLength="40"
    />
    <span class="popup__input-error input-name-error" />
  </label>
  <label class="popup__label" for="input-about">
    <input
      class="popup__input"
      type="text"
      name="about"
      id="input-about"
      required
      placeholder="Род деятельности"
      minLength="2"
      maxLength="200"
    />
    <span class="popup__input-error input-about-error" />
  </label>
</PopupWithForm>
