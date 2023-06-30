<script>
  import { getContext } from 'svelte';
  export let card;
  export let onCardLike;
  export let onCardDelete;

  let user = getContext('currentUser');
  export let isLiked = card.likes.some((i) => i._id === $user._id);
  const isOwn = card.owner._id === $user._id;

  const handleLikeClick = () => {
    onCardLike(card);
    isLiked = !isLiked;
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };
</script>

<li class="card">
  <div class="card__text">
    <h2 class="card__title">{card.name}</h2>
    <div class="card__like-section">
      <button
        class="card__like"
        type="button"
        class:card__like_active={isLiked}
        on:click={handleLikeClick}
      />
      <span class="card__like-info">{card.likes.length}</span>
    </div>
  </div>
  <div class="card__img" style="background-image: url({card.link}" />
  <button
    class="card__del"
    type="button"
    class:card__del_visible={isOwn}
    class:card__del_hidden={!isOwn}
    on:click={handleDeleteClick}
  />
</li>
