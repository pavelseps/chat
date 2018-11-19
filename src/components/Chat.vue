<template>
    <div class="chat" :class="{'small': responsive.small}">
        <h1 class="pt-2 pb-2 border-bottom"><font-awesome-icon icon="bars" size="lg" @click="toggleRooms"/> Vítejte v místnosti {{$route.params.roomName}}</h1>
        <History
                @send-to="message += $event"
                ref="history"
        ></History>
        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text text-center small-fontsize" @click="changeUsername()">
                    <font-awesome-icon icon="user-edit"/><br><span class="text">Username</span>
                </span>
            </div>
            <textarea
                    class="form-control"
                    rows="2"
                    placeholder="Text"
                    @keydown.enter.exact.prevent=""
                    @keyup.enter.exact="sendMessage"
                    @keydown.enter.shift.exact="newLine"
                    v-model="message"
            ></textarea>
            <div class="input-group-append">
                <span class="input-group-text bg-success text-light" @click="sendMessage()">
                    <font-awesome-icon icon="comment" />
                    <span>Odeslat</span>
                </span>
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
                message: '',
                responsive: {
                    small: false
                }
            };
        },
        methods: {
            newLine(){
                this.message = this.message + '\n';
            },
            async sendMessage(){
                let myUserName = this.$cookie.get('chat-username');
                if(myUserName !== null){
                    let data = {
                        username: myUserName,
                        message: this.message
                    };
                    this.message = '';
                    this.$refs.history.addUnsentHistory(data);

                    let request = await this.connection.post('rooms/'+this.paramRoomId+'/messages', data);
                    if(request.status === 201){
                        this.$refs.history.canRemoveUnsent()
                    }
                }
            },
            changeUsername(){
                this.$parent.$refs.userNameModal.changeUsername();
            },
            toggleRooms(){
                this.responsive.small = !this.responsive.small;
                this.$parent.$refs.roomList.setResponsiveVisibility(this.responsive.small);
            }
        }
    }
</script>

<style scoped lang="scss">
    textarea {
        resize: none;
    }

    .input-group-text{
        cursor: pointer;
    }

    @media (min-width: 768px) {

        h1{
            [class*=fa]{
                display: none;
            }
        }

        .input-group-append{
            [class*=fa]{
                display: none;
            }
        }

        .input-group-prepend{
            .input-group-text{
                display: block;
            }
        }
    }

    @media (max-width: 767px) {

        h1{
            font-size: 1.5rem;
        }

        .input-group-text span{
            display: none;
        }

        .chat{
            height: 100vh;
            transition: height linear 0.3s;

            &.small{
                height: 60vh;
            }
        }
    }
</style>