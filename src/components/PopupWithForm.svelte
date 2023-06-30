<script>
  export let isOpen = false;
  export let onClose;
  export let name;
  export let title;
  export let btnText;
  export let onSubmit;
  export let disabled;
</script>

<div
  class="popup popup_background_light popup_type_{name} root__popup"
  class:popup_opened={isOpen}
>
  <form
    class="popup__container popup__container_type_form"
    {name}
    on:submit={onSubmit}
  >
    <h2 class="popup__title">{title}</h2>

    <slot />

    <button class="popup__btn root__btn" type="submit" {disabled}>
      {btnText}
    </button>
    <button
      class="popup__close"
      type="button"
      aria-label="Закрыть"
      on:click={onClose}
    />
  </form>
</div>
