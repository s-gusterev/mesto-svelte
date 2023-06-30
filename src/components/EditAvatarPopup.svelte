<script>
  import PopupWithForm from './PopupWithForm.svelte';
  export let isOpen = false;
  export let onClose;
  export let onUpdateAvatar;
  export let btnText;
  let avatar = '';

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar({
      avatar,
    });
    avatar = '';
  };
</script>

<PopupWithForm
  title="Обновить аватар"
  {btnText}
  name="edit-avatar"
  {isOpen}
  {onClose}
  onSubmit={handleSubmit}
  disabled={!avatar || false}
>
  <label class="popup__label" for="input-avatar">
    <input
      class="popup__input"
      type="url"
      name="avatar"
      id="input-avatar"
      required
      placeholder="Ссылка на аватар"
      bind:value={avatar}
    />
    <span class="popup__input-error input-avatar-error" />
  </label>
</PopupWithForm>
