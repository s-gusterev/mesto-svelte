<script>
  export let isOpen = false;
</script>

<div
  class="{isOpen
    ? 'popup_opened'
    : ''} popup popup_background_dark popup_type_picture root__popup"
>
  <div class="popup__container">
    <img src="" alt="" class="popup__img" />
    <p class="popup__img-description">Описание</p>
    <button class="popup__close" type="button" aria-label="Закрыть" />
  </div>
</div>
