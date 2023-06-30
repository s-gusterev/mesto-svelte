<script>
  import AddPlacePopup from './AddPlacePopup.svelte';
  import EditAvatarPopup from './EditAvatarPopup.svelte';
  import EditProfilePopup from './EditProfilePopup.svelte';
  import Header from './Header.svelte';
  import ImagePopup from './ImagePopup.svelte';
  import Main from './Main.svelte';

  let isOpenPopupAvatar = false;
  let isOpenPopupProfile = false;
  let isOpenPopupPlace = false;

  // Открытие модальных окон ---------------
  const toogleAvatarPopup = () => {
    isOpenPopupAvatar = !isOpenPopupAvatar;
  };

  const toogleProfilePopup = () => {
    isOpenPopupProfile = !isOpenPopupProfile;
  };

  const tooglePlacePopup = () => {
    isOpenPopupPlace = !isOpenPopupPlace;
  };
  // -------------------------------------
</script>

<div class="root__container">
  <Header />
  <Main
    openEditAvatar={toogleAvatarPopup}
    openEditProfile={toogleProfilePopup}
    openAddCard={tooglePlacePopup}
  />
  <EditAvatarPopup isOpen={isOpenPopupAvatar} onClose={toogleAvatarPopup} />
  <EditProfilePopup isOpen={isOpenPopupProfile} onClose={toogleProfilePopup} />
  <AddPlacePopup isOpen={isOpenPopupPlace} onClose={tooglePlacePopup} />
  <ImagePopup />
</div>
