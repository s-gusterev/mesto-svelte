<script>
  import PopupWithForm from './PopupWithForm.svelte';
  export let isOpen = false;
  export let onClose;
  export let onUpdateAvatar;
  export let btnText;
  let avatarInput;
  let avatarValid = true;
  let avatarInputShowError;
  let avatar = '';

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar({
      avatar,
    });
    avatar = '';
  };

  const handleInput = (e) => {
    avatarValid = avatarInput.validity.valid;
    avatarInputShowError = avatarInput.validationMessage;
  };
</script>

<PopupWithForm
  title="Обновить аватар"
  {btnText}
  name="edit-avatar"
  {isOpen}
  {onClose}
  onSubmit={handleSubmit}
  disabled={!avatar || !avatarValid}
>
  <label class="popup__label" for="input-avatar">
    <input
      class="popup__input"
      class:popup__input_type_error={!avatarValid}
      type="url"
      name="avatar"
      id="input-avatar"
      required
      placeholder="Ссылка на аватар"
      bind:value={avatar}
      bind:this={avatarInput}
      on:input={(e) => handleInput(e)}
    />
    <span
      class="popup__input-error input-avatar-error"
      class:popup__input-error_active={!avatarValid}
      >{avatarInputShowError}</span
    >
  </label>
</PopupWithForm>
