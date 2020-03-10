import createdPersistedState from 'vuex-persistedstate';

export default({ store }) => {
    window.onNuxtReady(() => {
        createdPersistedState({})(store);
    });
}