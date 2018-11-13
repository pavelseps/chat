<template>
    <div>
        <h1>Výtejte v místnosti {{$route.params.roomName}}</h1>
        <History></History>
        <div class="input-group">
            <textarea class="form-control" rows="2" placeholder="Text" @keydown.enter="sendMessage()"  v-model="message"></textarea>
            <div class="input-group-append">
                <span class="input-group-text bg-success text-light" @click="sendMessage()">Odeslat</span>
            </div>
        </div>
    </div>
</template>

<script>
    import History from '../components/History';

    export default {
        name: 'Chat',
        components: {
            History
        },
        data(){
            return {
                message: ''
            };
        },
        methods: {
            async sendMessage(){
                /*TODO show loader*/
                let myUserName = this.$cookie.get('chat-username');
                if(myUserName !== null){
                    let data = {
                        username: myUserName,
                        message: this.message
                    };
                    this.message = '';

                    let request = await this.connection.post('rooms/'+this.paramRoomId+'/messages', data);
                    if(request.status === 201){
                        /*TODO hide loader*/
                    }
                }
            }
        }
    }
</script>

<style scoped>
    textarea {
        resize: none;
    }

    .input-group-text{
        cursor: pointer;
    }
</style>