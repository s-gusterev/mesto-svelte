<script>
  import PopupWithForm from './PopupWithForm.svelte';
  export let isOpen = false;
  export let onClose;
</script>

<PopupWithForm
  title="Новое место"
  name="card-add"
  btnText="Создать"
  {isOpen}
  {onClose}
>
  <label class="popup__label" for="input-place">
    <input
      class="popup__input"
      type="text"
      name="place"
      id="input-place"
      required
      placeholder="Название"
      minLength="2"
      maxLength="30"
    />
    <span class="popup__input-error input-place-error" />
  </label>
  <label class="popup__label" for="input-image">
    <input
      class="popup__input"
      type="url"
      name="image"
      id="input-image"
      required
      placeholder="Ссылка на картинку"
    />
    <span class="popup__input-error input-image-error" />
  </label>
  "
</PopupWithForm>
