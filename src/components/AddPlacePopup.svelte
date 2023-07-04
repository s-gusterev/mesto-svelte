<script>
  import PopupWithForm from './PopupWithForm.svelte';
  export let isOpen = false;
  export let onClose;
  export let onAddPlace;
  let name;
  let link;

  let nameInput;
  let linkInput;

  let nameValid = true;
  let nameInputShowError;

  let linkValid = true;
  let linkInputShowError;

  const handleChangeName = (event) => {
    nameValid = nameInput.validity.valid;
    nameInputShowError = nameInput.validationMessage;
  };

  const handleChangeLink = (event) => {
    linkValid = linkInput.validity.valid;
    linkInputShowError = linkInput.validationMessage;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
    name = '';
    link = '';
  };
</script>

<PopupWithForm
  title="Новое место"
  name="card-add"
  btnText="Создать"
  {isOpen}
  {onClose}
  onSubmit={handleSubmit}
  disabled={!name || !link || !nameValid || !linkValid || false}
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
      bind:value={name}
      on:input={(e) => handleChangeName(e)}
      bind:this={nameInput}
    />
    <span
      class="popup__input-error input-place-error"
      class:popup__input-error_active={!nameValid}>{nameInputShowError}</span
    >
  </label>
  <label class="popup__label" for="input-image">
    <input
      class="popup__input"
      type="url"
      name="image"
      id="input-image"
      required
      placeholder="Ссылка на картинку"
      bind:value={link}
      on:input={(e) => handleChangeLink(e)}
      bind:this={linkInput}
    />
    <span
      class="popup__input-error input-image-error"
      class:popup__input-error_active={!linkValid}>{linkInputShowError}</span
    >
  </label>
</PopupWithForm>
