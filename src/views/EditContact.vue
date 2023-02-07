<script>
import { ContactService } from '../services/ContactService';
import Spinner from '../components/Spinner.vue';

export default {
    data() {
        return {
            contactId: this.$route.params.contactId,
            loading: false,
            contact: {},
            groups: []
        }
    },
    async created() {
        try {
            this.loading = true
            let response = await ContactService.getContact(this.contactId)
            let groupResponse = await ContactService.getAllGroups()
            this.contact = response.data
            this.groups = groupResponse.data
            this.loading = false
        } catch (error) {
            console.log(error);
        }
    },
    components: {
        Spinner
    },
    methods: {
        async updateSubmit() {
            try {
                let response = await ContactService.updateContact(this.contact, this.contactId)
                if (response) {
                    return this.$router.push(`/contacts/view/${this.contactId}`)
                } else {
                    return this.$router.push(`/contacts/edit/${this.contactId}`)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col">
                <p class="h3 text-success fw-bold">Edit Contact</p>
                <p class="fst-italic"></p>
            </div>
        </div>
    </div>
    <div v-if="loading">
        <div class="container">
            <div class="row">
                <div class="col">
                    <Spinner />
                </div>
            </div>
        </div>
    </div>
    <div class="container mt-3" v-if="!loading">
        <div class="row">
            <div class="col-md-3">
                <form @submit.prevent="updateSubmit">
                    <div class="mb-2">
                        <input required v-model="contact.name" type="text" placeholder="Name" class="form-control">
                    </div>
                    <div class="mb-2">
                        <input required v-model="contact.photo" type="text" placeholder="Photo URL"
                            class="form-control">
                    </div>
                    <div class="mb-2">
                        <input required v-model="contact.email" type="text" placeholder="Email" class="form-control">
                    </div>
                    <div class="mb-2">
                        <input required v-model="contact.mobile" type="text" placeholder="Moble" class="form-control">
                    </div>
                    <div class="mb-2">
                        <input required v-model="contact.company" type="text" placeholder="Company"
                            class="form-control">
                    </div>
                    <div class="mb-2">
                        <select required v-model="contact.groupId" v-if="groups.length > 0" class="form-control">
                            <option :value="group.id" v-for="group of groups" :key="group.id">{{ group.name }}</option>
                        </select>
                    </div>
                    <div class="mb-2">
                        <input type="submit" class="btn btn-success" value="Update">
                    </div>
                </form>
            </div>
            <div class="col-md-4">
                <img :src="contact.photo" alt="contact-img" class="contact-img">
            </div>
        </div>
    </div>
</template>