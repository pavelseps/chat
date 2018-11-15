<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-3 bg-dark vh-100">
                <RoomList ref="roomList"></RoomList>
            </div>
            <div class="col-md-9 bg-light vh-100">
                <router-view />
            </div>
        </div>

        <UserNameModal ref="userNameModal"></UserNameModal>
    </div>
</template>

<script>
    import RoomList from '../components/RoomList';
    import UserNameModal from '../components/modals/UserName';

    export default {
        name: 'Home',
        components: {
            RoomList,
            UserNameModal,
        }
    }
</script>

<style scoped lang="scss">
    .vh-100{
        @media (min-width: 768px) {
            height: 100vh;
        }
    }

    [class*=col-md]{
        @media (max-width: 767px) {
            min-height: 0;
        }
    }
</style>
