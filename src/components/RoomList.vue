<template>
    <div>
        <h2 class="text-light">Seznam místností</h2>
        <!--TODO update rooms-->
        <ul class="list-group">
            <li
                    v-for="room in rooms"
                    @click="setActive(room.id)"
                    :class="{'list-group-item-info': paramRoomId === room.id}"
                    class="list-group-item"
            >{{room.name}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'RoomList',
        data(){
            return {
                rooms: []
            }
        },
        created(){
            this.updateRooms();
        },
        computed: {
            firstRoom(){
                return this.rooms[0];
            }
        },
        methods: {
            async updateRooms(){
                let request = await this.connection.get('rooms');

                if(request.status === 200){
                    this.rooms = request.data.rooms;

                    if(this.paramRoomId !== undefined){
                        this.setActive(parseInt(this.paramRoomId));
                    } else {
                        this.setActive(this.firstRoom.id);
                    }
                }
            },
            setActive(id){

                let findRoom = this.rooms.find((item =>{
                    return item.id === id
                }));

                let isValidId = findRoom !== undefined;

                let idLocal = 0;
                let roomName = '';
                if(!isValidId){
                    idLocal = this.firstRoom.id;
                    roomName = this.firstRoom.name;
                } else {
                    idLocal = id;
                    roomName = findRoom.name;
                }

                if(this.$route.name === 'Chat'){
                    this.$router.replace({name: 'ChatDefault'}); //TODO fix me
                }

                this.$router.push({name: 'Chat', params: {
                        roomId: idLocal,
                        roomName: roomName
                    }});

            }
        }
    }
</script>

<style scoped lang="scss">
    .list-group{
        li{
            cursor: pointer;
        }
    }
</style>