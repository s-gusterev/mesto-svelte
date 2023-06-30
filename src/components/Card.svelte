<script>
  export let card;
</script>

<li class="card">
  <div class="card__text">
    <h2 class="card__title">{card.name}</h2>
    <div class="card__like-section">
      <button class="card__like" type="button" />
      <span class="card__like-info">{card.likes.length}</span>
    </div>
  </div>
  <div class="card__img" style="background-image: url({card.link}" />
  <button class="card__del card__del_visible" type="button" />
</li>
