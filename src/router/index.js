import { createRouter, createWebHistory } from 'vue-router'

import ContactManager from '../views/ContactManager.vue'
import AddContact from '../views/AddContact.vue'
import EditContact from '../views/EditContact.vue'
import ViewContact from '../views/ViewContact.vue'
import PageNotFound from '../views/PageNotFound.vue'

const routes = [
    {
        path: '/',
        redirect: '/contacts',
    },
    {
        path: '/contacts',
        name: 'ContactManager',
        component: ContactManager
    },
    {
        path: '/contacts/add',
        name: 'AddContact',
        component: AddContact
    },
    {
        path: '/contacts/view/:contactId',
        name: 'ViewContact',
        component: ViewContact
    },
    {
        path: '/contacts/edit/:contactId',
        name: 'EditContact',
        component: EditContact
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'PageNotFound',
        component: PageNotFound
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router