<template>
    <div v-show="visible">
        <div
                class="modal" tabindex="-1" role="dialog" aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">Uživatelské jméno</h5>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <input
                                    class="form-control form-control-lg" type="text" placeholder="Jméno"
                                   @keyup.enter="saveName()"
                                   v-model="name"
                            >
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="saveName()">Pokračovat</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'UserNameModal',
        data(){
            return {
                visible: false,
                name: ""
            }
        },
        created(){
            if(this.$cookie.get('chat-username') === null){
                this.visible = true;
            }
        },
        methods: {
            saveName(){
                if(this.name !== ''){
                    this.$cookie.set('chat-username', this.name, { expires: '1M' });
                    this.visible = false;
                }
            }
        }
    }
</script>

<style scoped>
    .modal{
        display: block;
        background: rgba(0, 0, 0, 0.8);
    }
</style>