<script>
  import PopupWithForm from './PopupWithForm.svelte';
  export let isOpen = false;
  export let onClose;
</script>

<PopupWithForm
  title="Обновить аватар"
  btnText="Обновить"
  name="edit-avatar"
  {isOpen}
  {onClose}
>
  <label class="popup__label" for="input-avatar">
    <input
      class="popup__input"
      type="url"
      name="avatar"
      id="input-avatar"
      required
      placeholder="Ссылка на аватар"
    />
    <span class="popup__input-error input-avatar-error" />
  </label>
</PopupWithForm>
