<script>
  import PopupWithForm from './PopupWithForm.svelte';
  export let isOpen = false;
  export let onClose;
  export let onAddPlace;
  let name;
  let link;

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

<svelte:window on:click={() => console.log('Click')} />;
<PopupWithForm
  title="Новое место"
  name="card-add"
  btnText="Создать"
  {isOpen}
  {onClose}
  onSubmit={handleSubmit}
  disabled={!name || !link || false}
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
      bind:value={link}
    />
    <span class="popup__input-error input-image-error" />
  </label>
  "
</PopupWithForm>
