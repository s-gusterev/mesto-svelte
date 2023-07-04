<script>
  import PopupWithForm from './PopupWithForm.svelte';
  export let isOpen = false;
  export let onClose;
  export let onUpdateUser;
  export let btnText;
  import { currentUser } from '../store';

  let name;
  let about;

  let nameInput;
  let aboutInput;

  let nameValid = true;
  let nameInputShowError;

  let aboutValid = true;
  let aboutInputShowError;

  $: isOpen ? (name = $currentUser.name) : (name = $currentUser.name);
  $: isOpen ? (about = $currentUser.about) : (about = $currentUser.about);

  $: isOpen ? (nameValid = true) : (nameValid = false);
  $: isOpen ? (aboutValid = true) : (aboutValid = false);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name,
      about,
    });
  };

  const handleChangeName = (event) => {
    name = event.target.value;
    nameValid = nameInput.validity.valid;
    nameInputShowError = nameInput.validationMessage;
  };

  const handleChangeAbout = (event) => {
    about = event.target.value;
    aboutValid = aboutInput.validity.valid;
    aboutInputShowError = aboutInput.validationMessage;
  };
</script>

<PopupWithForm
  title="Редактировать профиль"
  {btnText}
  name="profile"
  {isOpen}
  {onClose}
  onSubmit={handleSubmit}
  disabled={(name === $currentUser.name && about === $currentUser.about) ||
    !name ||
    !about ||
    !nameValid ||
    !aboutValid}
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
      value={name}
      on:input={(e) => handleChangeName(e)}
      bind:this={nameInput}
    />
    <span
      class="popup__input-error input-name-error"
      class:popup__input-error_active={!nameValid}>{nameInputShowError}</span
    >
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
      value={about}
      on:input={(e) => handleChangeAbout(e)}
      bind:this={aboutInput}
    />
    <span
      class="popup__input-error input-about-error"
      class:popup__input-error_active={!aboutValid}>{aboutInputShowError}</span
    >
  </label>
</PopupWithForm>
