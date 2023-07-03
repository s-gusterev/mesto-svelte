<script>
  import { slide, blur } from 'svelte/transition';
  import { clickoutside } from '@svelte-put/clickoutside';
  import Keydown from 'svelte-keydown';
  export let isOpen = false;
  export let onClose;
  export let name;
  export let title;
  export let btnText;
  export let onSubmit;
  export let disabled;
  let parent;
</script>

{#if isOpen}
  <Keydown paused={!isOpen} on:Escape={onClose} />
  <div
    bind:this={parent}
    transition:blur={{ duration: 500 }}
    class="popup popup_opened popup_background_light popup_type_{name} root__popup"
  >
    <form
      use:clickoutside={{
        limit: { parent },
        enabled: onClose,
      }}
      on:clickoutside={() => onClose()}
      transition:slide={{ duration: 500, axis: 'x' }}
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
        transition:blur={{ duration: 1000 }}
        class="popup__close"
        type="button"
        aria-label="Закрыть"
        on:click|stopPropagation={onClose}
      />
    </form>
  </div>
{/if}
