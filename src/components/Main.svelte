<script>
  import { currentUser } from '../store';
  import Card from './Card.svelte';
  export let openEditAvatar;
  export let openEditProfile;
  export let openAddCard;
  export let cards;
  export let onCardLike;
  export let onCardDelete;
  export let onCardClick;
  export let triggerCard;
</script>

<main class="main">
  <section class="profile main__profile">
    <div class="profile__info">
      <div
        class="profile__avatar"
        style="background-image: url({$currentUser.avatar})"
      >
        <button
          class="profile__btn-edit-avatar"
          type="button"
          aria-label="Редактировать аватар"
          on:click|stopPropagation={openEditAvatar}
        />
      </div>
      <div class="profile__name">
        <h1 class="profile__title">{$currentUser.name}</h1>
        <p class="profile__subtitle">{$currentUser.about}</p>
        <button
          class="profile__btn-edit-profile"
          type="button"
          aria-label="Редактировать данные профиля"
          on:click|stopPropagation={openEditProfile}
        />
      </div>
      <button
        class="profile__btn-add-place"
        type="button"
        aria-label="Добавить место"
        on:click|stopPropagation={openAddCard}
      />
    </div>
    <ul class="cards">
      {#each cards as card (card._id)}
        <Card {card} {onCardLike} {onCardDelete} {onCardClick} {triggerCard} />
      {/each}
    </ul>
  </section>
</main>
