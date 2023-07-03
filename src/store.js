import { writable } from 'svelte/store';

export let currentUser = writable({
  name: '',
  about: '',
  avatar: '',
  _id: '',
});
