<script>
import { ContactService } from '../services/ContactService';

export default {
    data() {
        return {
            contact: {
                name: '',
                photo: '',
                email: '',
                mobile: '',
                company: '',
                groupId: ''
            },
            groups: []
        }
    },
    async created() {
        try {
            let response = await ContactService.getAllGroups()
            this.groups = response.data
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        async submitCreate() {
            try {
                let response = await ContactService.createContact(this.contact)
                if (response) {
                    return this.$router.push('/')
                } else {
                    return this.$router.push('/contacts/add')
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
                <p class="h3 text-success fw-bold">Add Contact</p>
                <p class="fst-italic"></p>
            </div>
        </div>
    </div>
    <div class="container mt-3">
        <div class="row">
            <div class="col-md-3">
                <form @submit.prevent="submitCreate">
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
                    <div required class="mb-2">
                        <select v-model="contact.groupId" v-if="groups.length > 0" class="form-control">
                            <option value="">Select Group</option>
                            <option :value="group.id" v-for="group of groups" :key="group.id">{{ group.name }}</option>
                        </select>
                    </div>
                    <div class="mb-2">
                        <input type="submit" class="btn btn-success" value="Create">
                    </div>
                </form>
            </div>
            <div class="col-md-4" v-if="contact.photo">
                <img :src="contact.photo" alt="contact-img" class="contact-img">
            </div>
        </div>
    </div>
</template>