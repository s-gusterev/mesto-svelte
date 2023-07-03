<script>
  import { blur } from 'svelte/transition';
  import { clickoutside } from '@svelte-put/clickoutside';
  import Keydown from 'svelte-keydown';
  export let card;
  export let onClose;
  let parent;
</script>

{#if card.isOpen}
  <Keydown paused={!card.isOpen} on:Escape={onClose} />
  <div
    bind:this={parent}
    transition:blur={{ duration: 500 }}
    class="popup popup_opened popup_background_dark popup_type_picture root__popup"
  >
    <div
      class="popup__container"
      use:clickoutside={{
        limit: { parent },
        enabled: onClose,
      }}
      on:clickoutside={() => onClose()}
    >
      <img src={card.link} alt={card.name} class="popup__img" />
      <p class="popup__img-description">{card.name}</p>
      <button
        transition:blur={{ duration: 1000 }}
        class="popup__close"
        type="button"
        aria-label="Закрыть"
        on:click={onClose}
      />
    </div>
  </div>
{/if}
