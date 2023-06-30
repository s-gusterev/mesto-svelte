<script>
  import avatar from '../assets/images/avatar.jpg';
  import Card from './Card.svelte';
  import img1 from '../assets/images/elbrus.jpg';

  const cards = [
    { id: '1', name: 'Эльбрус', link: img1, likes: [1, 2, , , , ,] },
    { id: '2', name: 'Эльбрус', link: img1, likes: [1, 2, , , , , 2] },
    { id: '3', name: 'Эльбрус', link: img1, likes: [1, 2, , , , , 4, 5, 5, 5] },
    { id: '4', name: 'Эльбрус', link: img1, likes: [1, 2, ,] },
    { id: '5', name: 'Эльбрус', link: img1, likes: [1, ,] },
    { id: '6', name: 'Эльбрус', link: img1, likes: [] },
    { id: '7', name: 'Эльбрус', link: img1, likes: [1, 2] },
  ];

  export let openEditAvatar;
  export let openEditProfile;
  export let openAddCard;
</script>

<main class="main">
  <section class="profile main__profile">
    <div class="profile__info">
      <div class="profile__avatar" style="background-image: url({avatar})">
        <button
          class="profile__btn-edit-avatar"
          type="button"
          aria-label="Редактировать аватар"
          on:click={openEditAvatar}
        />
      </div>
      <div class="profile__name">
        <h1 class="profile__title">Сергей Густерёв</h1>
        <p class="profile__subtitle">Веб-разработчик</p>
        <button
          class="profile__btn-edit-profile"
          type="button"
          aria-label="Редактировать данные профиля"
          on:click={openEditProfile}
        />
      </div>
      <button
        class="profile__btn-add-place"
        type="button"
        aria-label="Добавить место"
        on:click={openAddCard}
      />
    </div>
    <ul class="cards">
      {#each cards as card (card.id)}
        <Card {card} />
      {/each}
    </ul>
  </section>
</main>
