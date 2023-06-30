<script>
  import api from '../utils/api';
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import { setContext, getContext } from 'svelte';
  import AddPlacePopup from './AddPlacePopup.svelte';
  import EditAvatarPopup from './EditAvatarPopup.svelte';
  import EditProfilePopup from './EditProfilePopup.svelte';
  import Header from './Header.svelte';
  import ImagePopup from './ImagePopup.svelte';
  import Main from './Main.svelte';

  let isOpenPopupAvatar = false;
  let isOpenPopupProfile = false;
  let isOpenPopupPlace = false;
  let btnTextPopupAvatar = 'Обновить';
  let cards = [];

  let currentUser = writable({
    name: '',
    about: '',
    avatar: '',
    _id: '',
  });

  // Открытие модальных окон ---------------
  const toogleAvatarPopup = () => {
    isOpenPopupAvatar = !isOpenPopupAvatar;
    btnTextPopupAvatar = 'Обновить';
  };

  const toogleProfilePopup = () => {
    isOpenPopupProfile = !isOpenPopupProfile;
  };

  const tooglePlacePopup = () => {
    isOpenPopupPlace = !isOpenPopupPlace;
  };
  // -------------------------------------

  setContext('currentUser', currentUser);
  let user = getContext('currentUser');

  // Получаем карточки
  onMount(() => {
    api
      .getProfile()
      .then((res) => {
        currentUser.set({
          name: res.name,
          about: res.about,
          avatar: res.avatar,
          _id: res._id,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .getInitialCards()
      .then((res) => {
        cards = res;
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // Ставим лайк
  const handleCardLike = (card) => {
    let isLiked = card.likes.some((i) => i._id === $user._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        cards = cards.map((c) => (c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Обновляем аватар
  const handleUpdateAvatar = (user) => {
    const { avatar } = user;
    btnTextPopupAvatar = 'Сохранение';
    api
      .updateAvatar(avatar)
      .then((res) => {
        currentUser.set({
          name: res.name,
          about: res.about,
          avatar: res.avatar,
          _id: res._id,
        });
        toogleAvatarPopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        btnTextPopupAvatar = 'Сохранено';
      });
  };

  // Добавляем карточку
  const handleAddPlaceSubmit = (card) => {
    const { name, link } = card;

    api
      .addCard(name, link)
      .then((res) => {
        cards = [res, ...cards];
        tooglePlacePopup();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Удаляем карточку
  function handleCardDelete(card) {
    api
      .delCard(card._id)
      .then(() => {
        cards = cards.filter((c) => c._id !== card._id);
      })
      .catch((err) => {
        console.log(err);
      });
  }
</script>

<div class="root__container">
  <Header />
  <Main
    openEditAvatar={toogleAvatarPopup}
    openEditProfile={toogleProfilePopup}
    openAddCard={tooglePlacePopup}
    {cards}
    onCardLike={handleCardLike}
    onCardDelete={handleCardDelete}
  />
  <EditAvatarPopup
    isOpen={isOpenPopupAvatar}
    onClose={toogleAvatarPopup}
    onUpdateAvatar={handleUpdateAvatar}
    btnText={btnTextPopupAvatar}
  />
  <EditProfilePopup isOpen={isOpenPopupProfile} onClose={toogleProfilePopup} />
  <AddPlacePopup
    isOpen={isOpenPopupPlace}
    onClose={tooglePlacePopup}
    onAddPlace={handleAddPlaceSubmit}
  />
  <ImagePopup />
</div>
