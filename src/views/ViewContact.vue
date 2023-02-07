<script>
import { ContactService } from '../services/ContactService';
import Spinner from '../components/Spinner.vue';

export default {
    data() {
        return {
            contactId: this.$route.params.contactId,
            loading: false,
            contact: [],
            group: {}
        }
    },
    async created() {
        try {
            this.loading = true
            let response = await ContactService.getContact(this.contactId)
            let groupResponse = await ContactService.getGroup(response.data)
            this.contact = response.data
            this.group = groupResponse.data
            this.loading = false
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        isDone() {
            return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0
        }
    },
    components: {
        Spinner
    }
}
</script>

<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col">
                <p class="h3 text-success fw-bold">View Contact</p>
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
    <div class="container mt-3" v-if="!loading && isDone()">
        <div class="row align-items-center">
            <div class="col-md-4">
                <img :src="contact.photo" alt="contact-img" class="contact-img-big">
            </div>
            <div class="col-md-6">
                <ul class="list-group">
                    <li class="list-group-item">Name: <span class="fw-bold">{{ contact.name }}</span></li>
                    <li class="list-group-item">Email: <span class="fw-bold">{{ contact.email }}</span></li>
                    <li class="list-group-item">Mobile: <span class="fw-bold">{{ contact.mobile }}</span></li>
                    <li class="list-group-item">Company: <span class="fw-bold">{{ contact.company }}</span></li>
                    <li class="list-group-item">Group: <span class="fw-bold">{{ group.name }}</span></li>
                </ul>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <router-link to="/" class="btn btn-success">
                    <i class="fa fa-arrow-alt-circle-left"></i>
                    Back
                </router-link>
            </div>
            <div class="col-md-8">
                <router-link class="btn btn-primary my-1" :to="`/contacts/edit/${contact.id}`">
                    <i class="fa fa-pen"></i>
                    Edit
                </router-link>
            </div>
        </div>
    </div>
</template>