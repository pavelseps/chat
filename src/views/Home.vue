<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-3 bg-dark vh-100">
                <RoomList></RoomList>
            </div>
            <div class="col-md-9 bg-light vh-100">
                <router-view/>
            </div>
        </div>

        <UserNameModal></UserNameModal>
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

<style scoped>
    .vh-100{
        height: 100vh;
    }
</style>
