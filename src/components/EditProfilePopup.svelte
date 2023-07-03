<script>
  import PopupWithForm from './PopupWithForm.svelte';
  export let isOpen = false;
  export let onClose;
  export let onUpdateUser;
  export let btnText;
  import { currentUser } from '../store';

  let name;
  let about;

  $: isOpen ? (name = $currentUser.name) : (name = $currentUser.name);
  $: isOpen ? (about = $currentUser.about) : (about = $currentUser.about);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name,
      about,
    });
  };

  const handleChangeName = (event) => {
    name = event.target.value;
  };

  const handleChangeAbout = (event) => {
    about = event.target.value;
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
    !about}
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
      value={about}
      on:input={(e) => handleChangeAbout(e)}
    />
    <span class="popup__input-error input-about-error" />
  </label>
</PopupWithForm>
