<script>
  export let card;
  export let onClose;
</script>

<div
  class="popup popup_background_dark popup_type_picture root__popup"
  class:popup_opened={card.isOpen}
>
  <div class="popup__container">
    <img src={card.link} alt={card.name} class="popup__img" />
    <p class="popup__img-description">{card.name}</p>
    <button
      class="popup__close"
      type="button"
      aria-label="Закрыть"
      on:click={onClose}
    />
  </div>
</div>
