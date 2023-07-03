<script>
  import api from '../utils/api';
  import { onMount } from 'svelte';
  import AddPlacePopup from './AddPlacePopup.svelte';
  import EditAvatarPopup from './EditAvatarPopup.svelte';
  import EditProfilePopup from './EditProfilePopup.svelte';
  import Header from './Header.svelte';
  import ImagePopup from './ImagePopup.svelte';
  import Main from './Main.svelte';
  import Footer from './Footer.svelte';
  import { currentUser } from '../store';
  let isOpenPopupAvatar = false;
  let isOpenPopupProfile = false;
  let isOpenPopupPlace = false;
  let btnTextPopupAvatar = 'Обновить';
  let btnTextPopupProfile = 'Сохранить';
  let cards = [];
  let triggerCard;

  let selectedCard = {
    isOpen: false,
    name: '',
    link: '',
  };

  // Открытие модальных окон ---------------
  const toogleAvatarPopup = () => {
    isOpenPopupAvatar = !isOpenPopupAvatar;
    btnTextPopupAvatar = 'Обновить';
  };

  const toogleProfilePopup = () => {
    isOpenPopupProfile = !isOpenPopupProfile;
    btnTextPopupProfile = 'Сохранить';
  };

  const tooglePlacePopup = () => {
    isOpenPopupPlace = !isOpenPopupPlace;
  };

  const closeImagePopup = () => {
    selectedCard = {
      ...selectedCard,
      isOpen: false,
    };
  };
  // -------------------------------------

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
    let isLiked = card.likes.some((i) => i._id === $currentUser._id);
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
    triggerCard = true;
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
  const handleCardDelete = (card) => {
    api
      .delCard(card._id)
      .then(() => {
        cards = cards.filter((c) => c._id !== card._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Показываем карточку в полном размере
  const handleCardClick = (card) => {
    selectedCard = {
      isOpen: true,
      name: card.name,
      link: card.link,
    };
  };

  // Обновляем данные о пользователе
  const handleUpdateUser = (user) => {
    const { name, about } = user;
    btnTextPopupProfile = 'Сохранение';
    api
      .editProfile(name, about)
      .then((res) => {
        currentUser.set({
          name: res.name,
          about: res.about,
          avatar: res.avatar,
          _id: res._id,
        });
        toogleProfilePopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        btnTextPopupProfile = 'Сохранено';
      });
  };
</script>

<svelte:head>
  <title>Mesto Svelte</title>
</svelte:head>

<div class="root__container">
  <Header />
  <Main
    openEditAvatar={toogleAvatarPopup}
    openEditProfile={toogleProfilePopup}
    openAddCard={tooglePlacePopup}
    {cards}
    onCardLike={handleCardLike}
    onCardDelete={handleCardDelete}
    onCardClick={handleCardClick}
    {triggerCard}
  />
  <Footer />
  <EditAvatarPopup
    isOpen={isOpenPopupAvatar}
    onClose={toogleAvatarPopup}
    onUpdateAvatar={handleUpdateAvatar}
    btnText={btnTextPopupAvatar}
  />
  <EditProfilePopup
    isOpen={isOpenPopupProfile}
    onClose={toogleProfilePopup}
    onUpdateUser={handleUpdateUser}
    btnText={btnTextPopupProfile}
  />
  <AddPlacePopup
    isOpen={isOpenPopupPlace}
    onClose={tooglePlacePopup}
    onAddPlace={handleAddPlaceSubmit}
  />
  <ImagePopup onClose={closeImagePopup} card={selectedCard} />
</div>
