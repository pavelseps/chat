<template>
    <div class="chat-history">
        <div v-if="loaderVisible" class="loader-global">
            <scale-loader :loading="true" color="#28a745" height="80px" width="10px"></scale-loader>
        </div>
        <div class="history-wrap" ref="scroll">
            <div
                    v-for="message in messages"
                    class="card border-secondary mb-2"
                    :class="{'border-warning': isMentioned(message.message), 'right-message border-success': isMyMessage(message.username) }"
            >
                <div class="card-body p-2">
                    <h5
                            class="card-title mb-0"
                            @click="$emit('send-to', '@'+message.username+' ')"
                    >{{message.username}}</h5>
                    <small class="mb-3 d-block text-muted">{{getNiceDate(message.createdOn)}}</small>
                    <p class="card-text">{{message.message}}</p>
                </div>
            </div>

            <div
                    v-for="message in unsentMessages"
                    class="card mb-2 right-message border-success"
            >
                <div class="card-body p-2">
                    <h5
                            class="card-title mb-0"
                    >{{message.username}}</h5>
                    <p class="card-text">{{message.message}}</p>
                    <div class="loader">
                        <sync-loader :loading="true" color="#28a745" size="10px"></sync-loader>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ScaleLoader from 'vue-spinner/src/ScaleLoader';
    import SyncLoader from 'vue-spinner/src/SyncLoader';

    export default {
        name: 'History',
        components: {
            'scale-loader': ScaleLoader,
            'sync-loader': SyncLoader,
        },
        data() {
            return {
                messages: [],
                unsentMessages: [],
                reloadInterval: null,
                lastMessageId: '',
                removeUnsent: false,
                loaderVisible: true
            }
        },
        watch: {
            paramRoomId(newVal, oldVal) {
                this.loaderVisible = true;
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
                    if(this.removeUnsent){
                        this.unsentMessages = [];
                        this.removeUnsent = false;
                    }
                    this.messages = request.data.messages.reverse();

                    if(this.lastMessageId !== this.messages[this.messages.length-1].id){
                        this.lastMessageId = this.messages[this.messages.length-1].id;
                        this.scrollBottom();
                    }

                    this.loaderVisible = false;
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
            },
            isMentioned(text){
                if(typeof text === "string"){
                    return text.indexOf('@'+this.$cookie.get('chat-username')) > -1;
                }

                return false;
            },
            addUnsentHistory(data){
                this.unsentMessages.push(data);
                this.scrollBottom();
            },
            scrollBottom(){
                setTimeout(() => {
                    this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight;
                }, 50);
            },
            canRemoveUnsent(){
                this.removeUnsent = true;
            }
        }
    }
</script>

<style scoped lang="scss">
    .card {
        max-width: 60%;
    }

    .history-wrap {
        transition: height linear 0.3s;
        height: calc(100vh - 160px);
        overflow-y: auto;
        margin-bottom: 20px;

        @media (max-width: 767px) {
            height: calc(100vh - 200px);

            .small &{
                height: calc(60vh - 200px);
            }
        }
    }

    .right-message {
        margin-left: auto;
        margin-right: 0;
    }

    h5{
        cursor: pointer;
    }

    .border-warning:not(.border-success) {
        h5{
            color: #d39e00;
        }
    }

    .border-success{
        border-color: #28a745 !important;
    }

    .chat-history{
        position: relative;
    }
    
    .loader,
    .loader-global{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .loader-global{
        font-size: 3rem;
        z-index: 9999;
    }
</style>