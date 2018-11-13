<template>
    <div class="chat-history">
        <div class="history-wrap" ref="scroll">
            <!--TODO add history in chat and reload last messages-->
            <!--TODO reply to name and higlight your username-->
            <div
                    v-for="message in messages"
                    class="card border-secondary mb-2"
                    :class="{'right-message border-success': isMyMessage(message.username)}"
            >
                <div class="card-body p-2">
                    <h5 class="card-title mb-0">{{message.username}}</h5>
                    <small class="mb-3 d-block text-muted">{{getNiceDate(message.createdOn)}}</small>
                    <p class="card-text">{{message.message}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'History',
        data() {
            return {
                messages: [],
                reloadInterval: null,
                lastMessageId: ''
            }
        },
        watch: {
            paramRoomId(newVal, oldVal) {
                this.startGetMessageInterval(newVal);
            }
        },
        methods: {
            startGetMessageInterval(roomId){
                if(this.reloadInterval !== null){
                    clearInterval(this.reloadInterval);
                    this.reloadInterval = null;
                }
                this.getMessage(roomId);
                this.reloadInterval = setInterval(()=>{
                    this.getMessage(roomId);
                }, 2000);
            },
            async getMessage(roomId) {
                let request = await this.connection.get('rooms/' + roomId + '/messages');
                if (request.status === 200) {
                    this.messages = request.data.messages.reverse();

                    if(this.lastMessageId !== this.messages[this.messages.length-1].id){
                        this.lastMessageId = this.messages[this.messages.length-1].id;
                        setTimeout(() => {
                            this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight;
                        }, 50);
                    }
                }
            },
            getNiceDate(date) {
                let dateI = new Date(date);
                let minutes = dateI.getMinutes();
                minutes = (minutes + '').length > 1 ? minutes : '0' + minutes;
                return dateI.getDate() + '.' + (dateI.getMonth() + 1 + '.' + dateI.getFullYear() + ' ' + dateI.getHours() + ':' + minutes);
            },
            isMyMessage(nameMessage) {
                let myName = this.$cookie.get('chat-username');
                if (myName !== null) {
                    if (myName === nameMessage) {
                        return true
                    }
                }
                return false;
            }
        }
    }
</script>

<style scoped>
    .card {
        max-width: 60%;
    }

    .history-wrap {
        height: calc(100vh - 160px);
        overflow-y: auto;
        margin-bottom: 20px;
    }

    .right-message {
        margin-left: auto;
        margin-right: 0;
    }
</style>